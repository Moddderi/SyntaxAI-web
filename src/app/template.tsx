'use client';

import { usePathname } from 'next/navigation';
import { m } from 'motion/react';
import type { ReactNode } from 'react';

/** Motion transforms break `position: fixed` on auth overlays — skip those routes. */
function shouldAnimatePage(pathname: string) {
  if (pathname.startsWith('/auth')) {
    return false;
  }
  if (pathname.startsWith('/account')) {
    return false;
  }
  return true;
}

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (!shouldAnimatePage(pathname)) {
    return <>{children}</>;
  }

  return (
    <m.div
      key={pathname}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
