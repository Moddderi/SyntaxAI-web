import { eq } from 'drizzle-orm';
import { getStateExternalCustomers } from '@polar-sh/sdk/2026-10/services/customers';
import { db } from './db';
import { isPolarEnabled, polarCore } from './polar';
import { user } from './schema';

export type Plan = 'free' | 'pro';

export function asPlan(value: string | null | undefined): Plan {
  return value === 'pro' ? 'pro' : 'free';
}

export async function getStoredPlan(userId: string): Promise<Plan> {
  const rows = await db
    .select({ plan: user.plan })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return asPlan(rows[0]?.plan);
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

export async function setUserPlanFromExternalId(
  externalId: string | null | undefined,
  plan: Plan,
): Promise<void> {
  await setUserPlan(externalId, plan);
}

export async function refreshPlanFromPolar(userId: string): Promise<Plan> {
  if (!isPolarEnabled) {
    return getStoredPlan(userId);
  }

  try {
    const state = await getStateExternalCustomers(polarCore)(userId);
    const plan: Plan = state.active_subscriptions.length > 0 ? 'pro' : 'free';
    await setUserPlan(userId, plan);
    return plan;
  } catch {
    return getStoredPlan(userId);
  }
}
