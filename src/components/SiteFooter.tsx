import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import { isBillingEnabled, SUPPORT_EMAIL } from '@/lib/site';

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-syntax-border bg-syntax-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Link className="inline-flex items-center gap-3" href="/">
            <Logo className="h-9 w-9" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-syntax-text">
              SyntaxAI
            </span>
          </Link>
          <p className="mt-3 text-sm text-syntax-muted">
            AI-powered developer notebook for Chrome.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-syntax-muted">
          <Link className="transition hover:text-syntax-text" href="/pricing">
            {isBillingEnabled ? 'Pricing' : 'Beta'}
          </Link>
          <Link className="transition hover:text-syntax-text" href="/#faq">
            FAQ
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

      <div className="border-t border-syntax-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 text-xs text-syntax-muted sm:flex-row">
          <p>Copyright © {YEAR} SyntaxAI. All rights reserved.</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
