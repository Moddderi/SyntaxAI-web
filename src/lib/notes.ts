import { and, eq, gt, isNotNull, or } from 'drizzle-orm';
import { db } from '@/lib/db';
import type { NoteRecord, NoteSyncItem } from '@/lib/note-types';
import { note } from '@/lib/schema';

function parseJsonArray(value: string | null, fallback: string[] = []) {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : fallback;
  } catch {
    return fallback;
  }
}

function rowToRecord(row: typeof note.$inferSelect): NoteRecord {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    tags: parseJsonArray(row.tags),
    pageUrl: row.pageUrl,
    stack: row.stack ? parseJsonArray(row.stack, []) : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    deletedAt: row.deletedAt?.toISOString() ?? null,
  };
}

export async function listNotesSince(userId: string, since: Date | null): Promise<NoteRecord[]> {
  const rows = await db
    .select()
    .from(note)
    .where(
      since
        ? and(
            eq(note.userId, userId),
            or(
              gt(note.updatedAt, since),
              and(isNotNull(note.deletedAt), gt(note.deletedAt, since)),
            ),
          )
        : eq(note.userId, userId),
    )
    .orderBy(note.updatedAt);

  return rows.map(rowToRecord);
}

export async function upsertNotesFromClient(
  userId: string,
  items: NoteSyncItem[],
): Promise<{ applied: number; skipped: number }> {
  let applied = 0;
  let skipped = 0;

  for (const item of items) {
    const clientUpdated = new Date(item.updatedAt);
    const existing = await db
      .select()
      .from(note)
      .where(and(eq(note.id, item.id), eq(note.userId, userId)))
      .limit(1);

    const row = existing[0];
    if (row && row.updatedAt.getTime() > clientUpdated.getTime()) {
      skipped += 1;
      continue;
    }

    const now = new Date();
    const tagsJson = JSON.stringify(item.tags);
    const stackJson = item.stack ? JSON.stringify(item.stack) : null;
    const deletedAt = item.deleted ? clientUpdated : null;

    if (row) {
      await db
        .update(note)
        .set({
          title: item.title,
          content: item.content,
          tags: tagsJson,
          pageUrl: item.pageUrl ?? null,
          stack: stackJson,
          updatedAt: clientUpdated,
          deletedAt,
        })
        .where(and(eq(note.id, item.id), eq(note.userId, userId)));
    } else if (!item.deleted) {
      await db.insert(note).values({
        id: item.id,
        userId,
        title: item.title,
        content: item.content,
        tags: tagsJson,
        pageUrl: item.pageUrl ?? null,
        stack: stackJson,
        createdAt: now,
        updatedAt: clientUpdated,
        deletedAt: null,
      });
    } else {
      skipped += 1;
      continue;
    }

    applied += 1;
  }

  return { applied, skipped };
}
