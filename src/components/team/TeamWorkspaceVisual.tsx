'use client';

import { m } from 'motion/react';

const MEMBERS = [
  { initials: 'AK', tone: 'from-white/20 to-white/5' },
  { initials: 'JR', tone: 'from-white/16 to-white/4' },
  { initials: 'MS', tone: 'from-white/14 to-white/3' },
  { initials: '+3', tone: 'from-white/10 to-transparent' },
] as const;

const SNIPPETS = [
  { title: 'auth/session.ts', tag: 'Pattern' },
  { title: 'retry-backoff', tag: 'Utils' },
  { title: 'neon-migration', tag: 'DevOps' },
] as const;

export function TeamWorkspaceVisual() {
  return (
    <div className="team-visual relative mx-auto w-full max-w-md md:max-w-none">
      <div className="team-visual__glow pointer-events-none" aria-hidden />

      <m.div
        className="team-visual__panel relative overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-syntax-border pb-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
              Team library
            </p>
            <p className="mt-1 text-sm font-medium text-syntax-text">syntaxai / platform</p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
            Soon
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {MEMBERS.map((member, index) => (
            <m.span
              key={member.initials}
              className={`team-visual__avatar inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b text-[11px] font-semibold text-syntax-text ${member.tone}`}
              initial={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              {member.initials}
            </m.span>
          ))}
        </div>

        <ul className="mt-5 space-y-2.5">
          {SNIPPETS.map((snippet, index) => (
            <m.li
              key={snippet.title}
              className="flex items-center justify-between rounded-xl border border-syntax-border bg-syntax-bg/80 px-3 py-2.5"
              initial={{ opacity: 0, x: 16 }}
              transition={{ delay: 0.22 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span className="font-mono text-xs text-syntax-text">{snippet.title}</span>
              <span className="rounded-md border border-syntax-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-syntax-muted">
                {snippet.tag}
              </span>
            </m.li>
          ))}
        </ul>

        <div className="team-visual__sync mt-4 flex items-center gap-2 text-xs text-syntax-muted">
          <span className="team-visual__sync-dot" aria-hidden />
          Live sync across teammates
        </div>
      </m.div>
    </div>
  );
}
