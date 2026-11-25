import { eq } from 'drizzle-orm';
import { db } from './db';
import { user } from './schema';

export type Plan = 'free' | 'pro';

/** Founder accounts stay unlimited so local testing is not blocked by Free caps. */
const OWNER_EMAILS = ['kiricenkooleg123@gmail.com'] as const;

export function asPlan(value: string | null | undefined): Plan {
  return value === 'pro' ? 'pro' : 'free';
}

export function isOwnerEmail(email: string | null | undefined): boolean {
  const normalized = email?.trim().toLowerCase();
  return Boolean(normalized && OWNER_EMAILS.some((owner) => owner === normalized));
}

export function planForAccount(
  email: string | null | undefined,
  stored: string | null | undefined,
): Plan {
  if (isOwnerEmail(email)) {
    return 'pro';
  }

  return asPlan(stored);
}

export async function getStoredPlan(userId: string): Promise<Plan> {
  const rows = await db
    .select({ plan: user.plan, email: user.email })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return planForAccount(rows[0]?.email, rows[0]?.plan);
}

export async function getStoredCreemCustomerId(userId: string): Promise<string | null> {
  const rows = await db
    .select({ creemCustomerId: user.creemCustomerId })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return rows[0]?.creemCustomerId ?? null;
}

export async function getStoredHadTrial(userId: string): Promise<boolean> {
  const rows = await db
    .select({ hadTrial: user.hadTrial })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return Boolean(rows[0]?.hadTrial);
}

export async function setUserPlan(
  userId: string | null | undefined,
  plan: Plan,
): Promise<void> {
  if (!userId) {
    return;
  }

  await db
    .update(user)
    .set({ plan, updatedAt: new Date() })
    .where(eq(user.id, userId));
}

export async function applyCreemAccess({
  userId,
  plan,
  creemCustomerId,
  hadTrial,
}: {
  userId: string | null;
  plan: Plan;
  creemCustomerId?: string | null;
  hadTrial?: boolean;
}): Promise<void> {
  if (!userId) {
    return;
  }

  const [existing] = await db
    .select({ email: user.email })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  const nextPlan = isOwnerEmail(existing?.email) ? 'pro' : plan;

  await db
    .update(user)
    .set({
      plan: nextPlan,
      updatedAt: new Date(),
      ...(creemCustomerId ? { creemCustomerId } : {}),
      ...(hadTrial ? { hadTrial: true } : {}),
    })
    .where(eq(user.id, userId));
}

export async function refreshPlan(userId: string): Promise<Plan> {
  return getStoredPlan(userId);
}
