import Link from 'next/link';
import { BrowserInstallButtons } from '@/components/BrowserInstallButtons';
import { Logo } from '@/components/Logo';
import { ShareCodeBlock } from '@/components/share/ShareCodeBlock';
import { ShareMarkdown } from '@/components/share/ShareMarkdown';
import type { NoteShareSnapshot } from '@/lib/note-share-types';
import { resolveShareTech } from '@/lib/resolveShareTech';
import { TechIcon } from '@/lib/techIcons';

const FENCED_CODE_RE = /```[\w-]*\n[\s\S]*?```/;

function formatTopicLabel(slug: string): string {
  const tech = resolveShareTech(slug);
  if (tech) {
    return tech.name;
  }

  return slug.replace(/^#+/, '').replace(/[-_]+/g, ' ').trim();
}

function formatSourceLabel(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripMatchingTitle(markdown: string, title: string): string {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return markdown.trim();
  }

  return markdown
    .replace(new RegExp(`^#\\s+${escapeRegExp(trimmedTitle)}\\s*\\n+`, 'i'), '')
    .trim();
}

function TechPill({ slug }: { slug: string }) {
  const tech = resolveShareTech(slug);
  const label = formatTopicLabel(slug);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-syntax-border bg-syntax-bg px-3 py-1.5 text-xs text-syntax-text">
      {tech ? <TechIcon className="h-4 w-4" tech={tech} /> : null}
      {label}
    </span>
  );
}

interface SharedNoteCardProps {
  snapshot: NoteShareSnapshot;
  expiresAt: Date;
  sharerName: string | null;
}

export function SharedNoteCard({ snapshot, expiresAt, sharerName }: SharedNoteCardProps) {
  const expiresLabel = expiresAt.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const primaryTech = resolveShareTech(snapshot.primaryTech) ?? resolveShareTech(snapshot.language);
  const bodyMarkdown = snapshot.body ? stripMatchingTitle(snapshot.body, snapshot.title) : '';
  const summaryMarkdown = snapshot.summary?.trim() ?? '';
  const bodyHasCode = FENCED_CODE_RE.test(bodyMarkdown);
  const showStandaloneCode = snapshot.code.trim().length > 0 && !bodyHasCode;
  const showSummary = summaryMarkdown.length > 0;
  const showBody = bodyMarkdown.length > 0;
  const stackSlugs = [
    snapshot.primaryTech,
    snapshot.language,
    ...snapshot.topics,
  ].filter((slug, index, array) => slug && array.indexOf(slug) === index);

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <Logo className="h-9 w-9" />
          <span className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-syntax-text">
            SyntaxAI
          </span>
        </Link>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-muted">
          Shared note · link expires {expiresLabel}
        </p>
      </header>

      <article className="overflow-hidden rounded-3xl border border-syntax-border bg-syntax-card">
        <div className="border-b border-syntax-border px-6 py-6 md:px-8">
          <div className="flex items-start gap-4">
            {primaryTech ? (
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-syntax-border bg-syntax-bg">
                <TechIcon className="h-6 w-6" tech={primaryTech} />
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold leading-snug text-syntax-text md:text-[1.75rem]">
                {snapshot.title}
              </h1>
              {sharerName ? (
                <p className="mt-2 text-sm text-syntax-muted">Shared by {sharerName}</p>
              ) : null}
              {snapshot.sourceUrl ? (
                <p className="mt-3 truncate text-xs text-syntax-muted">
                  Source:{' '}
                  <a
                    className="text-syntax-text underline-offset-4 hover:underline"
                    href={snapshot.sourceUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {formatSourceLabel(snapshot.sourceUrl)}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {stackSlugs.map((slug) => (
              <TechPill key={slug} slug={slug} />
            ))}
          </div>
        </div>

        {showSummary ? (
          <section
            className={`px-6 py-6 md:px-8 ${showBody || showStandaloneCode ? 'border-b border-syntax-border' : ''}`}
          >
            <h2 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-muted">
              Summary
            </h2>
            <ShareMarkdown content={summaryMarkdown} fallbackLanguage={snapshot.language} />
          </section>
        ) : null}

        {showBody ? (
          <section
            className={`px-6 py-6 md:px-8 ${showStandaloneCode ? 'border-b border-syntax-border' : ''}`}
          >
            <h2 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-muted">
              Context
            </h2>
            <ShareMarkdown content={bodyMarkdown} fallbackLanguage={snapshot.language} />
          </section>
        ) : null}

        {showStandaloneCode ? (
          <section className="px-6 py-6 md:px-8">
            <h2 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-syntax-muted">
              Code
            </h2>
            <ShareCodeBlock code={snapshot.code} language={snapshot.language} />
          </section>
        ) : null}
      </article>

      <footer className="mt-12 rounded-3xl border border-syntax-border bg-syntax-card/60 px-6 py-10 text-center md:px-10">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-syntax-muted">
          Saved with SyntaxAI
        </p>
        <p className="mt-3 text-sm text-syntax-muted">
          Capture code from any page, AI structures it, and your library syncs after sign-in.
        </p>
        <BrowserInstallButtons className="mt-8 justify-center" layout="row" />
      </footer>
    </div>
  );
}