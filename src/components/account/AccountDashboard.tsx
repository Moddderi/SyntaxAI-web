import type { ReactNode } from 'react';
import Image from 'next/image';
import { ProfileStats } from '@/components/account/ProfileStats';
import { ReferralProgress } from '@/components/account/ReferralProgress';
import { SubscriptionPanel } from '@/components/account/SubscriptionPanel';
import { SignOutButton } from '@/components/auth/SignOutButton';

interface AccountDashboardProps {
  name: string;
  email: string;
  image: string | null | undefined;
  isPro: boolean;
  referralCount: number;
  referralLink: string;
  daysActive: number;
  memberSince: string;
  showWelcome: boolean;
  checkoutPending: boolean;
}

function AccountCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <article className="lift-card flex min-h-[26rem] flex-col rounded-3xl border border-syntax-border bg-syntax-card p-6 md:min-h-[28rem] md:p-7">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-syntax-muted">
        {label}
      </p>
      <div className="mt-5 flex min-h-0 flex-1 flex-col">{children}</div>
    </article>
  );
}

export function AccountDashboard({
  name,
  email,
  image,
  isPro,
  referralCount,
  referralLink,
  daysActive,
  memberSince,
  showWelcome,
  checkoutPending,
}: AccountDashboardProps) {
  const firstName = name.split(' ')[0] ?? name;
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 ${showWelcome ? 'account-welcome-enter' : ''}`}
    >
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-syntax-text md:text-4xl">
          Hello!{' '}
          <span className="font-mono font-bold uppercase tracking-[0.04em] text-syntax-accent accent-glow">
            {firstName}
          </span>
        </h1>
        <p className="mt-3 text-base text-syntax-muted md:text-lg">
          This is your{' '}
          <span className="font-mono font-bold text-syntax-text">{daysActive}</span>
          {daysActive === 1 ? 'st' : daysActive === 2 ? 'nd' : daysActive === 3 ? 'rd' : 'th'} day
          building your SyntaxAI library.
        </p>
        {showWelcome ? (
          <p className="mt-4 inline-block rounded-xl border border-white/12 bg-syntax-hover px-4 py-2 text-sm text-syntax-text shadow-[var(--syntax-glow)]">
            Welcome back — your account is ready.
          </p>
        ) : null}
        {checkoutPending ? (
          <p className="mt-4 inline-block rounded-xl border border-white/12 bg-syntax-hover px-4 py-2 text-sm text-syntax-text">
            Payment received — refresh if plan still shows Free.
          </p>
        ) : null}
      </header>

      <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
        <AccountCard label="User profile">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              {image ? (
                <Image
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-2xl border border-syntax-border object-cover shadow-[var(--syntax-glow)] md:h-[5.5rem] md:w-[5.5rem]"
                  height={88}
                  src={image}
                  width={88}
                />
              ) : (
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-syntax-border bg-syntax-bg font-mono text-lg font-bold text-syntax-text shadow-[var(--syntax-glow)] md:h-[5.5rem] md:w-[5.5rem]"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}
              <div className="mt-4 min-w-0 sm:mt-0 sm:ml-5 sm:flex-1">
                <p className="text-xl font-semibold text-syntax-text">{name}</p>
                <p className="mt-2 break-all text-sm leading-relaxed text-syntax-muted">{email}</p>
              </div>
            </div>

            <ProfileStats daysActive={daysActive} memberSince={memberSince} />

            <div className="mt-auto pt-6">
              <SignOutButton />
            </div>
          </div>
        </AccountCard>

        <AccountCard label="Subscription">
          <SubscriptionPanel isPro={isPro} />
        </AccountCard>

        <AccountCard label="Invite friends">
          <ReferralProgress referralCount={referralCount} referralLink={referralLink} />
        </AccountCard>
      </div>
    </div>
  );
}
