'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { resolveSharePrismLanguage } from '@/lib/sharePrismLanguage';

const CODE_BLOCK_THEME: Record<string, CSSProperties> = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...(vscDarkPlus['pre[class*="language-"]'] as CSSProperties | undefined),
    background: 'transparent',
    margin: 0,
    padding: 0,
    border: 0,
    boxShadow: 'none',
  },
  'code[class*="language-"]': {
    ...(vscDarkPlus['code[class*="language-"]'] as CSSProperties | undefined),
    background: 'transparent',
    padding: 0,
    textShadow: 'none',
  },
};

interface ShareCodeBlockProps {
  code: string;
  language?: string;
}

export function ShareCodeBlock({ code, language }: ShareCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const highlighterLanguage = useMemo(
    () => resolveSharePrismLanguage(language),
    [language],
  );

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1200);
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-syntax-border bg-syntax-code">
      <div className="flex items-center justify-between gap-2 border-b border-syntax-border px-3 py-1.5">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-syntax-muted">
          {highlighterLanguage}
        </span>
        <button
          aria-label={isCopied ? 'Copied' : 'Copy code'}
          className="rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-syntax-muted transition hover:bg-syntax-hover hover:text-syntax-text"
          onClick={handleCopy}
          type="button"
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="max-h-[28rem] overflow-auto px-4 py-3 [scrollbar-width:thin]">
        <SyntaxHighlighter
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: '13px',
              lineHeight: '1.55',
              whiteSpace: 'pre',
            },
          }}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            overflow: 'visible',
          }}
          language={highlighterLanguage}
          PreTag="div"
          style={CODE_BLOCK_THEME}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}