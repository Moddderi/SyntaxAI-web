import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionHead } from '@/components/SectionHead';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { isBillingEnabled } from '@/lib/site';
import { REFERRAL_MILESTONES } from '@/lib/referralTiers';

/** Beta-only growth block: invite friends → launch rewards. */
export function InviteTeaser() {
  if (isBillingEnabled) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28" id="invite">
      <div className="invite-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="mb-12" variant="blur-up">
          <SectionHead
            description="SyntaxAI is free while we're in beta. Bring your friends along and unlock Pro time for launch day."
            label="Beta rewards"
            title="Invite friends, earn Pro"
          />
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.12}>
          {REFERRAL_MILESTONES.map((tier, index) => (
            <StaggerItem className="h-full" key={tier.friends}>
              <SpotlightCard className="lift-card h-full rounded-2xl border border-syntax-border bg-syntax-card p-6 text-center">
                <div className="relative">
                  <div className="invite-orb mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                    <span className="font-mono text-3xl font-bold text-syntax-text">
                      {tier.friends}
                    </span>
                  </div>
                  <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
                    {tier.friends === 1 ? 'Invite 1 friend' : `Invite ${tier.friends} friends`}
                  </p>
                  <p className="brand-text mt-2 font-mono text-lg font-bold uppercase tracking-[0.06em]">
                    {tier.reward}
                  </p>
                  <p className="mt-3 text-xs text-syntax-muted">
                    {index === 0 ? 'A friend signs up with your link.' : 'Rewards stack as you go.'}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Link
            className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-8 text-xs"
            href="/account"
          >
            Get your invite link
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
