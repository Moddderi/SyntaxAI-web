import {
  REFERRAL_FRIEND_REWARD_DAYS,
  REFERRAL_GOAL,
  REFERRAL_INVITER_REWARD_DAYS,
  REFERRAL_STEPS,
} from '@/lib/referrals';
import { InviteLinkCard } from '@/components/account/InviteLinkCard';

export function ReferralProgress({
  referralCount,
  referralLink,
}: {
  referralCount: number;
  referralLink: string;
}) {
  const clamped = Math.min(referralCount, REFERRAL_GOAL);
  const progressPercent = Math.min(100, (referralCount / REFERRAL_GOAL) * 100);
  const remaining = Math.max(0, REFERRAL_GOAL - referralCount);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <p className="text-sm text-syntax-muted">
          Get {REFERRAL_INVITER_REWARD_DAYS} days of Pro for every {REFERRAL_GOAL} friends who
          sign up. Friends get {REFERRAL_FRIEND_REWARD_DAYS} days of Pro.
        </p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <p className="text-sm font-medium text-syntax-text">Your progress</p>
          <p className="text-sm tabular-nums text-syntax-brand-soft">
            {clamped} / {REFERRAL_GOAL} friends
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-syntax-bg">
          <div
            className="h-full rounded-full bg-syntax-brand transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-syntax-muted">
          {remaining === 0
            ? 'You unlocked 1 month of Pro. Keep sharing — every 5 friends grants another month.'
            : `Invite ${remaining} more friend${remaining === 1 ? '' : 's'} to unlock 1 month of Pro.`}
        </p>
      </div>

      <ol className="grid grid-cols-3 gap-2">
        {REFERRAL_STEPS.map((item, index) => {
          const reached =
            index === 0 || (index === 1 && referralCount >= 1) || (index === 2 && referralCount >= REFERRAL_GOAL);

          return (
            <li className="text-center" key={item.step}>
              <span
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                  reached
                    ? 'border-syntax-brand bg-syntax-brand text-white'
                    : 'border-syntax-border bg-syntax-bg text-syntax-muted'
                }`}
              >
                {item.step}
              </span>
              <p
                className={`mt-2 text-[11px] leading-snug ${
                  reached ? 'text-syntax-brand-soft' : 'text-syntax-muted'
                }`}
              >
                {item.title}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto">
        <InviteLinkCard link={referralLink} />
      </div>
    </div>
  );
}
