'use client';

import { Reveal } from '@/components/motion/Reveal';
import { isBillingEnabled, PRO_PRICE } from '@/lib/site';

export function PricingPageIntro() {
  if (!isBillingEnabled) {
    return (
      <Reveal className="mx-auto mb-12 max-w-2xl text-center" variant="blur-up">
        <h1 className="font-mono text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
          Free for now. Pro later.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-syntax-muted md:text-lg">
          Subscriptions are paused during beta — full access for everyone. Sign in, share your
          invite link, and lock in Pro credits for when billing launches ({PRO_PRICE}/mo planned).
        </p>
      </Reveal>
    );
  }

  return (
    <Reveal className="mx-auto mb-10 max-w-xl text-center" variant="blur-up">
      <h1 className="sr-only">Pricing</h1>
      <p className="text-base leading-relaxed text-syntax-muted md:text-lg">
        All core capture is <span className="font-medium text-syntax-brand-soft">free</span>.
        Subscribe to <span className="font-medium text-syntax-brand-soft">Pro</span> when the
        library grows. Try Pro features{' '}
        <span className="font-medium text-syntax-brand-soft">free for 7 days</span>.
      </p>
    </Reveal>
  );
}
