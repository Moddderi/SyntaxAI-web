import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignInShell } from '@/components/auth/SignInShell';
import { safeNextPath } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to SyntaxAI with Google or GitHub to manage your Pro plan.',
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; ref?: string }>;
}) {
  const { next, ref } = await searchParams;
  const githubEnabled = Boolean(process.env.GITHUB_CLIENT_ID);

  if (ref && /^[a-f0-9]{8}$/i.test(ref)) {
    const cookieStore = await cookies();
    cookieStore.set('syntax_ref', ref.toLowerCase(), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  return (
    <SignInShell>
      <SignInForm
        githubEnabled={githubEnabled}
        nextPath={safeNextPath(next, '/account')}
      />
    </SignInShell>
  );
}
