'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FREE_LIMITS, PRO_PRICE } from '@/lib/site';

function Benefit({ children, dimmed = false }: { children: string; dimmed?: boolean }) {
  return (
    <li
      className={`flex gap-2.5 text-sm leading-snug ${dimmed ? 'text-syntax-muted/75' : 'text-syntax-muted'}`}
    >
      <span className="shrink-0 text-syntax-text">✓</span>
      <span>{children}</span>
    </li>
  );
}

export function SubscriptionPanel({ isPro }: { isPro: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setBusy(true);
    setError(null);

    const { data, error: portalError } = await authClient.customer.portal();
    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    setError(portalError?.message || 'Could not open the billing portal.');
    setBusy(false);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="subscription-panel flex-1 rounded-2xl border border-white/10 bg-syntax-bg/80 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-4xl font-bold tracking-tight">{isPro ? 'Pro' : 'Free'}</p>
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
              isPro
                ? 'border-white/30 bg-syntax-accent text-syntax-accent-fg shadow-[var(--syntax-glow)]'
                : 'border-syntax-border bg-syntax-card text-syntax-muted'
            }`}
          >
            {isPro ? 'Active' : 'Free tier'}
          </span>
        </div>

        <ul className="mt-5 space-y-2.5">
          <Benefit>Smart titles, tags & stack detection</Benefit>
          <Benefit>Side panel + searchable library</Benefit>
          <Benefit>Local-first notes in Chrome</Benefit>
          {isPro ? (
            <>
              <Benefit>Unlimited saved notes</Benefit>
              <Benefit>Unlimited page context captures</Benefit>
              <Benefit>Unlimited photo & screenshot reads</Benefit>
              <Benefit>Priority AI analysis</Benefit>
            </>
          ) : (
            <>
              <Benefit>{`${FREE_LIMITS.notes} saved notes`}</Benefit>
              <Benefit>{`${FREE_LIMITS.contextSaves} page context captures`}</Benefit>
              <Benefit>{`${FREE_LIMITS.photoReads} photo reads`}</Benefit>
              <Benefit dimmed>{`Pro — unlimited everything at ${PRO_PRICE}/mo`}</Benefit>
            </>
          )}
        </ul>
      </div>

      <div className="mt-6">
        {isPro ? (
          <button
            className="btn-primary inline-flex h-12 w-full items-center justify-center rounded-full text-[11px]"
            disabled={busy}
            onClick={openPortal}
            type="button"
          >
            {busy ? 'Opening…' : 'Manage billing'}
          </button>
        ) : (
          <>
            <button
              className="btn-upgrade-pro inline-flex h-12 w-full items-center justify-center gap-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition disabled:opacity-70"
              disabled={busy}
              onClick={() => router.push('/pricing')}
              type="button"
            >
              Upgrade to Pro
              <span aria-hidden="true">→</span>
            </button>
            <p className="mt-3 text-center text-xs text-syntax-muted">
              Cancel anytime · Billed via Polar
            </p>
          </>
        )}
        {error ? <p className="mt-3 text-center text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
}
