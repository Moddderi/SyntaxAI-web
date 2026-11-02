import Link from 'next/link';
import { isBillingEnabled } from '@/lib/site';

/** Shown on /account while paid plans are off — pushes invites instead of checkout */
export function BetaAccessPanel() {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <div>
        <p className="font-mono text-4xl font-bold tracking-tight text-syntax-text">Beta</p>
        <p className="mt-2 inline-flex rounded-full border border-white/15 bg-syntax-hover px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-text">
          Free access
        </p>
      </div>

      <p className="text-sm leading-relaxed text-syntax-muted">
        Paid plans are paused while we run open beta. Everything in the extension is unlocked —
        no Free/Pro gates for now.
      </p>

      <ul className="space-y-2 text-sm text-syntax-muted">
        <li className="flex gap-2">
          <span className="text-syntax-text">✓</span>
          Full capture &amp; library features
        </li>
        <li className="flex gap-2">
          <span className="text-syntax-text">✓</span>
          Invite friends → Pro credits when billing launches
        </li>
        <li className="flex gap-2">
          <span className="text-syntax-text">✓</span>
          Early feedback shapes the product
        </li>
      </ul>

      <p className="mt-auto text-xs leading-relaxed text-syntax-muted">
        {isBillingEnabled ? (
          <>
            Checkout is live —{' '}
            <Link className="text-syntax-text underline-offset-4 hover:underline" href="/pricing">
              see pricing
            </Link>
            .
          </>
        ) : (
          <>
            Want more people in beta? Share your invite link next to this card — rewards unlock at
            public launch.
          </>
        )}
      </p>
    </div>
  );
}
