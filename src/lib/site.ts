export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://syntaxai.app';

export const CHROME_STORE_URL =
  process.env.NEXT_PUBLIC_CHROME_STORE_URL ??
  'https://chromewebstore.google.com/detail/syntaxai';

export const BROWSER_ICON_CHROME = '/free-icon-chrome-6125000.png';
export const BROWSER_ICON_FIREFOX = '/free-icon-firefox-5968827.png';

export const FIREFOX_ADDON_URL =
  process.env.NEXT_PUBLIC_FIREFOX_ADDON_URL ??
  'https://addons.mozilla.org/en-US/firefox/addon/syntaxai/';

export const BOOK_CALL_URL =
  process.env.NEXT_PUBLIC_BOOK_CALL_URL ??
  'https://calendly.com/kiricenkooleg123/30min';

export const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export const SUPPORT_EMAIL = 'hello@syntaxai.app';

export const SOCIAL_LINKS = {
  discord: process.env.NEXT_PUBLIC_SOCIAL_DISCORD_URL ?? '',
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL ?? '',
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ?? '',
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL ?? '',
  tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL ?? '',
} as const;

export const PRO_PRICE = '$3.49';

/**
 * Paid plans / checkout UI. Keep false during open beta (FOP + Polar not live).
 * Must be NEXT_PUBLIC so client components (UpgradeButton, nav) stay in sync.
 */
export const isBillingEnabled = process.env.NEXT_PUBLIC_BILLING_ENABLED === 'true';

export const FREE_LIMITS = {
  notes: 30,
  contextSaves: 10,
  photoReads: 10,
} as const;

export const FEATURE_HIGHLIGHTS = [
  {
    title: 'Sees languages, libraries, frameworks',
    description:
      'Paste a snippet or drop a screenshot — SyntaxAI detects the stack and tags the note so you can find it later by what it actually is.',
    visual: 'stack',
  },
  {
    title: 'Capture from any page',
    description:
      'Hotkey or context menu — grab code, docs, and the page you were reading. No copy-paste graveyard.',
    points: ['⌘⇧S capture', 'Side panel without leaving the tab'],
    visual: 'capture',
  },
] as const;

export const FEATURE_GRID = [
  {
    title: 'Searchable library',
    description:
      'Filter by stack, star favorites, and find the snippet from last Tuesday in seconds.',
    points: ['Local-first storage', 'Stack filters'],
  },
  {
    title: 'Screenshot & photo reads',
    description:
      'Drop a screenshot of a docs page or a tweet with code. SyntaxAI reads it and files it.',
    points: ['GPT-4o vision', 'Works on any image'],
  },
  {
    title: 'Side panel workflow',
    description:
      'Capture, search, and save without breaking flow. Full dashboard when you need the whole library.',
    points: ['Stay in the tab', 'Dashboard for deep work'],
  },
  {
    title: 'Local-first notes',
    description:
      'Your library lives in the browser. Search, star, and reuse without shipping snippets to a random cloud folder.',
    points: ['Chrome storage', 'You stay in control'],
  },
] as const;
