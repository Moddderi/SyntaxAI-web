import type { Metadata } from 'next';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SyntaxAI privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
        Legal
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.06em]">
        Privacy Policy
      </h1>
      <div className="section-neon-line" aria-hidden="true" />
      <p className="mt-6 text-syntax-muted">Last updated: October 2026</p>

      <div className="mt-12 max-w-none space-y-10 text-syntax-muted">
        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Overview
          </h2>
          <p className="mt-4 leading-relaxed">
            SyntaxAI is a Chrome extension that helps developers capture and organize code
            snippets and page context. Your notes library is stored locally in your browser
            using Chrome storage APIs unless you explicitly export or sync data (future
            feature).
          </p>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Data we collect
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
            <li>
              <strong className="font-medium text-syntax-text">Notes you create</strong> —
              stored locally on your device by default.
            </li>
            <li>
              <strong className="font-medium text-syntax-text">AI analysis requests</strong> —
              when you analyze code or images, content is sent to OpenAI to generate titles,
              tags, and summaries. We do not use your content to train models (per OpenAI API
              terms).
            </li>
            <li>
              <strong className="font-medium text-syntax-text">Account data</strong> — if you
              sign in with Google, we store your name, email, and subscription status so we can
              unlock Pro. Notes stay in Chrome unless you later turn on sync.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            What we do not do
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
            <li>We do not sell your personal data.</li>
            <li>We do not read your browsing history beyond pages you explicitly capture.</li>
            <li>We do not access pages without your action (hotkey, context menu, or paste).</li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Third-party services
          </h2>
          <p className="mt-4 leading-relaxed">
            SyntaxAI uses OpenAI for AI analysis and Polar.sh as merchant of record for Pro
            payments. These services have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-syntax-text">
            Contact
          </h2>
          <p className="mt-4 leading-relaxed">
            Questions about this policy? Email{' '}
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
