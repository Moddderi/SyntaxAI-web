import type { Metadata } from 'next';
import { AuthCompleteScreen } from '@/components/auth/AuthCompleteScreen';
import { safeNextPath } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Signing in',
  robots: { index: false },
};

export default async function AuthCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <AuthCompleteScreen nextPath={safeNextPath(next, '/account')} />;
}
