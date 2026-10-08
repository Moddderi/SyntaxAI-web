import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { UpgradeButton } from '@/components/auth/UpgradeButton';
import { Reveal } from '@/components/motion/Reveal';
import { SectionAmbient } from '@/components/SectionAmbient';
import { SectionHead } from '@/components/SectionHead';
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
        <article className="lift-card rounded-3xl border border-syntax-border bg-syntax-card p-8 md:p-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-syntax-muted">
            Free
          </p>
          <p className="mt-3 font-mono text-5xl font-bold tracking-tight">$0</p>
          <p className="mt-2 text-sm text-syntax-muted">Capture and build a library today</p>

          <ul className="mt-8 space-y-3">
            {FREE_FEATURES.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-syntax-muted">
                <span className="text-syntax-text">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {showFreeCta ? (
            <div className="mt-8">
              <ChromeStoreButton className="w-full" size="md">
                Add to Chrome
              </ChromeStoreButton>
            </div>
          ) : null}
        </article>
      </Reveal>

      <Reveal delay={0.08} variant="scale">
        <article className="lift-card pricing-pro-card relative overflow-hidden rounded-3xl border border-white/20 bg-syntax-card p-8 shadow-[var(--syntax-glow)] md:p-10">
          <span className="pricing-pro-card__shine" aria-hidden />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-syntax-text">
            Pro
          </p>
          <p className="mt-3 font-mono text-5xl font-bold tracking-tight">
            {PRO_PRICE}
            <span className="text-base font-normal text-syntax-muted"> / month</span>
          </p>
          <p className="mt-2 text-sm text-syntax-muted">Remove the limits when the library grows</p>

          <ul className="mt-8 space-y-3">
            {PRO_FEATURES.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-syntax-muted">
                <span className="text-syntax-text">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <UpgradeButton />
          <p className="mt-3 text-center text-xs text-syntax-muted">
            Billed by Polar. Cancel anytime.
          </p>
        </article>
      </Reveal>
    </div>
  );
}

export function PricingTeaser() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-20 md:py-28" id="pricing">
      <SectionAmbient tone="pricing" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mb-12" variant="blur-up">
          <SectionHead
            label="Pricing"
            title="Simple pricing"
            description={`Free to start. Pro at ${PRO_PRICE}/mo when you need unlimited captures.`}
          />
          <Link
            className="mx-auto mt-6 block w-fit text-sm font-medium text-syntax-muted transition hover:text-syntax-text"
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
