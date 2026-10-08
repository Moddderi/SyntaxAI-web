import { REFERRAL_GOAL, REFERRAL_MILESTONES } from '@/lib/referrals';
import { InviteLinkCard } from '@/components/account/InviteLinkCard';

export function ReferralProgress({
  referralCount,
  referralLink,
}: {
  referralCount: number;
  referralLink: string;
}) {
  const progressPercent = Math.min(100, (referralCount / REFERRAL_GOAL) * 100);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div>
        <p className="text-sm text-syntax-muted">
          Invite friends — unlock Pro rewards as your network grows.
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="font-mono text-5xl font-bold tabular-nums leading-none">{referralCount}</p>
          <p className="pb-1 text-sm text-syntax-muted">
            of <span className="font-mono text-syntax-text">{REFERRAL_GOAL}</span> friends
          </p>
        </div>
      </div>

      <div className="referral-track rounded-2xl border border-syntax-border bg-syntax-bg/60 px-4 pb-4 pt-7">
        <div className="relative mx-2">
          <div className="relative h-2.5 overflow-hidden rounded-full bg-syntax-card">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/60 via-white to-white/90 shadow-[var(--syntax-glow)] transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {REFERRAL_MILESTONES.map((milestone) => {
            const unlocked = referralCount >= milestone.friends;
            const left = (milestone.friends / REFERRAL_GOAL) * 100;

            return (
              <div
                key={milestone.friends}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%` }}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold ${
                    unlocked
                      ? 'border-syntax-bg bg-syntax-accent text-syntax-accent-fg shadow-[var(--syntax-glow)]'
                      : 'border-syntax-border bg-syntax-card text-syntax-muted'
                  }`}
                >
                  {milestone.friends}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {REFERRAL_MILESTONES.map((milestone) => {
            const unlocked = referralCount >= milestone.friends;

            return (
              <div
                key={`reward-${milestone.friends}`}
                className={`rounded-xl border px-2 py-3 text-center ${
                  unlocked ? 'border-white/20 bg-syntax-hover' : 'border-syntax-border/80 bg-syntax-bg'
                }`}
              >
                <p className="font-mono text-[10px] font-bold text-syntax-text">{milestone.friends}</p>
                <p className="mt-1 text-[10px] leading-snug text-syntax-muted">{milestone.reward}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto">
        <InviteLinkCard link={referralLink} />
      </div>
    </div>
  );
}
