import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SyntaxAI privacy policy — what we collect, why, and who processes it.',
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

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-syntax-text">{children}</strong>;
}

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
      <p className="mt-6 text-syntax-muted">Last updated: November 2026</p>

      <div className="mt-12 max-w-none space-y-10 text-syntax-muted">
        <Section title="Overview">
          <p>
            SyntaxAI is a browser extension (Chrome and Firefox) and website that helps
            developers capture code, documentation and screenshots into a searchable notebook.
            Notes are saved on your device first and, once you sign in, synced to your SyntaxAI
            account so they survive a reinstall and appear in every browser you sign in to.
          </p>
          <p>
            This policy explains what we collect, why, which providers process it, and how to
            delete it.
          </p>
        </Section>

        <Section title="Data we collect">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <Strong>Account data</Strong> — name, email address and profile image from Google
              or GitHub when you sign in, plus your plan status and a device token that lets
              the extension talk to your account. Device tokens are stored hashed.
            </li>
            <li>
              <Strong>Your notes</Strong> — title, body, code, tags, detected tech stack, and
              the URL of the page you captured from. Stored locally in your browser and, when
              signed in, on our servers.
            </li>
            <li>
              <Strong>Content you send to AI</Strong> — when you analyze pasted code, a
              screenshot, or a page selection, that content (including the page URL, title and
              meta description for page captures) is sent to our server and forwarded to
              OpenAI to generate a title, tags and a summary. We do not store AI request
              contents beyond processing them; the resulting note is stored only if you save
              it.
            </li>
            <li>
              <Strong>Feedback and bug reports</Strong> — what you type in the form, plus the
              email and name on your account, delivered to our support inbox by email.
            </li>
            <li>
              <Strong>Technical data</Strong> — standard server logs (IP address, user agent,
              timestamps) kept by our hosting providers for security and reliability.
            </li>
          </ul>
        </Section>

        <Section title="How we use it">
          <p>
            Only to run the product: sign you in, sync your notes, generate AI notes you ask
            for, answer support requests and keep the service secure and within fair-use
            limits. We do not sell your data, show ads, or build advertising profiles. We do
            not use your content to train models.
          </p>
          <p>
            The use of information received from browser extension APIs adheres to the
            Chrome Web Store User Data Policy, including the Limited Use requirements, and to
            Mozilla&apos;s add-on policies.
          </p>
        </Section>

        <Section title="Extension permissions">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <Strong>storage</Strong> — save notes, settings and your sign-in token on your
              device.
            </li>
            <li>
              <Strong>activeTab and scripting</Strong> — when you press the capture shortcut or
              use &quot;Add to SyntaxAI&quot;, read the text you selected on the current tab.
              Nothing is read from a page until you trigger a capture.
            </li>
            <li>
              <Strong>contextMenus and commands</Strong> — the right-click &quot;Add to
              SyntaxAI&quot; item and the capture shortcut.
            </li>
            <li>
              <Strong>sidePanel / sidebar</Strong> — show the capture panel next to the page.
            </li>
            <li>
              <Strong>alarms</Strong> — run background note sync on a timer.
            </li>
            <li>
              <Strong>Access to syntaxai.app and api.syntaxai.app</Strong> — sign in and talk
              to our API. The extension does not request access to other websites.
            </li>
          </ul>
          <p>
            The extension and dashboard load technology icons from the jsDelivr CDN, which
            can see your IP address when icons are fetched.
          </p>
        </Section>

        <Section title="What we do not do">
          <ul className="list-disc space-y-3 pl-5">
            <li>We do not sell or rent your personal data.</li>
            <li>We do not read your browsing history or monitor the pages you visit.</li>
            <li>We do not read page content unless you trigger a capture.</li>
            <li>We do not run third-party analytics or advertising trackers in the extension.</li>
          </ul>
        </Section>

        <Section title="Service providers">
          <p>These providers process data on our behalf, under their own privacy terms:</p>
          <ul className="list-disc space-y-3 pl-5">
            <li>OpenAI — AI analysis of content you submit.</li>
            <li>Vercel and Railway — website and API hosting.</li>
            <li>Neon — database that stores accounts and synced notes.</li>
            <li>Cloudflare — DNS and network delivery.</li>
            <li>Resend — email delivery of feedback and bug reports.</li>
            <li>Google and GitHub — sign-in (OAuth).</li>
            <li>Polar.sh — payments, only when paid plans are enabled.</li>
          </ul>
        </Section>

        <Section title="Retention and deletion">
          <p>
            Notes you delete move to the trash and are marked deleted on your account. To
            remove your account and all synced data, email{' '}
            <a
              className="text-syntax-text underline-offset-4 hover:underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            from your account address and we will delete it. Uninstalling the extension
            removes local data from that browser.
          </p>
        </Section>

        <Section title="Children">
          <p>SyntaxAI is not directed to children under 16 and we do not knowingly collect their data.</p>
        </Section>

        <Section title="Changes">
          <p>
            We will update the date above when this policy changes and, for material changes,
            tell signed-in users in the product or by email.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy? Email{' '}
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
