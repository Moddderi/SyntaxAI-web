/** Pure data (no DB) so marketing components can import it. */

export const REFERRAL_GOAL = 5;
export const REFERRAL_INVITER_REWARD_DAYS = 30;
export const REFERRAL_FRIEND_REWARD_DAYS = 7;

export const REFERRAL_STEPS = [
  {
    step: 1,
    title: 'Share link',
    detail: 'Copy your invite and send it to a friend.',
  },
  {
    step: 2,
    title: `Friend gets ${REFERRAL_FRIEND_REWARD_DAYS} days Pro`,
    detail: 'They sign up with your link and unlock a week of Pro.',
  },
  {
    step: 3,
    title: `You get ${REFERRAL_INVITER_REWARD_DAYS} days Pro`,
    detail: `Invite ${REFERRAL_GOAL} friends to unlock 1 month of Pro.`,
  },
] as const;

/** @deprecated kept for older marketing blocks that still map a list */
export const REFERRAL_MILESTONES = [
  {
    friends: REFERRAL_GOAL,
    title: `${REFERRAL_GOAL} friends`,
    reward: '1 month of Pro',
  },
] as const;
