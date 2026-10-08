import type { Metadata } from 'next';
import { JetBrains_Mono, Work_Sans } from 'next/font/google';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { MotionRoot } from '@/components/motion/MotionRoot';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['700'],
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
    icon: [{ url: '/logo-mark.png', type: 'image/png' }],
    apple: [{ url: '/logo-mark.png', type: 'image/png' }],
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
    <html
      className={`${workSans.variable} ${jetbrainsMono.variable} h-full`}
      data-theme="dark"
      lang="en"
    >
      <body className="flex min-h-full flex-col bg-syntax-bg font-sans text-syntax-text antialiased">
        <SiteHeader />
        <MotionRoot>
          <main className="flex-1">{children}</main>
        </MotionRoot>
        <SiteFooter />
      </body>
    </html>
  );
}
