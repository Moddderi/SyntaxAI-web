import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { HeroMedia } from './HeroMedia';
import { MarketingBackdrop } from './MarketingBackdrop';
import { PRO_PRICE } from '@/lib/site';

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden">
      <MarketingBackdrop variant="landing" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div>
            <p className="hero-enter hero-enter-1 mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
              Chrome extension · local-first
            </p>

            <h1 className="hero-enter hero-enter-2 max-w-xl font-mono text-4xl font-bold uppercase leading-[1.1] tracking-[0.06em] md:text-5xl lg:text-[3.25rem]">
              Turn every tab into a{' '}
              <span className="accent-glow text-syntax-accent">code library</span>.
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 max-w-lg text-lg leading-relaxed text-syntax-muted">
              Capture snippets, docs, and screenshots from any page. SyntaxAI titles, tags,
              and stacks them — so the next time you need that pattern, it&apos;s already
              yours.
            </p>

            <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap items-center gap-3">
              <ChromeStoreButton showArrow size="lg">
                Add to Chrome
              </ChromeStoreButton>
              <Link
                className="btn-secondary inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium"
                href="#pricing"
              >
                See pricing
                <span aria-hidden="true">↓</span>
              </Link>
            </div>

            <p className="hero-enter hero-enter-4 mt-5 text-sm text-syntax-muted">
              Free to start · Pro from {PRO_PRICE}/mo · Sign in for billing
            </p>
          </div>

          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
