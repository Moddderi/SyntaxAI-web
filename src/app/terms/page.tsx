import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SyntaxAI terms of service.',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}

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
      <p className="mt-6 text-syntax-muted">Last updated: November 2026</p>

      <div className="mt-12 space-y-10 text-syntax-muted">
        <Section title="Early access">
          <p>
            SyntaxAI is in open beta. Features, limits, pricing and availability may change,
            and the service is provided &quot;as is&quot; without warranty. By using the
            extension or website you agree to these terms and to our Privacy Policy.
          </p>
        </Section>

        <Section title="Your account">
          <p>
            You sign in with Google or GitHub. You are responsible for activity on your
            account and for keeping your devices secure. You can sign out of the extension at
            any time, which removes its access token from that browser.
          </p>
        </Section>

        <Section title="Your content">
          <p>
            You keep ownership of the notes, code and screenshots you save. You give us a
            limited licence to store, sync and process them solely to operate SyntaxAI for
            you, including sending content you choose to analyze to our AI provider. Only
            capture content you are allowed to store and process. AI output can be wrong —
            review it before relying on it.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Use SyntaxAI for personal or professional development workflows. Do not use the
            service to break the law, upload content you have no right to share, abuse AI
            quotas, bypass rate limits, or attempt to reverse-engineer, scrape or disrupt our
            systems. We may rate-limit or suspend accounts that put the service at risk.
          </p>
        </Section>

        <Section title="Subscriptions">
          <p>
            Paid plans are not yet charged during the beta. When they launch, Pro will be
            billed monthly through Polar.sh, our merchant of record. You may cancel at any
            time through the Polar customer portal, and refunds follow Polar policy.
          </p>
        </Section>

        <Section title="Availability and liability">
          <p>
            We aim to keep the service available and your notes safe, but we do not guarantee
            uninterrupted access. Keep an export of important notes (Settings → Export). To the
            extent permitted by law, SyntaxAI is not liable for indirect or consequential loss
            or for data loss.
          </p>
        </Section>

        <Section title="Termination">
          <p>
            You can stop using SyntaxAI and request account deletion at any time. We may
            suspend or end access for violations of these terms.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update these terms. Continued use after an update means you accept the
            changes.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions? Email{' '}
            <a
              className="text-syntax-text underline-offset-4 hover:underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
