import { ShareCodeActions } from '@/components/share/ShareCodeActions';
import { highlightShareCode, resolveShareHighlightLanguage } from '@/lib/highlightShareCode';

interface ShareCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function ShareCodeBlock({ code, language, title }: ShareCodeBlockProps) {
  const highlighted = highlightShareCode(code, language);
  const languageLabel = resolveShareHighlightLanguage(language);

  return (
    <div className="overflow-hidden rounded-2xl border border-syntax-border bg-syntax-code">
      <div className="flex items-center justify-between gap-2 border-b border-syntax-border px-3 py-1">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-syntax-muted">
          {languageLabel === 'plaintext' ? 'code' : languageLabel}
        </span>
        <ShareCodeActions code={code} title={title} />
      </div>
      <pre className="share-hljs max-h-[28rem] overflow-auto px-4 py-3 font-mono text-[13px] leading-relaxed [scrollbar-width:thin]">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}