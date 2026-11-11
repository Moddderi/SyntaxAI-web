import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { HeroShowcase } from './HeroShowcase';
import { MarketingBackdrop } from './MarketingBackdrop';
import { CursorGlow } from './motion/CursorGlow';
import { isBillingEnabled, PRO_PRICE } from '@/lib/site';

const TRUST_ITEMS = ['Chrome & Firefox', 'Local-first + sync', 'Vision AI for screenshots'] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden">
      <MarketingBackdrop variant="landing" />
      <CursorGlow />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div>
            <p className="hero-enter hero-enter-1 mb-6 inline-flex items-center gap-2.5 rounded-full border border-syntax-border bg-syntax-card/70 py-1.5 pl-3 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-syntax-muted backdrop-blur">
              <span className="live-dot" aria-hidden />
              {isBillingEnabled ? 'AI developer notebook' : 'Open beta · free for early users'}
            </p>

            <h1 className="hero-enter hero-enter-2 max-w-xl font-mono text-4xl font-bold uppercase leading-[1.1] tracking-[0.06em] md:text-5xl lg:text-[3.25rem]">
              Turn every tab into a <span className="text-shimmer">code library</span>.
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 max-w-lg text-lg leading-relaxed text-syntax-muted">
              Capture snippets, docs, and screenshots from any page. SyntaxAI titles, tags,
              and stacks them — so the next time you need that pattern, it&apos;s already
              yours.
            </p>

            <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap items-center gap-3">
              <ChromeStoreButton className="cta-pulse" showArrow size="lg">
                Add to Chrome
              </ChromeStoreButton>
              <Link
                className="btn-secondary inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium"
                href="#how-it-works"
              >
                See it in action
                <span aria-hidden="true">↓</span>
              </Link>
            </div>

            <p className="hero-enter hero-enter-4 mt-5 text-sm text-syntax-muted">
              {isBillingEnabled
                ? `Free to start · Pro from ${PRO_PRICE}/mo · Sign in for billing`
                : 'Free full access · invite friends for launch rewards'}
            </p>

            <ul className="hero-enter hero-enter-5 mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-syntax-border pt-6">
              {TRUST_ITEMS.map((item) => (
                <li
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-syntax-muted"
                  key={item}
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-syntax-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
