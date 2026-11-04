'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { TECHS, TechIcon, type Tech } from '@/lib/techIcons';

interface Snippet {
  file: string;
  lang: string;
  tech: Tech;
  title: string;
  tags: string[];
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    file: 'clipboard.tsx',
    lang: 'TypeScript',
    tech: TECHS.react,
    title: 'useDebounce hook for search inputs',
    tags: ['react', 'hooks', 'debounce'],
    code: `function useDebounce<T>(value: T, ms = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);

  return debounced;
}`,
  },
  {
    file: 'clipboard.py',
    lang: 'Python',
    tech: TECHS.python,
    title: 'Load a CSV file into a list of dicts',
    tags: ['python', 'csv', 'files'],
    code: `import csv

def load_rows(path: str) -> list[dict]:
    with open(path, newline="") as f:
        return list(csv.DictReader(f))

rows = load_rows("users.csv")`,
  },
  {
    file: 'clipboard.go',
    lang: 'Go',
    tech: TECHS.go,
    title: 'HTTP server with graceful shutdown',
    tags: ['go', 'http', 'context'],
    code: `srv := &http.Server{Addr: ":8080"}

go func() { _ = srv.ListenAndServe() }()

<-ctx.Done()
_ = srv.Shutdown(context.Background())`,
  },
];

type Phase = 'typing' | 'analyzing' | 'done';

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" strokeLinejoin="round" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" strokeLinejoin="round" />
    </svg>
  );
}

export function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  const snippet = SNIPPETS[idx];

  useEffect(() => {
    if (!inView || reduce) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (typed < snippet.code.length) {
        timer = setTimeout(() => setTyped((n) => Math.min(snippet.code.length, n + 2)), 16);
      } else {
        timer = setTimeout(() => setPhase('analyzing'), 450);
      }
    } else if (phase === 'analyzing') {
      timer = setTimeout(() => setPhase('done'), 1200);
    } else {
      timer = setTimeout(() => {
        setIdx((i) => (i + 1) % SNIPPETS.length);
        setTyped(0);
        setPhase('typing');
      }, 4500);
    }

    return () => clearTimeout(timer);
  }, [inView, reduce, phase, typed, snippet.code.length]);

  const shownCode = reduce ? snippet.code : snippet.code.slice(0, typed);
  const shownPhase: Phase = reduce ? 'done' : phase;
  const preview = snippet.code.split('\n').filter(Boolean).slice(0, 3).join('\n');

  return (
    <section className="relative px-6 py-20 md:py-28" id="live-demo">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="demo-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-14" variant="blur-up">
          <SectionHead
            description="Paste anything. SyntaxAI reads it, names it, tags the stack and files it — before you finish your coffee."
            label="See it work"
            title="From raw code to a clean note"
          />
        </Reveal>

        <div
          className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4"
          ref={ref}
        >
          {/* INPUT */}
          <div className="demo-window overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-syntax-muted">{snippet.file}</span>
              <span className="ml-auto rounded-md border border-syntax-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                {snippet.lang}
              </span>
            </div>
            <pre className="min-h-[268px] overflow-hidden whitespace-pre-wrap break-words p-5 font-mono text-[12.5px] leading-relaxed text-syntax-text/90">
              {shownCode}
              {shownPhase === 'typing' ? <span className="demo-caret" /> : null}
            </pre>
          </div>

          {/* AI connector */}
          <div className="flex items-center justify-center md:flex-col">
            <div className="demo-beam hidden md:block" />
            <div
              className={`demo-ai-badge ${shownPhase === 'analyzing' ? 'demo-ai-badge--active' : ''} flex h-12 w-12 items-center justify-center rounded-2xl border border-syntax-brand/40 bg-black text-syntax-brand`}
            >
              <SparkIcon />
            </div>
            <div className="demo-beam hidden md:block" />
          </div>

          {/* OUTPUT */}
          <div className="demo-window relative min-h-[330px] overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
                Your library
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                {shownPhase === 'done' ? 'Saved' : shownPhase === 'analyzing' ? 'Analyzing…' : 'Waiting'}
              </span>
            </div>

            {shownPhase === 'typing' ? (
              <div className="flex h-[240px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-syntax-border text-center">
                <span className="text-syntax-muted">
                  <SparkIcon />
                </span>
                <p className="text-sm text-syntax-muted">Waiting for a snippet…</p>
              </div>
            ) : null}

            {shownPhase === 'analyzing' ? (
              <div className="flex h-[240px] flex-col gap-3 rounded-xl border border-syntax-border bg-syntax-bg p-4">
                <div className="flex items-center gap-3">
                  <div className="skeleton h-11 w-11 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-3 w-3/4 rounded" />
                    <div className="skeleton h-2.5 w-1/3 rounded" />
                  </div>
                </div>
                <div className="skeleton mt-2 h-16 w-full rounded-lg" />
                <div className="flex gap-2">
                  <div className="skeleton h-5 w-14 rounded-md" />
                  <div className="skeleton h-5 w-16 rounded-md" />
                  <div className="skeleton h-5 w-12 rounded-md" />
                </div>
                <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.14em] text-syntax-brand">
                  AI is reading your snippet…
                </p>
              </div>
            ) : null}

            {shownPhase === 'done' ? (
              <m.article
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="demo-note rounded-xl border border-syntax-border bg-syntax-bg p-4"
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
                key={snippet.title}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black"
                    style={{ boxShadow: `0 0 24px ${snippet.tech.color}33` }}
                  >
                    <TechIcon className="h-6 w-6" tech={snippet.tech} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-syntax-text">
                      {snippet.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                      Detected · {snippet.tech.name}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-syntax-muted">now</span>
                </div>

                <div className="code-surface mt-4 overflow-hidden p-3">
                  <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-syntax-muted">
                    {snippet.lang}
                  </p>
                  <pre className="max-h-[78px] overflow-hidden whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-syntax-text/85">
                    {preview}
                  </pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {snippet.tags.map((tag, i) => (
                    <m.span
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-md border border-syntax-brand/30 bg-syntax-brand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-brand"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      key={tag}
                      transition={{ delay: 0.25 + i * 0.12, duration: 0.35 }}
                    >
                      #{tag}
                    </m.span>
                  ))}
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-syntax-text">
                    <svg aria-hidden="true" className="h-3.5 w-3.5 text-syntax-brand" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Saved
                  </span>
                </div>
              </m.article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
