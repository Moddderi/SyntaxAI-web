import type { Metadata } from 'next';
import Link from 'next/link';
import { BrowserInstallButtons } from '@/components/BrowserInstallButtons';
import { privatePageRobots } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist on SyntaxAI.',
  robots: privatePageRobots,
};

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-syntax-muted">
        404
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.06em]">
        Page not found
      </h1>
      <p className="mt-4 text-syntax-muted">
        That URL is gone or never existed. The notebook is still here.
      </p>
      <div className="mt-8 flex w-full flex-col items-center gap-3">
        <Link className="btn-secondary inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium" href="/">
          Back to home
        </Link>
        <BrowserInstallButtons layout="row" />
      </div>
    </div>
  );
}
