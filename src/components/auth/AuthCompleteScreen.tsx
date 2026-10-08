'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

type Phase = 'loading' | 'success';

interface AuthCompleteScreenProps {
  nextPath: string;
}

export function AuthCompleteScreen({ nextPath }: AuthCompleteScreenProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [phase, setPhase] = useState<Phase>('loading');
  const [statusText, setStatusText] = useState('Connecting your account…');

  useEffect(() => {
    if (isPending || !session?.user) {
      return;
    }

    void fetch('/api/referral/claim', { method: 'POST' });
  }, [isPending, session?.user]);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!session?.user) {
      const timeout = window.setTimeout(() => {
        router.replace('/auth/signin?next=' + encodeURIComponent(nextPath));
      }, 2500);
      return () => window.clearTimeout(timeout);
    }

    const loadingTimer = window.setTimeout(() => {
      setStatusText('Session secured');
      setPhase('success');
    }, 1400);

    return () => window.clearTimeout(loadingTimer);
  }, [isPending, session?.user, router, nextPath]);

  useEffect(() => {
    if (phase !== 'success' || !session?.user) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      const separator = nextPath.includes('?') ? '&' : '?';
      router.replace(`${nextPath}${separator}welcome=1`);
    }, 1600);

    return () => window.clearTimeout(redirectTimer);
  }, [phase, session?.user, router, nextPath]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-syntax-bg px-6">
      <div className="auth-complete-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          {phase === 'loading' ? (
            <>
              <span className="auth-complete-ring absolute inset-0 rounded-full border border-white/10" />
              <span className="auth-complete-ring auth-complete-ring-delay absolute inset-2 rounded-full border border-white/20" />
              <span className="auth-complete-spinner absolute inset-0 rounded-full border-2 border-transparent border-t-white/90" />
            </>
          ) : (
            <span className="auth-complete-check flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-syntax-card shadow-[var(--syntax-glow-strong)]">
              <svg
                aria-hidden="true"
                className="auth-complete-check-icon h-10 w-10 text-syntax-accent"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path className="auth-complete-check-path" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}

          <Image
            alt=""
            aria-hidden
            className={`absolute h-10 w-10 object-contain transition-opacity duration-500 ${
              phase === 'success' ? 'opacity-0' : 'opacity-100'
            }`}
            height={40}
            src="/logo-mark.png"
            width={40}
          />
        </div>

        <p className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.2em] text-syntax-muted">
          {phase === 'loading' ? 'SyntaxAI' : 'Success'}
        </p>
        <h1 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[0.08em] text-syntax-text sm:text-3xl">
          {phase === 'loading' ? 'Signing you in' : "You're in"}
        </h1>
        <p className="mt-3 max-w-xs text-sm text-syntax-muted">{statusText}</p>

        {phase === 'success' && session?.user?.name ? (
          <p className="mt-6 text-sm text-syntax-text">
            Welcome, <span className="font-medium">{session.user.name}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
