import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { createNoteShareSchema } from '@/lib/note-share-types';
import { upsertNoteShare } from '@/lib/note-shares';
import { enforceRateLimit, SHARE_RATE_LIMITS } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export function OPTIONS() {
  return extensionOptions();
}

export async function POST(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('notes-share', user.id, SHARE_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = createNoteShareSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson({ error: 'Invalid payload', details: parsed.error.flatten() }, 400);
  }

  const { noteId, snapshot } = parsed.data;
  const result = await upsertNoteShare(user.id, noteId, snapshot);

  return extensionJson({
    ok: true,
    slug: result.slug,
    url: result.url,
    expiresAt: result.expiresAt,
  });
}