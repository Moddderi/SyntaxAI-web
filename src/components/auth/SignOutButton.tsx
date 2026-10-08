'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function SignOutButton({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
    setBusy(false);
  }

  return (
    <button
      className={`btn-sign-out inline-flex w-full items-center justify-center gap-2 rounded-full font-medium transition disabled:opacity-60 ${
        compact ? 'h-10 px-4 text-xs' : 'h-12 px-6 text-sm'
      } ${className}`}
      disabled={busy}
      onClick={signOut}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4 opacity-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
        <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
