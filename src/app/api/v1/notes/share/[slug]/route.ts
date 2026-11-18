import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { revokeNoteShare } from '@/lib/note-shares';
import { enforceRateLimit, SHARE_RATE_LIMITS } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export function OPTIONS() {
  return extensionOptions();
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const user = await authenticateExtension(_request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('notes-share-revoke', user.id, SHARE_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  const { slug } = await context.params;
  if (!slug || slug.length > 64) {
    return extensionJson({ error: 'Invalid slug' }, 400);
  }

  const revoked = await revokeNoteShare(user.id, slug);
  if (!revoked) {
    return extensionJson({ error: 'Share not found' }, 404);
  }

  return extensionJson({ ok: true });
}