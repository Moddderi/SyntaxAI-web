'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { TiltFrame } from '@/components/motion/TiltFrame';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { SHOTS } from '@/lib/shots';

const STEPS = [
  { n: '01', title: 'Share from a note', body: 'Open any snippet in the dashboard and hit Share. SyntaxAI mints a private-looking public page.' },
  { n: '02', title: 'Send the link', body: 'Copy syntaxai.app/s/… and drop it in Slack, email, or a PR. No zip, no screenshot dump.' },
  { n: '03', title: 'They just open it', body: 'Title, stack, summary and highlighted code — Copy is one click. No account required.' },
] as const;

const POINTS = [
  'Anyone with the link can read it',
  'Expires in 7 days, or revoke sooner',
  'Code stays copyable and highlighted',
] as const;

export function ShareNoteDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCopied(true);
      return;
    }

    if (!inView) {
      setCopied(false);
      return;
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setCopied(true), 700));
    timers.push(window.setTimeout(() => setCopied(false), 3200));
    const loop = window.setInterval(() => {
      setCopied(true);
      timers.push(window.setTimeout(() => setCopied(false), 2500));
    }, 5200);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(loop);
    };
  }, [inView, reduce]);

  const { sharedNote } = SHOTS;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28" id="share">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="demo-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-12" variant="blur-up">
          <SectionHead
            description="Hit Share on any note. Your teammate gets a clean page — the title, the stack, the code. No install, no account. The link dies in 7 days."
            label="Share a note"
            title="Send the snippet, not a screenshot"
          />
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14" ref={ref}>
          <div>
            <ol className="space-y-6">
              {STEPS.map((step) => (
                <li className="flex gap-4" key={step.n}>
                  <span className="mt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-brand">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-syntax-text">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-syntax-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-10 space-y-2.5 border-t border-syntax-border pt-6">
              {POINTS.map((point) => (
                <li className="flex items-center gap-2.5 text-sm text-syntax-muted" key={point}>
                  <svg
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-syntax-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <TiltFrame>
            <div className="hero-frame relative rounded-2xl">
              <div className="demo-window overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-syntax-border bg-syntax-bg px-3 py-1 font-mono text-[11px] text-syntax-muted">
                    <svg
                      aria-hidden
                      className="h-3 w-3 shrink-0 text-syntax-brand"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect height="10" rx="2" width="14" x="5" y="11" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span className="truncate">syntaxai.app/s/react-counter</span>
                  </div>
                  <span
                    className={`share-copied hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] sm:inline-flex ${
                      copied
                        ? 'share-copied--on border-syntax-brand/50 bg-syntax-brand/15 text-syntax-text'
                        : 'border-syntax-border text-syntax-muted'
                    }`}
                  >
                    <svg
                      aria-hidden
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                      viewBox="0 0 24 24"
                    >
                      {copied ? (
                        <path d="M20 6 9 17l-5-5" />
                      ) : (
                        <>
                          <rect height="13" rx="2" width="13" x="9" y="9" />
                          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </>
                      )}
                    </svg>
                    {copied ? 'Copied' : 'Copy link'}
                  </span>
                </div>

                <div className="relative bg-black">
                  <Image
                    alt={sharedNote.alt}
                    className="h-auto w-full"
                    src={sharedNote.src}
                    unoptimized
                  />
                  <span aria-hidden className="feature-shot__scan" />

                  <m.div
                    animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    className="share-toast pointer-events-none absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_40px_rgba(139,92,246,0.45)] backdrop-blur-md"
                    initial={false}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-syntax-brand shadow-[0_0_10px_var(--syntax-brand)]" />
                    Link copied · 7 days
                  </m.div>
                </div>
              </div>
            </div>
          </TiltFrame>
        </div>
      </div>
    </section>
  );
}
