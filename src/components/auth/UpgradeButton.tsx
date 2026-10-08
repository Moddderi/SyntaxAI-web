'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function UpgradeButton({ isPro = false }: { isPro?: boolean }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const { data, error: checkoutError } = await authClient.checkout({
      slug: 'pro',
    });

    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    setError(checkoutError?.message || 'Checkout is not available yet.');
    setBusy(false);
  }

  const label = isPro
    ? 'Manage billing'
    : busy
      ? 'Opening Polar…'
      : 'Upgrade to Pro';

  return (
    <div>
      <button
        className="btn-primary mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-[11px] disabled:cursor-wait disabled:opacity-70"
        disabled={busy || isPending}
        onClick={upgrade}
        type="button"
      >
        {label}
      </button>
      {error ? <p className="mt-3 text-center text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
