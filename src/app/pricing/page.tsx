import { MarketingBackdrop } from '@/components/MarketingBackdrop';
import { PricingCards } from '@/components/PricingCards';
import { PricingPageIntro } from '@/components/pricing/PricingPageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { buildPageMetadata } from '@/lib/seo';
import { isBillingEnabled } from '@/lib/site';

export const metadata = buildPageMetadata({
  title: isBillingEnabled ? 'Pricing' : 'Open beta',
  description: isBillingEnabled
    ? 'SyntaxAI Free and Pro plans — start free, upgrade to Pro at $3.49/mo for unlimited captures.'
    : 'SyntaxAI open beta is free with full access. Invite friends for Pro credits when paid plans launch.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="relative min-h-[85vh]">
      <MarketingBackdrop variant="pricing" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <PricingPageIntro />

        <PricingCards />

        {isBillingEnabled ? null : (
          <Reveal className="mt-10" variant="up">
            <p className="text-sm text-syntax-muted">
              Share your invite from Account. Friends who join with your link count toward Pro
              rewards when we turn billing on.
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
