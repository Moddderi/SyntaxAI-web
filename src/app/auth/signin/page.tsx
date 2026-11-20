import type { Metadata } from 'next';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignInShell } from '@/components/auth/SignInShell';
import { safeNextPath } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to SyntaxAI with Google or GitHub to sync your library and invite friends.',
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; ref?: string }>;
}) {
  const { next } = await searchParams;
  const githubEnabled = Boolean(process.env.GITHUB_CLIENT_ID);
  // Invite ?ref= is stored as httpOnly cookie in middleware (cannot set cookies in RSC)

  return (
    <SignInShell>
      <SignInForm
        githubEnabled={githubEnabled}
        nextPath={safeNextPath(next, '/account')}
      />
    </SignInShell>
  );
}
