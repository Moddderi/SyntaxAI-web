import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { HeroMedia } from './HeroMedia';
import { PRO_PRICE } from '@/lib/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-float absolute -left-40 top-16 h-64 w-[42rem] -rotate-12 rounded-full bg-syntax-accent/20 blur-3xl" />
        <div className="orb-float-alt absolute left-10 top-40 h-40 w-[36rem] -rotate-6 rounded-full bg-syntax-accent/10 blur-2xl" />
        <div className="orb-float absolute right-0 top-0 h-80 w-80 rounded-full bg-syntax-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div>
            <p className="hero-enter hero-enter-1 mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-syntax-accent">
              Chrome extension · local-first
            </p>

            <h1 className="hero-enter hero-enter-2 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Turn every tab into a <span className="accent-flow">code library</span>.
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 max-w-lg text-lg leading-relaxed text-syntax-muted">
              Capture snippets, docs, and screenshots from any page. SyntaxAI titles, tags,
              and stacks them — so the next time you need that pattern, it&apos;s already
              yours.
            </p>

            <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap items-center gap-3">
              <ChromeStoreButton showArrow size="lg">
                Get Extension
              </ChromeStoreButton>
              <Link
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-base font-semibold text-[#0d0d0f] shadow-[0_0_0_1px_rgba(0,234,255,0.35),0_8px_28px_rgba(0,234,255,0.16)] transition duration-300 hover:bg-[#e7fbff] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]"
                href="#pricing"
              >
                See Pricing
                <span aria-hidden="true">↓</span>
              </Link>
            </div>

            <p className="hero-enter hero-enter-4 mt-5 text-sm text-syntax-muted">
              Free to start · Pro from {PRO_PRICE}/mo · No account required yet
            </p>
          </div>

          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
