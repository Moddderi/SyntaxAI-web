'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export function AuthNav({ compact = false }: { compact?: boolean }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <span className="inline-flex h-9 min-w-16 items-center justify-center text-xs text-syntax-muted">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <Link
        className={
          compact
            ? 'text-base font-medium text-syntax-muted transition hover:text-syntax-text'
            : 'btn-secondary inline-flex h-9 items-center rounded-full px-4 text-xs font-medium'
        }
        href="/account"
      >
        Account
      </Link>
    );
  }

  return (
    <Link
      className={
        compact
          ? 'text-base font-medium text-syntax-muted transition hover:text-syntax-text'
          : 'btn-secondary inline-flex h-9 items-center rounded-full px-4 text-xs font-medium'
      }
      href="/auth/signin"
    >
      Sign in
    </Link>
  );
}
