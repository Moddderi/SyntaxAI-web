'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function AccountActions({
  isPro,
  fullWidth = false,
}: {
  isPro: boolean;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<'portal' | 'signout' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setBusy('portal');
    setError(null);

    const { data, error: portalError } = await authClient.customer.portal();
    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    setError(portalError?.message || 'Could not open the billing portal.');
    setBusy(null);
  }

  async function signOut() {
    setBusy('signout');
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
    setBusy(null);
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`flex flex-col gap-3 ${fullWidth ? '' : 'mt-8 sm:flex-row'}`}>
      {isPro ? (
        <button
          className={`btn-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-[11px] disabled:opacity-70 ${widthClass}`}
          disabled={busy !== null}
          onClick={openPortal}
          type="button"
        >
          {busy === 'portal' ? 'Opening…' : 'Manage billing'}
        </button>
      ) : (
        <button
          className={`btn-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-[11px] disabled:opacity-70 ${widthClass}`}
          disabled={busy !== null}
          onClick={() => router.push('/pricing')}
          type="button"
        >
          Upgrade to Pro
        </button>
      )}
      <button
        className={`btn-secondary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium disabled:opacity-70 ${widthClass}`}
        disabled={busy !== null}
        onClick={signOut}
        type="button"
      >
        {busy === 'signout' ? 'Signing out…' : 'Sign out'}
      </button>
      {error ? <p className="text-sm text-red-400 sm:self-center">{error}</p> : null}
    </div>
  );
}
