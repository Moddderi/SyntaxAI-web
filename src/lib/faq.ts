import { isBillingEnabled } from '@/lib/site';

const CORE_FAQ = [
  {
    question: 'How does SyntaxAI capture snippets from a page?',
    answer:
      'Use the keyboard shortcut or the context menu to save code, selection, or page context into your library. SyntaxAI adds a smart title and tags so you can find it later.',
  },
  {
    question: 'Which browsers are supported?',
    answer:
      'SyntaxAI is built for Chromium browsers today (Chrome, Brave, Edge, Arc). Firefox support is on the roadmap — you can join the waitlist from the homepage.',
  },
  {
    question: 'Where is my library stored?',
    answer:
      'Notes are stored locally in your browser first, then sync to your account when you are signed in — so the UI stays fast and your library follows you.',
  },
  {
    question: 'How do smart titles and stack detection work?',
    answer:
      'When you capture a snippet or image, SyntaxAI analyzes the content and suggests a title, tags, and detected languages or frameworks so search stays useful.',
  },
  {
    question: 'Will SyntaxAI slow down my browser?',
    answer:
      'The extension is designed to stay light: capture and panel UI load on demand, and heavy AI work runs only when you save or analyze a note.',
  },
  {
    question: 'Is my browsing data private?',
    answer:
      'We only process what you explicitly capture. We do not read your tabs in the background. See our Privacy Policy for details.',
  },
  {
    question: 'Can I use SyntaxAI on multiple devices?',
    answer:
      'Sign in on each browser so notes can sync through your SyntaxAI account. Local storage keeps the panel snappy; the cloud copy is the backup.',
  },
] as const;

const BILLING_FAQ = [
  {
    question: 'Is SyntaxAI free to use?',
    answer:
      'Yes. The free plan includes generous limits for notes, context captures, and photo reads. Upgrade to Pro when you need unlimited usage.',
  },
  {
    question: 'How do I upgrade or cancel Pro?',
    answer:
      'Sign in, open Account, and use Upgrade to Pro. Billing is handled by Polar — you can cancel anytime from the customer portal.',
  },
] as const;

const BETA_FAQ = [
  {
    question: 'Is SyntaxAI free during beta?',
    answer:
      'Yes. Open beta is free with full access — no Free/Pro limits for now. Paid plans will launch later; invite friends to earn Pro credits for that launch.',
  },
  {
    question: 'How do invites work?',
    answer:
      'Sign in, open Account, and copy your invite link. Friends who sign up with your link count toward milestones (1 / 3 / 7). Rewards are Pro time credited when billing goes live.',
  },
] as const;

export const FAQ_ITEMS = [
  ...CORE_FAQ.slice(0, 2),
  ...(isBillingEnabled ? BILLING_FAQ : BETA_FAQ),
  ...CORE_FAQ.slice(2),
] as const;
