import type { Metadata } from 'next';
import { MarketingBackdrop } from '@/components/MarketingBackdrop';
import { PricingCards } from '@/components/PricingCards';
import { PricingPageIntro } from '@/components/pricing/PricingPageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { isBillingEnabled } from '@/lib/site';

export const metadata: Metadata = {
  title: isBillingEnabled ? 'Pricing' : 'Beta',
  description: isBillingEnabled
    ? 'SyntaxAI Free and Pro plans — start free, upgrade to Pro at $3.49/mo for unlimited captures.'
    : 'SyntaxAI open beta — free full access. Invite friends for Pro credits at launch.',
};

export default function PricingPage() {
  return (
    <div className="relative min-h-[85vh]">
      <MarketingBackdrop variant="pricing" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <PricingPageIntro />

        <PricingCards showFreeCta={!isBillingEnabled} />

        <Reveal className="mt-10" variant="up">
          <p className="text-sm text-syntax-muted">
            {isBillingEnabled
              ? 'Beta testers who send thoughtful feedback may receive 1 month of Pro free at launch.'
              : 'Share your invite from Account. Friends who join with your link count toward Pro rewards when we turn billing on.'}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
