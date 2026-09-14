import type { Metadata } from 'next';
import { PricingCards } from '@/components/PricingCards';
import { PRO_PRICE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'SyntaxAI Free and Pro plans — start free, upgrade to Pro at $3.49/mo for unlimited captures.',
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-syntax-accent">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Free to start. Pro at {PRO_PRICE}.
        </h1>
        <p className="mt-4 text-lg text-syntax-muted">
          Use SyntaxAI for free with generous limits. Upgrade to Pro for unlimited notes,
          context captures, and photo reads.
        </p>
      </div>

      <PricingCards showFreeCta={false} />

      <p className="mt-10 text-sm text-syntax-muted">
        Beta testers who send thoughtful feedback may receive 1 month of Pro free at launch.
      </p>
    </div>
  );
}
