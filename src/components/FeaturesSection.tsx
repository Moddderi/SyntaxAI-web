import { FEATURE_GRID, FEATURE_HIGHLIGHTS } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { TechPills } from '@/components/TechPills';
import type { ReactNode } from 'react';

function FeatureCheck({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-syntax-muted">
      <svg
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-syntax-accent"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {children}
    </li>
  );
}

function TitleWithIcon({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <h3 className="mt-5 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
      <span className="inline-flex h-6 w-6 items-center justify-center text-syntax-accent">
        {icon}
      </span>
      {children}
    </h3>
  );
}

function IconLayers() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z" strokeLinejoin="round" />
      <path d="m3 12 9 4.5L21 12" strokeLinejoin="round" />
      <path d="m3 16.5 9 4.5 9-4.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconCapture() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="14" rx="2" width="18" x="3" y="6" />
      <path d="M8 6 9.5 3.5h5L16 6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" strokeLinecap="round" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <circle cx="9" cy="9" r="1.6" />
      <path d="m21 15-4.5-4.5L7 20" strokeLinejoin="round" />
    </svg>
  );
}

function IconPanel() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <path d="M15 4v16" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="10" rx="2" width="14" x="5" y="11" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const SMALL_ICONS = [IconSearch, IconImage, IconPanel, IconLock];

function ShotFrame({
  children,
  glow,
}: {
  children: ReactNode;
  glow: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl ${glow} p-2.5`}>
      <div className="h-[200px] overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0c] shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  );
}

function StackVisual() {
  return (
    <ShotFrame glow="bg-linear-to-br from-syntax-accent/45 via-[#2a6bff]/30 to-[#0b3d44]">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="rounded-lg border border-syntax-border bg-syntax-card p-3 font-mono text-[11px] leading-relaxed text-syntax-muted">
          <span className="text-syntax-accent">export function</span> useNotes() {'{'}
          <br />
          &nbsp;&nbsp;return useQuery(&apos;notes&apos;)
          <br />
          {'}'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['TypeScript', 'React', 'TanStack Query'].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-syntax-accent/30 bg-syntax-accent/10 px-2 py-0.5 text-[10px] text-syntax-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ShotFrame>
  );
}

function CaptureVisual() {
  return (
    <ShotFrame glow="bg-linear-to-br from-[#4ee6f5]/40 via-[#08353b] to-syntax-accent/20">
      <div className="flex h-full items-stretch">
        <div className="hidden flex-1 space-y-2.5 p-4 sm:block">
          <div className="h-2.5 w-20 rounded bg-white/10" />
          <div className="h-2.5 w-full rounded bg-white/8" />
          <div className="h-2.5 w-4/5 rounded bg-white/8" />
          <div className="mt-4 rounded-lg border border-syntax-border bg-syntax-card p-3 font-mono text-[10px] text-syntax-muted">
            <span className="text-syntax-accent">function</span> saveNote() {'{'}
            {'}'}
          </div>
        </div>
        <aside className="flex w-[46%] flex-col border-l border-syntax-border bg-syntax-bg p-3">
          <p className="text-[11px] font-semibold">SyntaxAI</p>
          <span className="mt-2 w-fit rounded-md bg-syntax-accent/15 px-2 py-0.5 text-[9px] text-syntax-accent">
            Capture
          </span>
          <div className="mt-3 flex-1 rounded-lg border border-syntax-border bg-syntax-card" />
          <div className="mt-2 h-6 rounded-md bg-syntax-accent" />
        </aside>
      </div>
    </ShotFrame>
  );
}

function GridThumb({ index }: { index: number }) {
  const accents = [
    'from-syntax-accent/40 to-[#062428]',
    'from-cyan-200/30 to-[#0a2a30]',
    'from-syntax-accent/25 to-syntax-card',
    'from-[#4ee6f5]/35 to-[#071c20]',
  ];

  return (
    <div
      className={`h-28 overflow-hidden rounded-lg bg-linear-to-br ${accents[index] ?? accents[0]} p-[1px]`}
    >
      <div className="h-full rounded-[7px] bg-syntax-bg/90 p-4">
        <div className="h-2 w-16 rounded bg-white/15" />
        <div className="mt-3 h-2 w-full rounded bg-white/10" />
        <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [stackFeature, captureFeature] = FEATURE_HIGHLIGHTS;

  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28" id="features">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Everything you need to{' '}
          <span className="accent-flow">keep the code</span>
        </h2>
        <p className="mt-4 text-syntax-muted">
          Don&apos;t dump snippets into random files. Capture the context, tag it, and reuse
          it when it actually matters.
        </p>
      </Reveal>

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <article className="lift-card flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5 sm:p-6">
            <StackVisual />
            <TitleWithIcon icon={<IconLayers />}>{stackFeature.title}</TitleWithIcon>
            <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
              {stackFeature.description}
            </p>
            <div className="mt-auto pt-5">
              <TechPills />
            </div>
          </article>
        </Reveal>

        <Reveal className="h-full" delay={0.08}>
          <article className="lift-card flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5 sm:p-6">
            <CaptureVisual />
            <TitleWithIcon icon={<IconCapture />}>{captureFeature.title}</TitleWithIcon>
            <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
              {captureFeature.description}
            </p>
            <ul className="mt-auto space-y-2 pt-5">
              {'points' in captureFeature
                ? captureFeature.points.map((point) => (
                    <FeatureCheck key={point}>{point}</FeatureCheck>
                  ))
                : null}
            </ul>
          </article>
        </Reveal>
      </div>

      <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURE_GRID.map((feature, index) => {
          const Icon = SMALL_ICONS[index] ?? IconSearch;

          return (
            <Reveal key={feature.title} className="h-full" delay={0.04 + index * 0.06}>
              <article className="lift-card flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5">
                <GridThumb index={index} />
                <h3 className="mt-5 flex items-center gap-2 text-base font-semibold">
                  <span className="text-syntax-accent">
                    <Icon />
                  </span>
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
                  {feature.description}
                </p>
                <ul className="mt-auto space-y-2 pt-4">
                  {feature.points.map((point) => (
                    <FeatureCheck key={point}>{point}</FeatureCheck>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
