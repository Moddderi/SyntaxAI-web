'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { startProCheckout } from '@/lib/billing-client';
import { isBillingEnabled } from '@/lib/site';

const subscribeNoop = (): (() => void) => () => undefined;

/** false during SSR/hydration, true after the client has mounted. */
function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function UpgradeButton({
  isPro = false,
  label,
}: {
  isPro?: boolean;
  label?: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useIsMounted();

  if (!isBillingEnabled) {
    return (
      <div className="mt-8">
        <Link
          className="btn-primary inline-flex h-11 w-full items-center justify-center rounded-full text-[11px]"
          href={session?.user ? '/account' : '/auth/signin?next=/account'}
        >
          {session?.user ? 'Invite friends' : 'Sign in to invite'}
        </Link>
        <p className="mt-3 text-center text-xs text-syntax-muted">
          Checkout paused during beta — share invites instead.
        </p>
      </div>
    );
  }

  async function upgrade() {
    if (!session?.user) {
      router.push('/auth/signin?next=/pricing');
      return;
    }

    if (isPro) {
      router.push('/account');
      return;
    }

    setBusy(true);
    setError(null);

    const { url, error: checkoutError } = await startProCheckout();

    if (url) {
      window.location.href = url;
      return;
    }

    setError(checkoutError || 'Checkout is not available yet.');
    setBusy(false);
  }

  const buttonLabel = isPro
    ? 'Manage billing'
    : busy
      ? 'Opening checkout…'
      : (label ?? 'Start 7-day free trial');

  return (
    <div>
      <button
        className="btn-brand inline-flex h-12 w-full items-center justify-center rounded-full text-sm disabled:cursor-wait disabled:opacity-70"
        disabled={busy || (mounted && isPending)}
        onClick={upgrade}
        type="button"
      >
        {buttonLabel}
      </button>
      {error ? <p className="mt-3 text-center text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
