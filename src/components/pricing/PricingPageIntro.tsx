'use client';

import { Reveal, RevealNeonLine } from '@/components/motion/Reveal';
import { PRO_PRICE } from '@/lib/site';

export function PricingPageIntro() {
  return (
    <Reveal className="mb-12 max-w-2xl" variant="blur-up">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
        Pricing
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
        Free to start. Pro at {PRO_PRICE}.
      </h1>
      <RevealNeonLine align="left" />
      <p className="mt-6 text-lg leading-relaxed text-syntax-muted">
        Use SyntaxAI for free with generous limits. Upgrade to Pro for unlimited notes, context
        captures, and photo reads.
      </p>
    </Reveal>
  );
}
