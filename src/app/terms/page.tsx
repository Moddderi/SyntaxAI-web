import type { Metadata } from 'next';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SyntaxAI terms of service.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
        Legal
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.06em]">
        Terms of Service
      </h1>
      <div className="section-neon-line" aria-hidden="true" />
      <p className="mt-6 text-syntax-muted">Last updated: October 2026</p>

      <div className="mt-12 space-y-10 text-syntax-muted">
        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Early access
          </h2>
          <p className="mt-4 leading-relaxed">
            SyntaxAI is currently in early access. Features, pricing, and availability may
            change. By using the extension or website, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Acceptable use
          </h2>
          <p className="mt-4 leading-relaxed">
            You may use SyntaxAI for personal or professional development workflows. Do not
            use the service to violate laws, abuse AI quotas, or attempt to reverse-engineer
            or disrupt our systems.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Subscriptions
          </h2>
          <p className="mt-4 leading-relaxed">
            Pro subscriptions are billed monthly via Polar.sh, our merchant of record. You
            may cancel at any time through the Polar customer portal. Refunds follow Polar
            policy.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Contact
          </h2>
          <p className="mt-4 leading-relaxed">
            Questions? Email{' '}
            <a className="text-syntax-text underline-offset-4 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
