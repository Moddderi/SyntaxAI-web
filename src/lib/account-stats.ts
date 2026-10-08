export function getAccountMemberStats(createdAt: Date | string | null | undefined) {
  const joined = createdAt ? new Date(createdAt) : new Date();
  const ms = Date.now() - joined.getTime();
  const daysActive = Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);

  const memberSince = joined.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return { daysActive, memberSince };
}
