import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { MotionRoot } from '@/components/motion/MotionRoot';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SyntaxAI — AI developer notebook for Chrome',
    template: '%s · SyntaxAI',
  },
  description:
    'Turn every tab into a code library. Capture snippets, docs, and screenshots — AI titles, tags, and a searchable library in Chrome.',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'SyntaxAI — AI developer notebook for Chrome',
    description:
      'Capture code, docs, and screenshots from any page. AI-powered developer notebook extension.',
    url: SITE_URL,
    siteName: 'SyntaxAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyntaxAI — AI developer notebook for Chrome',
    description:
      'Capture code, docs, and screenshots from any page. AI-powered developer notebook extension.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable} h-full`} lang="en">
      <body className="flex min-h-full flex-col bg-syntax-bg text-syntax-text antialiased">
        <SiteHeader />
        <MotionRoot>
          <main className="flex-1">{children}</main>
        </MotionRoot>
        <SiteFooter />
      </body>
    </html>
  );
}
