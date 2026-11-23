'use client';

import { useExtensionHandoff } from './useExtensionHandoff';

export function ExtensionHandoff() {
  const status = useExtensionHandoff();

  const message =
    status === 'working'
      ? 'Connecting your extension…'
      : status === 'ready'
        ? 'Connected. You can close this tab and return to SyntaxAI.'
        : status === 'waiting-extension'
          ? 'Token ready. Open or focus the SyntaxAI side panel — if it still says Sign in, click the extension icon once.'
          : 'Could not prepare an extension token. Try signing in again.';

  return <p className="mt-4 text-syntax-muted">{message}</p>;
}
