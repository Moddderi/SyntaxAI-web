'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthNav } from './auth/AuthNav';
import { Logo } from './Logo';
import { ChromeStoreButton } from './ChromeStoreButton';
import { isBillingEnabled } from '@/lib/site';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: isBillingEnabled ? 'Pricing' : 'Beta' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /** "Home" must always land at the very top (and drop any #hash), even when already on `/`. */
  const goTop = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="relative z-40 border-b border-syntax-border bg-syntax-bg">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-6">
        <Link className="flex items-center gap-3" href="/" onClick={goTop}>
          <Logo className="h-8 w-8" />
          <span className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-syntax-text">
            SyntaxAI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className="text-sm font-medium text-syntax-muted transition hover:text-syntax-text"
              href={link.href}
              onClick={link.href === '/' ? goTop : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <AuthNav />
          </div>
          <ChromeStoreButton size="sm" />

          <button
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="btn-secondary inline-flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-syntax-border bg-syntax-bg px-6 py-4 md:hidden"
          id="mobile-nav"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                className="text-base font-medium text-syntax-muted transition hover:text-syntax-text"
                href={link.href}
                onClick={link.href === '/' ? goTop : () => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <AuthNav compact />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
