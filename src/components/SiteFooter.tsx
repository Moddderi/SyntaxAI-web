import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-syntax-border bg-syntax-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-syntax-text">
            SyntaxAI
          </p>
          <p className="mt-1 text-sm text-syntax-muted">
            AI-powered developer notebook for Chrome.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-syntax-muted">
          <Link className="transition hover:text-syntax-text" href="/pricing">
            Pricing
          </Link>
          <Link className="transition hover:text-syntax-text" href="/account">
            Account
          </Link>
          <Link className="transition hover:text-syntax-text" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-syntax-text" href="/terms">
            Terms
          </Link>
          <a className="transition hover:text-syntax-text" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
