'use client';

import { useState } from 'react';

function ClipboardIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect height="4" rx="1" width="8" x="8" y="2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function ShareArrowIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="m16 6-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}

const ICON_BUTTON_CLASS =
  'flex h-8 w-8 items-center justify-center rounded-lg text-syntax-text transition hover:bg-syntax-hover';

export function ShareCodeActions({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  };

  const handleShare = async (): Promise<void> => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: title || 'SyntaxAI note',
          url,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
      }
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        aria-label={copied ? 'Copied' : 'Copy code'}
        className={ICON_BUTTON_CLASS}
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <span className="text-[11px] font-semibold">✓</span>
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
      </button>
      <button
        aria-label="Share note"
        className={ICON_BUTTON_CLASS}
        onClick={() => void handleShare()}
        type="button"
      >
        <ShareArrowIcon className="h-4 w-4" />
      </button>
    </div>
  );
}