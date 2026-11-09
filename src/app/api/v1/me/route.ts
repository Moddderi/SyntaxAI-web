import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { db } from '@/lib/db';
import { asPlan } from '@/lib/plan';
import { enforceRateLimit, PROFILE_RATE_LIMITS } from '@/lib/rate-limit';
import { user } from '@/lib/schema';

export const runtime = 'nodejs';

const updateMeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(80, 'Name is too long'),
});

export function OPTIONS() {
  return extensionOptions();
}

export async function GET(request: NextRequest) {
  const authUser = await authenticateExtension(request);
  if (!authUser) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  return extensionJson({
    id: authUser.id,
    email: authUser.email,
    name: authUser.name,
    plan: asPlan(authUser.plan),
  });
}

export async function PATCH(request: NextRequest) {
  const authUser = await authenticateExtension(request);
  if (!authUser) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('profile', authUser.id, PROFILE_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = updateMeSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      400,
    );
  }

  const nextName = parsed.data.name;

  const [updated] = await db
    .update(user)
    .set({
      name: nextName,
      updatedAt: new Date(),
    })
    .where(eq(user.id, authUser.id))
    .returning({
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
    });

  if (!updated) {
    return extensionJson({ error: 'User not found' }, 404);
  }

  return extensionJson({
    id: updated.id,
    email: updated.email,
    name: updated.name,
    plan: asPlan(updated.plan),
  });
}
