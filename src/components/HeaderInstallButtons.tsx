'use client';

import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { BROWSER_ICON_CHROME, CHROME_STORE_URL } from '@/lib/site';

/** Compact header actions: Get started (signed out) + Get extension. */
export function HeaderInstallButtons() {
  const { data: session, isPending } = authClient.useSession();
  const signedIn = Boolean(session?.user);

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {isPending || signedIn ? null : (
        <a
          className="btn-brand inline-flex h-9 items-center rounded-full px-4 text-sm"
          href="/pricing"
        >
          Get started
        </a>
      )}
      <a
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-medium text-syntax-text transition hover:border-white/30 hover:bg-white/5"
        href={CHROME_STORE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt=""
          aria-hidden
          className="h-4 w-4 object-contain"
          height={16}
          src={BROWSER_ICON_CHROME}
          width={16}
        />
        Get extension
      </a>
    </div>
  );
}
