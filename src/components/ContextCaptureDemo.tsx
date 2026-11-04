'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { TECHS, TechIcon, type Tech } from '@/lib/techIcons';

interface DocPage {
  url: string;
  heading: string;
  selected: string;
  rest: string;
  code: string;
  tech: Tech;
  noteTitle: string;
  tags: string[];
}

const PAGES: DocPage[] = [
  {
    url: 'react.dev/reference/react/useEffect',
    heading: 'useEffect',
    selected:
      'Effects let a component synchronize with an external system. The dependency array decides when the effect runs again.',
    rest: 'Return a cleanup function to undo whatever the effect set up before the next run.',
    code: 'useEffect(() => { connect(); return disconnect; }, [roomId]);',
    tech: TECHS.react,
    noteTitle: 'useEffect: sync with external systems',
    tags: ['react', 'hooks', 'docs'],
  },
  {
    url: 'developer.mozilla.org/docs/Web/API/Fetch_API',
    heading: 'Fetch API',
    selected:
      'Make network requests and handle the response with promises. Parse the body with response.json() once the request resolves.',
    rest: 'Check response.ok yourself — fetch only rejects on network failures, not on HTTP errors.',
    code: 'const res = await fetch(url); if (!res.ok) throw new Error(res.status);',
    tech: TECHS.javascript,
    noteTitle: 'Fetch API: requests and responses',
    tags: ['javascript', 'fetch', 'docs'],
  },
  {
    url: 'docs.python.org/3/library/pathlib.html',
    heading: 'pathlib',
    selected:
      'Work with filesystem paths as objects instead of plain strings. Join paths with the / operator and read files directly from them.',
    rest: 'Path objects are available on every platform and handle separators for you.',
    code: 'Path("data") / "users.csv"  # -> data/users.csv',
    tech: TECHS.python,
    noteTitle: 'pathlib: filesystem paths as objects',
    tags: ['python', 'pathlib', 'docs'],
  },
];

type Phase = 'idle' | 'select' | 'menu' | 'click' | 'saved';

const STEPS: { phase: Phase[]; label: string }[] = [
  { phase: ['select'], label: 'Select text' },
  { phase: ['menu'], label: 'Right-click' },
  { phase: ['click', 'saved'], label: 'Add to SyntaxAI' },
];

const MENU_X = 62; // % of page area
const MENU_Y = 58;

function CursorIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24">
      <path
        d="M5 3.2 19.2 11l-6.3 1.5 3.4 6.4-2.6 1.3-3.3-6.5L5 17.8V3.2Z"
        fill="#fff"
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function MenuRow({
  children,
  muted = false,
  active = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex h-[30px] items-center gap-2 rounded-md px-2.5 text-[12px] transition-colors duration-200 ${
        active ? 'bg-[#0a5fd9] text-white' : muted ? 'text-white/45' : 'text-white/90'
      }`}
    >
      {children}
    </div>
  );
}

export function ContextCaptureDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (!inView || reduce) {
      return;
    }

    const next: Record<Phase, { to: Phase; ms: number }> = {
      idle: { to: 'select', ms: 900 },
      select: { to: 'menu', ms: 1700 },
      menu: { to: 'click', ms: 1300 },
      click: { to: 'saved', ms: 650 },
      saved: { to: 'idle', ms: 4600 },
    };

    const step = next[phase];
    const timer = setTimeout(() => {
      if (phase === 'saved') {
        setIdx((i) => (i + 1) % PAGES.length);
      }
      setPhase(step.to);
    }, step.ms);

    return () => clearTimeout(timer);
  }, [inView, reduce, phase]);

  const page = PAGES[idx];
  const shown: Phase = reduce ? 'saved' : phase;
  const selecting = shown !== 'idle';
  const menuOpen = shown === 'menu' || shown === 'click';
  const saved = shown === 'saved';

  let cursor = { left: '80%', top: '88%', x: 0, y: 0 };
  if (shown === 'select') cursor = { left: `${MENU_X - 4}%`, top: `${MENU_Y - 8}%`, x: 0, y: 0 };
  if (shown === 'menu') cursor = { left: `${MENU_X}%`, top: `${MENU_Y}%`, x: 0, y: 0 };
  if (shown === 'click') cursor = { left: `${MENU_X}%`, top: `${MENU_Y}%`, x: 70, y: 84 };
  if (saved) cursor = { left: `${MENU_X}%`, top: `${MENU_Y}%`, x: 130, y: 120 };

  return (
    <section className="relative px-6 py-20 md:py-28" id="context-capture">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="demo-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-10" variant="blur-up">
          <SectionHead
            description="Reading docs, an article or a Stack Overflow answer? Select the useful part, right-click, and it's in your library — with the page it came from."
            label="Capture from any page"
            title="Select. Right-click. Saved."
          />
        </Reveal>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3" ref={ref}>
          {STEPS.map((step, i) => {
            const active = step.phase.includes(shown);
            return (
              <div
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                  active
                    ? 'border-syntax-brand/60 bg-syntax-brand/15 text-syntax-text shadow-[0_0_24px_rgb(var(--syntax-brand-rgb)/0.35)]'
                    : 'border-syntax-border bg-syntax-card text-syntax-muted'
                }`}
                key={step.label}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    active ? 'bg-syntax-brand text-white' : 'bg-syntax-hover'
                  }`}
                >
                  {i + 1}
                </span>
                {step.label}
              </div>
            );
          })}
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Browser mock */}
          <div className="demo-window overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex flex-1 items-center gap-2 truncate rounded-lg border border-syntax-border bg-syntax-bg px-3 py-1 font-mono text-[11px] text-syntax-muted">
                <svg aria-hidden="true" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="10" rx="2" width="14" x="5" y="11" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <span className="truncate">{page.url}</span>
              </div>
            </div>

            <div className="relative h-[372px] overflow-hidden bg-[#0b0b0d] p-6 sm:p-7">
              {/* fake site chrome */}
              <div className="mb-5 flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="h-5 w-5 rounded-md bg-white/15" />
                <div className="h-2 w-16 rounded bg-white/10" />
                <div className="h-2 w-12 rounded bg-white/10" />
                <div className="h-2 w-14 rounded bg-white/10" />
              </div>

              <h3 className="font-mono text-2xl font-bold text-white">{page.heading}</h3>

              <p className="mt-4 max-w-[34rem] text-[14px] leading-[1.75] text-white/70">
                <span className={`ctx-selection ${selecting ? 'ctx-selection--on' : ''}`}>
                  {page.selected}
                </span>{' '}
                {page.rest}
              </p>

              <div className="mt-5 max-w-[34rem] rounded-lg border border-white/10 bg-black/60 px-4 py-3 font-mono text-[12px] text-white/70">
                {page.code}
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="h-2 w-5/6 max-w-[30rem] rounded bg-white/[0.06]" />
                <div className="h-2 w-2/3 max-w-[24rem] rounded bg-white/[0.06]" />
              </div>

              {/* context menu */}
              {menuOpen ? (
                <m.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute z-20 w-[232px] origin-top-left rounded-xl border border-white/15 bg-[#2a2a2e]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur"
                  initial={{ opacity: 0, scale: 0.92 }}
                  style={{ left: `${MENU_X}%`, top: `${MENU_Y}%` }}
                  transition={{ duration: 0.16 }}
                >
                  <MenuRow>Copy</MenuRow>
                  <MenuRow>Search Google for “…”</MenuRow>
                  <div className="mx-2 my-1 h-px bg-white/10" />
                  <MenuRow active={shown === 'click'}>
                    <Image
                      alt=""
                      aria-hidden
                      className="h-4 w-4 rounded-[3px]"
                      height={16}
                      src="/logo-mark.png"
                      unoptimized
                      width={16}
                    />
                    <span className="font-medium">Add to SyntaxAI</span>
                  </MenuRow>
                  <MenuRow muted>Inspect</MenuRow>
                </m.div>
              ) : null}

              {/* toast */}
              {saved ? (
                <m.div
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 z-20 flex items-center gap-2.5 rounded-xl border border-syntax-brand/40 bg-black/90 py-2.5 pl-3 pr-4 shadow-[0_0_30px_rgb(var(--syntax-brand-rgb)/0.35)] backdrop-blur"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  key={`toast-${idx}`}
                  transition={{ duration: 0.35 }}
                >
                  <Image alt="" aria-hidden className="h-5 w-5 rounded" height={20} src="/logo-mark.png" unoptimized width={20} />
                  <span className="text-[12px] font-medium text-white">Added to SyntaxAI</span>
                  <svg aria-hidden="true" className="h-4 w-4 text-syntax-brand" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" viewBox="0 0 24 24">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </m.div>
              ) : null}

              {/* cursor */}
              {reduce ? null : (
                <m.div
                  animate={cursor}
                  className="pointer-events-none absolute z-30"
                  initial={false}
                  transition={{ duration: shown === 'idle' ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CursorIcon />
                </m.div>
              )}
            </div>
          </div>

          {/* Library */}
          <div className="demo-window relative flex flex-col overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
                Your library
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                {saved ? '+1 note' : 'Listening…'}
              </span>
            </div>

            {saved ? (
              <m.article
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="demo-note rounded-xl border border-syntax-brand/40 bg-syntax-bg p-4 shadow-[0_0_34px_rgb(var(--syntax-brand-rgb)/0.2)]"
                initial={reduce ? false : { opacity: 0, y: -16, scale: 0.96 }}
                key={`note-${idx}`}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black"
                    style={{ boxShadow: `0 0 24px ${page.tech.color}33` }}
                  >
                    <TechIcon className="h-6 w-6" tech={page.tech} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-syntax-text">
                      {page.noteTitle}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                      Detected · {page.tech.name}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-syntax-muted">now</span>
                </div>

                <p className="mt-4 rounded-lg border border-syntax-border bg-black/50 p-3 text-[12px] leading-relaxed text-syntax-text/80">
                  “{page.selected}”
                </p>

                <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
                  <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" strokeLinecap="round" />
                    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" strokeLinecap="round" />
                  </svg>
                  <span className="truncate">Source · {page.url}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {page.tags.map((tag, i) => (
                    <m.span
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-md border border-syntax-brand/30 bg-syntax-brand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-brand"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      key={tag}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
                    >
                      #{tag}
                    </m.span>
                  ))}
                </div>
              </m.article>
            ) : (
              <div className="flex min-h-[300px] flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-syntax-border px-6 text-center">
                <Image alt="" aria-hidden className="h-8 w-8 opacity-50" height={32} src="/logo-mark.png" unoptimized width={32} />
                <p className="text-sm text-syntax-muted">
                  Select text on any page, then right-click →{' '}
                  <span className="text-syntax-text">Add to SyntaxAI</span>
                </p>
              </div>
            )}

            <p className="mt-auto pt-5 text-xs leading-relaxed text-syntax-muted">
              The page URL is saved with the selection and the stack is detected from the context, so
              you always know where a note came from.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
