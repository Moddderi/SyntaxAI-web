'use client';

import { useEffect, useState } from 'react';

const HANDOFF_VERSION = 1;
const AUTH_ATTR = 'data-syntaxai-auth';
const RETRY_MS = 400;
const RETRY_FOR_MS = 20_000;

type Status = 'working' | 'ready' | 'waiting-extension' | 'error';

type AuthPayload = {
  source: 'syntaxai-web';
  type: 'syntaxai:auth';
  version: number;
  token: string;
  expiresAt: string;
  userId: string;
};

function broadcastAuth(payload: AuthPayload) {
  document.documentElement.setAttribute(AUTH_ATTR, JSON.stringify(payload));
  window.postMessage(payload, window.location.origin);
}

export function ExtensionHandoff() {
  const [status, setStatus] = useState<Status>('working');

  useEffect(() => {
    let cancelled = false;
    let retryTimer: number | undefined;
    let stopTimer: number | undefined;

    function onAck(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }

      const data = event.data;
      if (
        typeof data === 'object' &&
        data !== null &&
        (data as { source?: string; type?: string }).source === 'syntaxai-extension' &&
        (data as { type?: string }).type === 'syntaxai:auth-ack'
      ) {
        if (!cancelled) {
          setStatus('ready');
        }
        window.clearInterval(retryTimer);
        window.clearTimeout(stopTimer);
        document.documentElement.removeAttribute(AUTH_ATTR);
      }
    }

    window.addEventListener('message', onAck);

    async function mint() {
      try {
        const response = await fetch('/api/device-token', {
          method: 'POST',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Could not create a device token.');
        }

        const body = (await response.json()) as {
          token: string;
          expiresAt: string;
          userId: string;
        };

        if (cancelled) {
          return;
        }

        const payload: AuthPayload = {
          source: 'syntaxai-web',
          type: 'syntaxai:auth',
          version: HANDOFF_VERSION,
          token: body.token,
          expiresAt: body.expiresAt,
          userId: body.userId,
        };

        broadcastAuth(payload);
        setStatus('waiting-extension');

        retryTimer = window.setInterval(() => {
          broadcastAuth(payload);
        }, RETRY_MS);

        stopTimer = window.setTimeout(() => {
          window.clearInterval(retryTimer);
          if (!cancelled) {
            setStatus((current) => (current === 'ready' ? current : 'waiting-extension'));
          }
        }, RETRY_FOR_MS);
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    void mint();

    return () => {
      cancelled = true;
      window.removeEventListener('message', onAck);
      window.clearInterval(retryTimer);
      window.clearTimeout(stopTimer);
    };
  }, []);

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
