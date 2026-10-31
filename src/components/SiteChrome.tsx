'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { MotionRoot } from '@/components/motion/MotionRoot';

function isAuthFullscreenPath(pathname: string) {
  return pathname === '/auth/signin' || pathname === '/auth/complete';
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const authFullscreen = isAuthFullscreenPath(pathname);

  if (authFullscreen) {
    return (
      <MotionRoot>
        <div className="min-h-dvh bg-syntax-bg">{children}</div>
      </MotionRoot>
    );
  }

  return (
    <>
      <SiteHeader />
      <MotionRoot>
        <main className="flex-1">{children}</main>
      </MotionRoot>
      <SiteFooter />
    </>
  );
}
