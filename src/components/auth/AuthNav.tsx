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
            ? 'btn-brand inline-flex h-11 items-center justify-center rounded-full text-sm'
            : 'btn-brand inline-flex h-9 items-center rounded-full px-4 text-sm'
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
            : 'inline-flex h-9 items-center px-2 text-sm font-medium text-syntax-muted transition hover:text-syntax-text'
        }
        href="/auth/signin"
      >
        Sign in
      </Link>
  );
}
