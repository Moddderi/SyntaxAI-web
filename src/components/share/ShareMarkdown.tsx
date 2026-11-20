import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ShareCodeBlock } from '@/components/share/ShareCodeBlock';

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mb-3 mt-6 text-xl font-semibold text-syntax-text first:mt-0">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-2 mt-5 text-lg font-semibold text-syntax-text first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="mb-2 mt-4 text-base font-semibold text-syntax-text first:mt-0">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-sm leading-relaxed text-syntax-muted last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1.5 pl-5 text-sm text-syntax-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1.5 pl-5 text-sm text-syntax-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-3 border-l-2 border-syntax-accent/40 pl-4 text-sm italic text-syntax-muted">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      className="text-syntax-text underline-offset-2 hover:underline"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-syntax-text">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-4 border-syntax-border" />,
  pre: ({ children }) => <div className="my-4">{children}</div>,
};

export function ShareMarkdown({
  content,
  fallbackLanguage,
  title,
}: {
  content: string;
  fallbackLanguage?: string;
  title?: string;
}) {
  const components: Components = {
    ...markdownComponents,
    code: ({ className, children }) => {
      const languageMatch = /language-([\w-]+)/.exec(className ?? '');
      const codeText = String(children).replace(/\n$/, '');

      if (languageMatch || codeText.includes('\n')) {
        return (
          <ShareCodeBlock
            code={codeText}
            language={languageMatch?.[1] ?? fallbackLanguage}
            title={title}
          />
        );
      }

      return (
        <code className="rounded-md border border-syntax-border bg-syntax-bg px-1.5 py-0.5 font-mono text-[12px] text-syntax-text">
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}