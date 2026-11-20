'use client';

import { useState } from 'react';

export function ShareCodeActions({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <button
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-syntax-muted transition hover:bg-syntax-hover hover:text-syntax-text"
      onClick={handleCopy}
      type="button"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}