'use client';

import { useState } from 'react';

export function InviteLinkCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore */
    }
  }

  async function share() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'SyntaxAI',
          text: 'Capture code from any tab into a smart library.',
          url: link,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
      }
    }
    await copy();
  }

  return (
    <div className="invite-link-card rounded-2xl border border-white/12 bg-syntax-bg p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-muted">
        Your invite link
      </p>
      <p className="mt-3 break-all font-mono text-xs leading-relaxed text-syntax-text md:text-sm">
        {link}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="btn-copy-link inline-flex h-11 items-center justify-center gap-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
          onClick={copy}
          type="button"
        >
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <button
          className="btn-secondary inline-flex h-11 items-center justify-center rounded-full border-white/20 font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
          onClick={share}
          type="button"
        >
          Share
        </button>
      </div>
    </div>
  );
}
