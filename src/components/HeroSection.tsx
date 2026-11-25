import Link from 'next/link';
import Image from 'next/image';
import { HeroShowcase } from './HeroShowcase';
import { MarketingBackdrop } from './MarketingBackdrop';
import { CursorGlow } from './motion/CursorGlow';
import {
  BROWSER_ICON_CHROME,
  BROWSER_ICON_FIREFOX,
  CHROME_STORE_URL,
  FIREFOX_ADDON_URL,
  isBillingEnabled,
  PRO_PRICE,
} from '@/lib/site';

const TRUST_ITEMS = ['Chrome & Firefox', 'Local-first + sync', 'Vision AI for screenshots'] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden">
      <MarketingBackdrop variant="landing" />
      <CursorGlow />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div>
            <p className="hero-enter hero-enter-1 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
              <span className="live-dot" aria-hidden />
              {isBillingEnabled ? 'AI developer notebook' : 'Open beta · free for early users'}
            </p>

            <h1 className="hero-enter hero-enter-2 max-w-xl font-mono text-4xl font-bold uppercase leading-[1.08] tracking-[0.05em] md:text-5xl lg:text-[3.15rem]">
              Turn every tab into a <span className="text-shimmer">code library</span>.
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 max-w-lg text-lg leading-relaxed text-syntax-muted">
              Capture snippets, docs, and screenshots from any page. SyntaxAI titles, tags,
              and stacks them — so the next time you need that pattern, it&apos;s already
              yours.
            </p>

            <div className="hero-enter hero-enter-4 mt-9 flex flex-col items-start gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="btn-brand inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-sm"
                  href={CHROME_STORE_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt=""
                    aria-hidden
                    className="h-5 w-5 object-contain"
                    height={20}
                    src={BROWSER_ICON_CHROME}
                    width={20}
                  />
                  Get extension
                </a>
                <Link
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition hover:bg-white/90"
                  href="/pricing"
                >
                  See pricing
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </Link>
              </div>
              <a
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/15 px-7 text-sm font-medium text-syntax-text transition hover:border-white/30 hover:bg-white/5"
                href={FIREFOX_ADDON_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt=""
                  aria-hidden
                  className="h-5 w-5 object-contain"
                  height={20}
                  src={BROWSER_ICON_FIREFOX}
                  width={20}
                />
                Add to Firefox
              </a>
            </div>

            <p className="hero-enter hero-enter-4 mt-4 text-sm text-syntax-muted">
              {isBillingEnabled
                ? `Free to start · Pro ${PRO_PRICE}/mo`
                : 'Free full access during beta'}
            </p>

            <ul className="hero-enter hero-enter-5 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-syntax-muted">
              {TRUST_ITEMS.map((item) => (
                <li className="flex items-center gap-2 text-sm" key={item}>
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-syntax-text"
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
