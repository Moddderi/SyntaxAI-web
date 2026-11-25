import { FREE_LIMITS, PRO_PRICE } from '@/lib/site';

export const FAQ_ITEMS = [
  {
    question: 'How does SyntaxAI capture snippets from a page?',
    answer:
      'Use the keyboard shortcut or the context menu to save code, selection, or page context into your library. SyntaxAI adds a smart title and tags so you can find it later.',
  },
  {
    question: 'Which browsers are supported?',
    answer:
      'SyntaxAI is available for Chrome and Firefox from the homepage install buttons. Chromium-based browsers (Brave, Edge, Arc) can use the Chrome Web Store build.',
  },
  {
    question: 'Is SyntaxAI free to use?',
    answer: `Yes. Free includes ${FREE_LIMITS.notes} notes, ${FREE_LIMITS.contextSaves} page context captures, and ${FREE_LIMITS.photoReads} photo reads — forever, no credit card. Pro is ${PRO_PRICE}/mo for unlimited usage.`,
  },
  {
    question: 'How do I start Pro or cancel?',
    answer:
      'Sign in, open Pricing or Account, and start a 7-day free trial. Billing is handled by Creem. Cancel anytime from the customer portal — cancel during the trial and you are not charged.',
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
    question: 'Can I share a note with someone who does not have SyntaxAI?',
    answer:
      'Yes. Share on a note copies a public link (syntaxai.app/s/…) that lasts 7 days. Anyone with the link can read the title, tags and code — they do not need an account. You can revoke the link earlier from the note.',
  },
  {
    question: 'Can I use SyntaxAI on multiple devices?',
    answer:
      'Sign in on each browser so notes can sync through your SyntaxAI account. Local storage keeps the panel snappy; the cloud copy is the backup.',
  },
] as const;
