import type { Metadata } from 'next';
import {
  CHROME_STORE_URL,
  FIREFOX_ADDON_URL,
  PRO_PRICE,
  SITE_URL,
  SOCIAL_LINKS,
  SUPPORT_EMAIL,
  isBillingEnabled,
} from '@/lib/site';

export const SITE_NAME = 'SyntaxAI';

export const SEO_TITLE = 'SyntaxAI — AI developer notebook for Chrome & Firefox';

export const SEO_DESCRIPTION =
  'Capture code, docs, and screenshots from any tab. SyntaxAI titles, tags, and stacks them into a searchable library. Open beta — free for Chrome and Firefox.';

/** Static 1200×630 card Discord/Slack/iMessage can fetch without hitting the dynamic OG route. */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: SEO_TITLE,
  type: 'image/png',
} as const;

export const SEO_KEYWORDS = [
  'SyntaxAI',
  'AI developer notebook',
  'Chrome extension for code snippets',
  'Firefox addon code notes',
  'capture code from documentation',
  'screenshot to snippet',
  'stack detection',
  'developer knowledge base',
];

/** Last meaningful marketing copy change — keep stable across deploys. */
export const SITEMAP_LASTMOD = '2026-11-20';

export const INDEXABLE_PATHS = ['/', '/pricing', '/privacy', '/terms'] as const;

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

const PRIVATE_ROBOTS = { index: false, follow: false } as const;

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = path === '/' ? title : `${title} · ${SITE_NAME}`;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : PRIVATE_ROBOTS,
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const privatePageRobots: Metadata['robots'] = PRIVATE_ROBOTS;

function socialSameAs(): string[] {
  return [
    CHROME_STORE_URL,
    FIREFOX_ADDON_URL,
    ...Object.values(SOCIAL_LINKS).filter(Boolean),
  ];
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo-mark.png'),
    email: SUPPORT_EMAIL,
    sameAs: socialSameAs(),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function softwareApplicationJsonLd() {
  const offer = isBillingEnabled
    ? {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '0',
        highPrice: PRO_PRICE.replace('$', ''),
      }
    : {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'BrowserExtension',
    operatingSystem: 'Chrome, Firefox, Chromium',
    browserRequirements: 'Requires Google Chrome, Firefox, or a Chromium-based browser',
    url: SITE_URL,
    downloadUrl: CHROME_STORE_URL,
    installUrl: CHROME_STORE_URL,
    isAccessibleForFree: true,
    description: SEO_DESCRIPTION,
    offers: offer,
    featureList: [
      'Capture code, docs, and screenshots from any page',
      'AI titles, tags, and stack detection',
      'Searchable local-first snippet library with account sync',
      'Share a note as a 7-day public link — no account required to view',
      'Chrome and Firefox extension',
    ],
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
