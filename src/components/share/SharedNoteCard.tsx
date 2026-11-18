import Link from 'next/link';
import { BrowserInstallButtons } from '@/components/BrowserInstallButtons';
import { Logo } from '@/components/Logo';
import type { NoteShareSnapshot } from '@/lib/note-share-types';
import { resolveShareTech } from '@/lib/resolveShareTech';
import { TechIcon } from '@/lib/techIcons';

function TechPill({ slug, label }: { slug: string; label: string }) {
  const tech = resolveShareTech(slug);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-syntax-border bg-syntax-card px-3 py-1.5 text-xs text-syntax-text">
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
          <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.04em] text-syntax-text md:text-3xl">
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
                {snapshot.sourceUrl}
              </a>
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {stackSlugs.map((slug) => (
              <TechPill key={slug} label={slug} slug={slug} />
            ))}
          </div>
        </div>

        {snapshot.summary?.trim() ? (
          <section className="border-b border-syntax-border px-6 py-6 md:px-8">
            <h2 className="syntax-label mb-3 text-syntax-muted">Summary</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-syntax-text">
              {snapshot.summary.trim()}
            </p>
          </section>
        ) : null}

        {snapshot.body?.trim() ? (
          <section className="border-b border-syntax-border px-6 py-6 md:px-8">
            <h2 className="syntax-label mb-3 text-syntax-muted">Context</h2>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-syntax-muted">
              {snapshot.body.trim()}
            </div>
          </section>
        ) : null}

        {snapshot.code.trim() ? (
          <section className="px-6 py-6 md:px-8">
            <h2 className="syntax-label mb-3 text-syntax-muted">Code</h2>
            <pre className="max-h-[28rem] overflow-auto rounded-2xl border border-syntax-border bg-syntax-bg p-4 font-mono text-[13px] leading-relaxed text-syntax-text">
              <code>{snapshot.code}</code>
            </pre>
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