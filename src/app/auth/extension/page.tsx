import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ExtensionHandoff } from '@/components/auth/ExtensionHandoff';
import { getServerSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Connect extension',
  description: 'Pair the SyntaxAI Chrome extension with your account.',
};

export default async function ExtensionAuthPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect('/auth/signin?next=/auth/extension');
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-24">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
        Extension
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.06em]">
        Almost there
      </h1>
      <div className="section-neon-line" aria-hidden="true" />
      <p className="mt-6 text-syntax-muted">
        Signed in as {session.user.email}. The extension will pick up this session in a
        later release.
      </p>
      <ExtensionHandoff />
    </div>
  );
}
