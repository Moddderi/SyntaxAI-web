import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { AccountDashboard } from '@/components/account/AccountDashboard';
import { getAccountMemberStats } from '@/lib/account-stats';
import { getServerSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { asPlan, refreshPlanFromPolar } from '@/lib/plan';
import { buildReferralLink, ensureReferralCode, getReferralCount } from '@/lib/referrals';
import { user } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your SyntaxAI plan and billing.',
};

function fallbackReferralCode(userId: string) {
  return userId.replace(/-/g, '').slice(0, 8).toLowerCase();
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string; welcome?: string }>;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect('/auth/signin?next=/account');
  }

  const { checkout, welcome } = await searchParams;
  const plan = await refreshPlanFromPolar(session.user.id);
  const isPro = plan === 'pro' || asPlan(session.user.plan) === 'pro';

  let referralCode = fallbackReferralCode(session.user.id);
  let referralCount = 0;

  try {
    referralCode = await ensureReferralCode(session.user.id);
    referralCount = await getReferralCount(session.user.id);
  } catch {
    // referral_meta table not migrated yet — account still works
  }

  const referralLink = buildReferralLink(referralCode);

  const [dbUser] = await db
    .select({ createdAt: user.createdAt })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  const { daysActive, memberSince } = getAccountMemberStats(dbUser?.createdAt);

  return (
    <AccountDashboard
      checkoutPending={checkout === 'success' && !isPro}
      daysActive={daysActive}
      email={session.user.email}
      image={session.user.image}
      isPro={isPro}
      memberSince={memberSince}
      name={session.user.name}
      referralCount={referralCount}
      referralLink={referralLink}
      showWelcome={welcome === '1'}
    />
  );
}
