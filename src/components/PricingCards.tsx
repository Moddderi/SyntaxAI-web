import Link from 'next/link';
import { ChromeStoreButton } from './ChromeStoreButton';
import { UpgradeButton } from '@/components/auth/UpgradeButton';
import { Reveal } from '@/components/motion/Reveal';
import { FeatureIcon, type FeatureIconName } from '@/components/pricing/FeatureIcon';
import { SectionAmbient } from '@/components/SectionAmbient';
import { SectionHead } from '@/components/SectionHead';
import { FREE_LIMITS, isBillingEnabled, PRO_PRICE } from '@/lib/site';

const PRO_FEATURES: { icon: FeatureIconName; text: string }[] = [
  { icon: 'stack', text: 'Everything in Free' },
  { icon: 'unlimited', text: 'Unlimited notes in your library' },
  { icon: 'capture', text: 'Unlimited page context captures' },
  { icon: 'photo', text: 'Unlimited photo & screenshot reads' },
  { icon: 'priority', text: 'Priority AI analysis' },
];

const FREE_FEATURES: { icon: FeatureIconName; text: string }[] = [
  { icon: 'notes', text: `${FREE_LIMITS.notes} saved notes` },
  { icon: 'capture', text: `${FREE_LIMITS.contextSaves} page context captures` },
  { icon: 'photo', text: `${FREE_LIMITS.photoReads} photo reads` },
  { icon: 'sparkle', text: 'Smart titles, tags & stack detection' },
];

const BETA_FEATURES: { icon: FeatureIconName; text: string }[] = [
  { icon: 'unlimited', text: 'Full extension features unlocked' },
  { icon: 'stack', text: 'No Free / Pro gates during beta' },
  { icon: 'sparkle', text: 'Invite friends → Pro credits at launch' },
  { icon: 'notes', text: 'Local-first notes with account sync' },
];

function Feature({ icon, children }: { icon: FeatureIconName; children: string }) {
  return (
    <li className="flex gap-3 text-sm leading-snug text-syntax-muted">
      <FeatureIcon name={icon} />
      <span>{children}</span>
    </li>
  );
}

interface PricingCardsProps {
  showFreeCta?: boolean;
}

export function PricingCards({ showFreeCta = true }: PricingCardsProps) {
  if (!isBillingEnabled) {
    return (
      <Reveal variant="scale">
        <article className="lift-card pricing-pro-card relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-syntax-card p-8 shadow-[var(--syntax-glow)] md:p-10">
          <span className="pricing-pro-card__shine" aria-hidden />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-syntax-text">
            Open beta
          </p>
          <p className="mt-3 font-mono text-5xl font-bold tracking-tight">Free</p>
          <p className="mt-2 text-sm text-syntax-muted">
            Paid plans are coming later. Right now everyone gets full access — invite friends to
            earn Pro credits for launch.
          </p>

          <ul className="mt-8 space-y-3.5">
            {BETA_FEATURES.map((feature) => (
              <Feature icon={feature.icon} key={feature.text}>
                {feature.text}
              </Feature>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {showFreeCta ? (
              <ChromeStoreButton className="flex-1" size="md">
                Get extension
              </ChromeStoreButton>
            ) : null}
            <Link
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium"
              href="/auth/signin?next=/account"
            >
              Sign in &amp; invite
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-syntax-muted">
            Planned Pro price later: {PRO_PRICE}/mo — not billed during beta.
          </p>
        </article>
      </Reveal>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-2 lg:items-stretch">
      <Reveal>
        <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-syntax-card/80 p-8 md:p-9">
          <p className="text-sm font-medium text-syntax-muted">Free</p>
          <p className="mt-3 font-mono text-5xl font-bold tracking-tight">
            $0
            <span className="text-base font-normal text-syntax-muted"> / month</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-syntax-muted">
            Capture from any tab and build a personal library.{' '}
            <span className="text-syntax-brand-soft">Free forever</span> on the limits below.
          </p>

          <ul className="mt-8 space-y-3.5">
            {FREE_FEATURES.map((feature) => (
              <Feature icon={feature.icon} key={feature.text}>
                {feature.text}
              </Feature>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <ChromeStoreButton
              className="w-full rounded-full border border-white/15 bg-transparent font-sans text-sm font-medium normal-case tracking-normal text-syntax-text shadow-none hover:bg-white/5"
              size="lg"
              variant="secondary"
            >
              Get started
            </ChromeStoreButton>
            <p className="mt-3 text-center text-xs text-syntax-muted">No credit card required</p>
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.08} variant="scale">
        <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-syntax-brand/35 bg-syntax-card p-8 shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_24px_80px_rgba(0,0,0,0.45)] md:p-9">
          <p className="text-sm font-medium text-syntax-brand-soft">SyntaxAI Pro</p>
          <p className="mt-3 font-mono text-5xl font-bold tracking-tight">
            {PRO_PRICE}
            <span className="text-base font-normal text-syntax-muted"> / month</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-syntax-muted">
            Everything in Free, plus the{' '}
            <span className="text-syntax-brand-soft">unlimited library</span>.
          </p>

          <ul className="mt-8 space-y-3.5">
            {PRO_FEATURES.map((feature) => (
              <Feature icon={feature.icon} key={feature.text}>
                {feature.text}
              </Feature>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <UpgradeButton />
            <p className="mt-3 text-center text-xs text-syntax-muted">
              Cancel anytime · 7-day free trial
            </p>
          </div>
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
            label={isBillingEnabled ? 'Pricing' : 'Beta'}
            title={isBillingEnabled ? 'Simple pricing' : 'Free while we beta'}
            description={
              isBillingEnabled
                ? `Free to start. Pro at ${PRO_PRICE}/mo when you need unlimited captures.`
                : 'Full access now. Invite friends for Pro credits when billing launches.'
            }
          />
          <Link
            className="mx-auto mt-6 block w-fit text-sm font-medium text-syntax-muted transition hover:text-syntax-text"
            href="/pricing"
          >
            {isBillingEnabled ? 'Full pricing →' : 'Beta details →'}
          </Link>
        </Reveal>
        <PricingCards />
      </div>
    </section>
  );
}
