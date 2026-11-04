/** Pure data (no DB) so marketing components can import it. */
export const REFERRAL_MILESTONES = [
  {
    friends: 1,
    title: '1 friend',
    reward: '1 week Pro at launch',
  },
  {
    friends: 3,
    title: '3 friends',
    reward: '1 month Pro at launch',
  },
  {
    friends: 7,
    title: '7 friends',
    reward: '3 months Pro at launch',
  },
] as const;

export const REFERRAL_GOAL = REFERRAL_MILESTONES[REFERRAL_MILESTONES.length - 1].friends;
