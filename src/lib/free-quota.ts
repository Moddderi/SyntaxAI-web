import { and, eq, isNull, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { extensionJson } from '@/lib/extension-api';
import type { NoteSyncItem } from '@/lib/note-types';
import type { Plan } from '@/lib/plan';
import { note, user } from '@/lib/schema';
import { FREE_LIMITS, isBillingEnabled, SITE_URL } from '@/lib/site';

export type QuotaId = 'notes' | 'context' | 'photos';

const QUOTA_MESSAGES: Record<QuotaId, string> = {
  notes: 'Your notebook is full. Upgrade to Pro to keep capturing without deleting notes.',
  context: 'Page context limit reached. Pro unlocks unlimited docs and rules capture.',
  photos: 'Photo read limit reached. Pro lets you scan unlimited screenshots.',
};

type QuotaFlags = {
  photo: boolean;
  context: boolean;
};

type QuotaCounts = {
  notes: number;
  context: number;
  photos: number;
};

const LIMITS: Record<QuotaId, number> = {
  notes: FREE_LIMITS.notes,
  context: FREE_LIMITS.contextSaves,
  photos: FREE_LIMITS.photoReads,
};

export function freeQuotaResponse(limitId: QuotaId, extra?: Record<string, unknown>) {
  return extensionJson(
    {
      error: QUOTA_MESSAGES[limitId],
      limitId,
      upgradeUrl: `${SITE_URL}/pricing`,
      ...extra,
    },
    402,
  );
}

export function quotaApplies(plan: Plan): boolean {
  return isBillingEnabled && plan !== 'pro';
}

/** Same envelope the extension writes in `encodeNoteContent`. */
export function classifyNoteContent(content: string): QuotaFlags {
  const trimmed = content.trim();
  if (!trimmed.startsWith('{')) {
    return { photo: false, context: false };
  }

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (parsed.syntaxai !== 1 || typeof parsed.code !== 'string') {
      return { photo: false, context: false };
    }

    const body = typeof parsed.body === 'string' ? parsed.body.trim() : '';
    return {
      photo: parsed.sourceType === 'image',
      context: body.length > 0,
    };
  } catch {
    return { photo: false, context: false };
  }
}

function tally(active: Map<string, QuotaFlags>): QuotaCounts {
  let notes = 0;
  let context = 0;
  let photos = 0;

  for (const flags of active.values()) {
    notes += 1;
    if (flags.context) {
      context += 1;
    }
    if (flags.photo) {
      photos += 1;
    }
  }

  return { notes, context, photos };
}

/** A write is over the cap only when it increases a counter that is already past the limit. Deletes always fit. */
function breachedLimit(before: QuotaCounts, after: QuotaCounts): QuotaId | null {
  if (after.notes > LIMITS.notes && after.notes > before.notes) {
    return 'notes';
  }
  if (after.context > LIMITS.context && after.context > before.context) {
    return 'context';
  }
  if (after.photos > LIMITS.photos && after.photos > before.photos) {
    return 'photos';
  }
  return null;
}

export function partitionSyncByQuota(
  existing: { id: string; content: string }[],
  items: NoteSyncItem[],
): { allowed: NoteSyncItem[]; limitId: QuotaId | null } {
  const active = new Map<string, QuotaFlags>();
  for (const row of existing) {
    active.set(row.id, classifyNoteContent(row.content));
  }

  const allowed: NoteSyncItem[] = [];
  let limitId: QuotaId | null = null;

  for (const item of items) {
    const before = tally(active);
    const draft = new Map(active);

    if (item.deleted) {
      draft.delete(item.id);
    } else {
      draft.set(item.id, classifyNoteContent(item.content));
    }

    const breach = breachedLimit(before, tally(draft));
    if (breach) {
      limitId ??= breach;
      continue;
    }

    active.clear();
    for (const [id, flags] of draft) {
      active.set(id, flags);
    }
    allowed.push(item);
  }

  return { allowed, limitId };
}

export async function listActiveNoteContent(userId: string) {
  return db
    .select({ id: note.id, content: note.content })
    .from(note)
    .where(and(eq(note.userId, userId), isNull(note.deletedAt)));
}

async function countActiveQuota(userId: string): Promise<QuotaCounts> {
  const rows = await listActiveNoteContent(userId);
  return tally(new Map(rows.map((row) => [row.id, classifyNoteContent(row.content)])));
}

function utcDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

type DayCount = {
  day: typeof user.freeNoteDay | typeof user.freeContextDay | typeof user.freePhotoDay;
  count: typeof user.freeNoteCount | typeof user.freeContextCount | typeof user.freePhotoCount;
};

const DAY_COUNT: Record<QuotaId, DayCount> = {
  notes: { day: user.freeNoteDay, count: user.freeNoteCount },
  context: { day: user.freeContextDay, count: user.freeContextCount },
  photos: { day: user.freePhotoDay, count: user.freePhotoCount },
};

async function tryConsumeDaily(userId: string, kind: QuotaId): Promise<boolean> {
  const column = DAY_COUNT[kind];
  const day = utcDay();
  const limit = LIMITS[kind];
  const result = await db.execute<{ id: string }>(sql`
    UPDATE "user"
    SET ${column.count} = CASE
          WHEN ${column.day} = ${day} THEN ${column.count} + 1
          ELSE 1
        END,
        ${column.day} = ${day}
    WHERE ${user.id} = ${userId}
      AND (
        ${column.day} IS DISTINCT FROM ${day}
        OR ${column.count} < ${limit}
      )
    RETURNING ${user.id}
  `);

  return result.rows.length > 0;
}

async function refundDaily(userId: string, kind: QuotaId): Promise<void> {
  const column = DAY_COUNT[kind];
  const day = utcDay();
  await db.execute(sql`
    UPDATE "user"
    SET ${column.count} = GREATEST(${column.count} - 1, 0)
    WHERE ${user.id} = ${userId}
      AND ${column.day} = ${day}
  `);
}

export type FreeAiGate =
  | { ok: true; refund: () => Promise<void> }
  | { ok: false; response: Response };

/**
 * Free plan: photo and context reads stop once that many notes are already saved,
 * and each kind also stops after the same number of AI calls in a UTC day.
 * A failed model call gives the daily slot back.
 */
export async function openFreeAiQuota(
  account: { id: string; plan: Plan },
  kind: QuotaId,
): Promise<FreeAiGate> {
  if (!quotaApplies(account.plan)) {
    return { ok: true, refund: async () => {} };
  }

  if (kind !== 'notes') {
    const counts = await countActiveQuota(account.id);
    if (kind === 'photos' && counts.photos >= LIMITS.photos) {
      return { ok: false, response: freeQuotaResponse('photos') };
    }
    if (kind === 'context' && counts.context >= LIMITS.context) {
      return { ok: false, response: freeQuotaResponse('context') };
    }
  }

  const consumed = await tryConsumeDaily(account.id, kind);
  if (!consumed) {
    return { ok: false, response: freeQuotaResponse(kind) };
  }

  return {
    ok: true,
    refund: () => refundDaily(account.id, kind),
  };
}
