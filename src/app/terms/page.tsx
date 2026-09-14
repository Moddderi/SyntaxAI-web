import type { Metadata } from 'next';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SyntaxAI terms of service.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-syntax-muted">Last updated: March 2026</p>

      <div className="mt-12 space-y-8 text-syntax-muted">
        <section>
          <h2 className="text-xl font-semibold text-syntax-text">Early access</h2>
          <p className="mt-3 leading-relaxed">
            SyntaxAI is currently in early access. Features, pricing, and availability may
            change. By using the extension or website, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-syntax-text">Acceptable use</h2>
          <p className="mt-3 leading-relaxed">
            You may use SyntaxAI for personal or professional development workflows. Do not
            use the service to violate laws, abuse AI quotas, or attempt to reverse-engineer
            or disrupt our systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-syntax-text">Subscriptions</h2>
          <p className="mt-3 leading-relaxed">
            Pro subscriptions are billed monthly via Stripe when available. You may cancel at
            any time through the customer portal. Refunds are handled per Stripe policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-syntax-text">Contact</h2>
          <p className="mt-3 leading-relaxed">
            Questions? Email{' '}
            <a className="text-syntax-accent hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
