'use client';

import { useEffect, useState } from 'react';

export function ExtensionHandoff() {
  const [status, setStatus] = useState<'working' | 'ready' | 'error'>('working');

  useEffect(() => {
    let cancelled = false;

    async function mint() {
      try {
        const response = await fetch('/api/device-token', { method: 'POST' });
        if (!response.ok) {
          throw new Error('Could not create a device token.');
        }

        const { token } = (await response.json()) as { token: string };
        if (cancelled) {
          return;
        }

        window.postMessage(
          { source: 'syntaxai-web', type: 'device-token', token },
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
        ? 'Preparing an extension token…'
        : status === 'ready'
          ? 'You can close this tab. Extension pairing ships in the next phase.'
          : 'Could not prepare an extension token. Try signing in again.'}
    </p>
  );
}
