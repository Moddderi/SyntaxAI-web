'use client';

import { useEffect, useState } from 'react';

const HANDOFF_VERSION = 1;

export function ExtensionHandoff() {
  const [status, setStatus] = useState<'working' | 'ready' | 'error'>('working');

  useEffect(() => {
    let cancelled = false;

    async function mint() {
      try {
        const response = await fetch('/api/device-token', { method: 'POST', credentials: 'include' });
        if (!response.ok) {
          throw new Error('Could not create a device token.');
        }

        const payload = (await response.json()) as {
          token: string;
          expiresAt: string;
          userId: string;
        };

        if (cancelled) {
          return;
        }

        window.postMessage(
          {
            source: 'syntaxai-web',
            type: 'syntaxai:auth',
            version: HANDOFF_VERSION,
            token: payload.token,
            expiresAt: payload.expiresAt,
            userId: payload.userId,
          },
          window.location.origin,
        );

        setStatus('ready');
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    void mint();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <p className="mt-4 text-syntax-muted">
      {status === 'working'
        ? 'Connecting your extension…'
        : status === 'ready'
          ? 'Signed in. Return to the SyntaxAI extension — it should connect automatically.'
          : 'Could not prepare an extension token. Try signing in again.'}
    </p>
  );
}
