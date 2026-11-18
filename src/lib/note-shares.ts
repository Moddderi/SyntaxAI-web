import { randomBytes } from 'node:crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from './db';
import { ensureReferralCode } from './referrals';
import type { NoteShareSnapshot } from './note-share-types';
import { NOTE_SHARE_TTL_MS } from './note-share-types';
import { noteShare } from './schema';
import { SITE_URL } from './site';

function newShareSlug(): string {
  return randomBytes(9).toString('base64url');
}

function buildShareUrl(slug: string, referralCode: string | null): string {
  const base = SITE_URL.replace(/\/$/, '');
  const path = `${base}/s/${slug}`;
  if (!referralCode) {
    return path;
  }

  return `${path}?ref=${encodeURIComponent(referralCode)}`;
}

export type NoteShareRecord = {
  slug: string;
  userId: string;
  noteId: string;
  snapshot: NoteShareSnapshot;
  referralCode: string | null;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
};

export async function upsertNoteShare(
  userId: string,
  noteId: string,
  snapshot: NoteShareSnapshot,
): Promise<{ slug: string; url: string; expiresAt: string }> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + NOTE_SHARE_TTL_MS);
  let referralCode: string | null = null;
  try {
    referralCode = await ensureReferralCode(userId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[notes/share] referral code', message);
  }

  const [existing] = await db
    .select({
      slug: noteShare.slug,
    })
    .from(noteShare)
    .where(and(eq(noteShare.userId, userId), eq(noteShare.noteId, noteId)))
    .limit(1);

  if (existing) {
    await db
      .update(noteShare)
      .set({
        snapshot,
        referralCode,
        expiresAt,
        revokedAt: null,
      })
      .where(eq(noteShare.slug, existing.slug));

    return {
      slug: existing.slug,
      url: buildShareUrl(existing.slug, referralCode),
      expiresAt: expiresAt.toISOString(),
    };
  }

  const slug = newShareSlug();

  await db.insert(noteShare).values({
    slug,
    userId,
    noteId,
    snapshot,
    referralCode,
    createdAt: now,
    expiresAt,
    revokedAt: null,
  });

  return {
    slug,
    url: buildShareUrl(slug, referralCode),
    expiresAt: expiresAt.toISOString(),
  };
}

export async function revokeNoteShare(userId: string, slug: string): Promise<boolean> {
  const [row] = await db
    .select({ slug: noteShare.slug })
    .from(noteShare)
    .where(and(eq(noteShare.slug, slug), eq(noteShare.userId, userId), isNull(noteShare.revokedAt)))
    .limit(1);

  if (!row) {
    return false;
  }

  await db
    .update(noteShare)
    .set({ revokedAt: new Date() })
    .where(eq(noteShare.slug, slug));

  return true;
}

export async function getActiveNoteShareBySlug(slug: string): Promise<NoteShareRecord | null> {
  const [row] = await db
    .select()
    .from(noteShare)
    .where(and(eq(noteShare.slug, slug), isNull(noteShare.revokedAt)))
    .limit(1);

  if (!row) {
    return null;
  }

  if (row.expiresAt.getTime() <= Date.now()) {
    return null;
  }

  return row;
}