import type { Metadata } from 'next';
import { MarketingBackdrop } from '@/components/MarketingBackdrop';
import { PricingCards } from '@/components/PricingCards';
import { PricingPageIntro } from '@/components/pricing/PricingPageIntro';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'SyntaxAI Free and Pro plans — start free, upgrade to Pro at $3.49/mo for unlimited captures.',
};

export default function PricingPage() {
  return (
    <div className="relative min-h-[85vh]">
      <MarketingBackdrop variant="pricing" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <PricingPageIntro />

        <PricingCards showFreeCta={false} />

        <Reveal className="mt-10" variant="up">
          <p className="text-sm text-syntax-muted">
            Beta testers who send thoughtful feedback may receive 1 month of Pro free at launch.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
