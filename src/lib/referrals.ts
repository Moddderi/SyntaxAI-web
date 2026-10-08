import { randomBytes } from 'crypto';
import { count, eq } from 'drizzle-orm';
import { db } from './db';
import { referralMeta } from './schema';
import { SITE_URL } from './site';

export const REFERRAL_MILESTONES = [
  {
    friends: 1,
    title: '1 friend',
    reward: '1 week of Pro — on us',
  },
  {
    friends: 3,
    title: '3 friends',
    reward: '1 month Pro free',
  },
  {
    friends: 7,
    title: '7 friends',
    reward: '3 months Pro free',
  },
] as const;

export const REFERRAL_GOAL = REFERRAL_MILESTONES[REFERRAL_MILESTONES.length - 1].friends;

export function buildReferralLink(code: string) {
  const base = SITE_URL.replace(/\/$/, '');
  return `${base}/auth/signin?ref=${encodeURIComponent(code)}`;
}

export async function ensureReferralCode(userId: string) {
  const [existing] = await db
    .select({ referralCode: referralMeta.referralCode })
    .from(referralMeta)
    .where(eq(referralMeta.userId, userId))
    .limit(1);

  if (existing?.referralCode) {
    return existing.referralCode;
  }

  const code = randomBytes(4).toString('hex');

  await db.insert(referralMeta).values({
    userId,
    referralCode: code,
    createdAt: new Date(),
  });

  return code;
}

export async function getReferralCount(userId: string) {
  try {
    const [row] = await db
      .select({ value: count() })
      .from(referralMeta)
      .where(eq(referralMeta.referredByUserId, userId));

    return Number(row?.value ?? 0);
  } catch {
    return 0;
  }
}

export async function resolveReferrerId(refCode: string | null | undefined) {
  if (!refCode || !/^[a-f0-9]{8}$/i.test(refCode)) {
    return null;
  }

  const [referrer] = await db
    .select({ userId: referralMeta.userId })
    .from(referralMeta)
    .where(eq(referralMeta.referralCode, refCode.toLowerCase()))
    .limit(1);

  return referrer?.userId ?? null;
}

export async function linkReferrer(userId: string, referrerId: string) {
  await ensureReferralCode(userId);

  const [row] = await db
    .select({ referredByUserId: referralMeta.referredByUserId })
    .from(referralMeta)
    .where(eq(referralMeta.userId, userId))
    .limit(1);

  if (row?.referredByUserId) {
    return false;
  }

  await db
    .update(referralMeta)
    .set({ referredByUserId: referrerId })
    .where(eq(referralMeta.userId, userId));

  return true;
}
