import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/Logo';

interface SignInShellProps {
  children: ReactNode;
}

export function SignInShell({ children }: SignInShellProps) {
  return (
    <div className="fixed inset-0 z-[100] grid min-h-dvh bg-syntax-bg lg:grid-cols-2">
      <div className="relative flex flex-col overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-medium text-syntax-muted transition hover:text-syntax-text"
            href="/"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
          <Link className="shrink-0" href="/">
            <Logo className="h-9 w-9" />
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10 lg:py-16">
          {children}
        </div>

        <p className="mx-auto max-w-md pb-2 text-center text-xs text-syntax-muted">
          By continuing, you agree to our{' '}
          <Link className="text-syntax-text underline-offset-4 hover:underline" href="/terms">
            Terms
          </Link>{' '}
          and{' '}
          <Link className="text-syntax-text underline-offset-4 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <aside
        className="relative hidden overflow-hidden border-l border-syntax-border lg:block"
        aria-hidden="true"
      >
        <div className="signin-hero-grid absolute inset-0 bg-syntax-bg" />
        <div className="signin-hero-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(255_255_255_/_0.08),transparent_55%)]" />

        <div className="relative flex h-full flex-col items-center justify-center px-14 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-syntax-muted">
            SyntaxAI
          </p>
          <h2 className="mt-6 max-w-md font-mono text-4xl font-bold uppercase leading-tight tracking-[0.06em] text-syntax-text xl:text-5xl">
            Built for{' '}
            <span className="accent-glow text-syntax-accent">deep</span> work
          </h2>
          <div className="section-neon-line mx-auto mt-6" />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-syntax-muted">
            Capture snippets, page context, and screenshots — then find them when the tab is
            already closed.
          </p>

          <div className="mt-14 w-full max-w-sm rounded-2xl border border-syntax-border bg-syntax-card/80 p-5 text-left shadow-[var(--syntax-glow)] backdrop-blur-sm">
            <div className="code-surface p-4 text-[11px] leading-relaxed text-syntax-muted">
              <span className="text-syntax-text">const</span> library = capture(tab)
              <br />
              <span className="text-syntax-text">await</span> library.tagWithAI()
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['TypeScript', 'React', 'local-first'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-syntax-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
