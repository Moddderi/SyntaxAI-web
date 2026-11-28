import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import {
  freeQuotaResponse,
  listActiveNoteContent,
  partitionSyncByQuota,
  quotaApplies,
} from '@/lib/free-quota';
import { listNotesSince, upsertNotesFromClient } from '@/lib/notes';
import { noteSyncPushSchema } from '@/lib/note-types';
import { enforceRateLimit, NOTES_RATE_LIMITS } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export function OPTIONS() {
  return extensionOptions();
}

/** Pull notes changed since ?since=ISO (omit for full library) */
export async function GET(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('notes-read', user.id, NOTES_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  const sinceParam = request.nextUrl.searchParams.get('since');
  let since: Date | null = null;

  if (sinceParam) {
    const parsed = new Date(sinceParam);
    if (Number.isNaN(parsed.getTime())) {
      return extensionJson({ error: 'Invalid since parameter' }, 400);
    }
    since = parsed;
  }

  const notes = await listNotesSince(user.id, since);

  return extensionJson({
    notes,
    serverTime: new Date().toISOString(),
  });
}

/** Push local changes after saving in the extension (batch upsert, last-write-wins) */
export async function POST(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('notes-write', user.id, NOTES_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = noteSyncPushSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson({ error: 'Invalid payload', details: parsed.error.flatten() }, 400);
  }

  let notesToWrite = parsed.data.notes;
  if (quotaApplies(user.plan)) {
    const existing = await listActiveNoteContent(user.id);
    const quota = partitionSyncByQuota(existing, parsed.data.notes);
    if (quota.limitId) {
      if (quota.allowed.length > 0) {
        await upsertNotesFromClient(user.id, quota.allowed);
      }
      return freeQuotaResponse(quota.limitId, {
        appliedIds: quota.allowed.map((item) => item.id),
      });
    }
    notesToWrite = quota.allowed;
  }

  const result = await upsertNotesFromClient(user.id, notesToWrite);

  return extensionJson({
    ok: true,
    applied: result.applied,
    skipped: result.skipped,
    serverTime: new Date().toISOString(),
  });
}
