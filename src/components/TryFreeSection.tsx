import Link from 'next/link';
import { BrowserInstallButtons } from '@/components/BrowserInstallButtons';
import { Reveal } from '@/components/motion/Reveal';
import { SectionAmbient } from '@/components/SectionAmbient';
import { FREE_LIMITS, PRO_PRICE } from '@/lib/site';

export function TryFreeSection() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
      id="get-started"
    >
      <SectionAmbient tone="pricing" />
      <div className="get-started-glow pointer-events-none" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blur-up">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
            Get started
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold uppercase tracking-[0.08em] text-syntax-text md:text-4xl">
            Try the{' '}
            <span className="accent-glow text-syntax-accent">free</span> version
          </h2>
          <p className="mt-5 text-base leading-relaxed text-syntax-muted">
            Install SyntaxAI in your browser and start building a personal code library —{' '}
            {FREE_LIMITS.notes} notes, {FREE_LIMITS.contextSaves} context captures, and{' '}
            {FREE_LIMITS.photoReads} photo reads included. Pro is {PRO_PRICE}/mo when you
            outgrow the limits.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.08} variant="scale">
          <div className="get-started-card lift-card relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-syntax-border bg-syntax-card/90 p-8 backdrop-blur-sm md:p-10">
            <span className="get-started-card__sheen pointer-events-none" aria-hidden />
            <p className="relative text-center text-sm font-medium text-syntax-text">
              Pick your browser
            </p>
            <BrowserInstallButtons className="relative mt-6 justify-center" />
            <p className="relative mt-6 text-center text-xs text-syntax-muted">
              No account required to capture locally.{' '}
              <Link className="text-syntax-text underline-offset-4 hover:underline" href="/auth/signin">
                Sign in
              </Link>{' '}
              for billing and referrals.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-6 text-center" delay={0.12}>
          <Link
            className="group inline-flex items-center gap-1 text-sm font-medium text-syntax-muted transition hover:text-syntax-text"
            href="/pricing"
          >
            Compare Free vs Pro
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
