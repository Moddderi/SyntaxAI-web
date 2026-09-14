import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { Reveal } from '@/components/motion/Reveal';
import { FREE_LIMITS, PRO_PRICE } from '@/lib/site';

const PRO_FEATURES = [
  'Unlimited notes in your library',
  'Unlimited page context captures',
  'Unlimited photo & screenshot reads',
  'Priority AI analysis',
] as const;

const FREE_FEATURES = [
  `${FREE_LIMITS.notes} saved notes`,
  `${FREE_LIMITS.contextSaves} page context captures`,
  `${FREE_LIMITS.photoReads} photo reads`,
  'Smart titles, tags & stack detection',
] as const;

interface PricingCardsProps {
  showFreeCta?: boolean;
}

export function PricingCards({ showFreeCta = true }: PricingCardsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal>
        <article className="lift-card rounded-2xl border border-syntax-border bg-syntax-card p-8 md:p-10">
        <p className="text-sm font-medium text-syntax-muted">Free</p>
        <p className="mt-3 text-5xl font-semibold tracking-tight">$0</p>
        <p className="mt-2 text-sm text-syntax-muted">Capture and build a library today</p>

        <ul className="mt-8 space-y-3">
          {FREE_FEATURES.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-syntax-muted">
              <span className="text-syntax-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {showFreeCta ? (
          <div className="mt-8">
            <ChromeStoreButton className="w-full" size="md">
              Get Extension
            </ChromeStoreButton>
          </div>
        ) : null}
      </article>
      </Reveal>

      <Reveal delay={0.08}>
      <article className="lift-card relative overflow-hidden rounded-2xl border border-syntax-accent/35 bg-linear-to-br from-syntax-accent/12 via-syntax-card to-syntax-card p-8 md:p-10">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-syntax-accent/15 blur-2xl" />
        <p className="text-sm font-medium text-syntax-accent">Pro</p>
        <p className="mt-3 text-5xl font-semibold tracking-tight">
          {PRO_PRICE}
          <span className="text-base font-normal text-syntax-muted"> / month</span>
        </p>
        <p className="mt-2 text-sm text-syntax-muted">Remove the limits when the library grows</p>

        <ul className="mt-8 space-y-3">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-syntax-muted">
              <span className="text-syntax-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <button
          className="mt-8 inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-xl bg-syntax-accent/50 text-sm font-semibold text-black/70"
          disabled
          type="button"
        >
          Upgrade — coming with accounts
        </button>
        <p className="mt-3 text-center text-xs text-syntax-muted">
          Billing opens after backend launch
        </p>
      </article>
      </Reveal>
    </div>
  );
}

export function PricingTeaser() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28" id="pricing">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Simple pricing
          </h2>
          <p className="mt-4 text-syntax-muted">
            Free to start. Pro at {PRO_PRICE}/mo when you need unlimited captures.
          </p>
          <Link
            className="mt-3 inline-block text-sm font-medium text-syntax-accent transition hover:text-syntax-accent/80"
            href="/pricing"
          >
            Full pricing →
          </Link>
        </Reveal>
        <PricingCards />
      </div>
    </section>
  );
}
