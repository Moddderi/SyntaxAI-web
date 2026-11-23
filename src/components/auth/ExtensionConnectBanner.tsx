'use client';

import { useExtensionHandoff } from './useExtensionHandoff';

export function ExtensionConnectBanner() {
  const status = useExtensionHandoff();

  const message =
    status === 'working'
      ? 'Signing this browser into the SyntaxAI side panel…'
      : status === 'ready'
        ? 'Side panel connected. Open SyntaxAI — your library should match the other browser.'
        : status === 'waiting-extension'
          ? 'Account is ready. Click the SyntaxAI icon if the side panel still shows a different library.'
          : 'Could not reach the extension. Click Connect this browser, then open the side panel.';

  return (
    <aside className="mb-8 rounded-2xl border border-syntax-border bg-syntax-card px-5 py-4">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-syntax-muted">
        Browser extension
      </p>
      <p className="mt-2 text-sm text-syntax-text">{message}</p>
      {status !== 'ready' ? (
        <a
          className="mt-3 inline-flex h-10 items-center rounded-full border border-syntax-border px-4 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-syntax-text transition hover:border-white/20 hover:bg-syntax-hover"
          href="/auth/extension"
        >
          Connect this browser
        </a>
      ) : null}
    </aside>
  );
}
