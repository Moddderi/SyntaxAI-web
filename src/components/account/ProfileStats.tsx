interface ProfileStatsProps {
  daysActive: number;
  memberSince: string;
}

export function ProfileStats({ daysActive, memberSince }: ProfileStatsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <div className="flex flex-col items-center justify-center rounded-xl border border-syntax-border bg-syntax-bg/80 px-4 py-6 text-center">
        <p className="font-mono text-4xl font-bold tabular-nums leading-none text-syntax-accent accent-glow">
          {daysActive}
        </p>
        <p className="mt-3 text-[11px] font-medium text-syntax-muted">Days with SyntaxAI</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-syntax-border bg-syntax-bg/80 px-4 py-6 text-center">
        <p className="font-mono text-lg font-semibold tabular-nums leading-tight text-syntax-text md:text-xl">
          {memberSince}
        </p>
        <p className="mt-3 text-[11px] font-medium text-syntax-muted">Member since</p>
      </div>
    </div>
  );
}
