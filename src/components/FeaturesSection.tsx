import { FEATURE_GRID, FEATURE_HIGHLIGHTS } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionAmbient } from '@/components/SectionAmbient';
import { SectionHead } from '@/components/SectionHead';
import { TechPills } from '@/components/TechPills';
import type { ReactNode } from 'react';

function FeatureCheck({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-syntax-muted">
      <svg
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-syntax-text"
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
    <h3 className="mt-5 flex items-center gap-2.5 font-mono text-base font-bold uppercase tracking-[0.08em]">
      <span className="inline-flex h-6 w-6 items-center justify-center text-syntax-text">
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

function ShotFrame({ children }: { children: ReactNode }) {
  return (
    <div className="feature-shot overflow-hidden rounded-xl border border-syntax-border bg-syntax-code p-2.5 shadow-[var(--syntax-glow)]">
      <div className="relative h-[200px] overflow-hidden rounded-lg border border-syntax-border bg-syntax-bg">
        <span className="feature-shot__scan" aria-hidden />
        {children}
      </div>
    </div>
  );
}

function StackVisual() {
  return (
    <ShotFrame>
      <div className="flex h-full flex-col justify-between p-4">
        <div className="code-surface p-3 text-[11px] leading-relaxed text-syntax-muted">
          <span className="text-syntax-text">export function</span> useNotes() {'{'}
          <br />
          &nbsp;&nbsp;return useQuery(&apos;notes&apos;)
          <br />
          {'}'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['TypeScript', 'React', 'TanStack Query'].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-syntax-border bg-syntax-hover px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-syntax-muted"
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
    <ShotFrame>
      <div className="flex h-full items-stretch">
        <div className="hidden flex-1 space-y-2.5 p-4 sm:block">
          <div className="h-2.5 w-20 rounded bg-white/10" />
          <div className="h-2.5 w-full rounded bg-white/8" />
          <div className="h-2.5 w-4/5 rounded bg-white/8" />
          <div className="code-surface mt-4 p-3 text-[10px] text-syntax-muted">
            <span className="text-syntax-text">function</span> saveNote() {'{'}
            {'}'}
          </div>
        </div>
        <aside className="flex w-[46%] flex-col border-l border-syntax-border bg-syntax-card p-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider">SyntaxAI</p>
          <span className="mt-2 w-fit rounded-md border border-syntax-border bg-syntax-hover px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-syntax-muted">
            Capture
          </span>
          <div className="mt-3 flex-1 rounded-lg border border-syntax-border bg-syntax-bg" />
          <div className="mt-2 h-6 rounded-full bg-syntax-accent" />
        </aside>
      </div>
    </ShotFrame>
  );
}

function GridThumb({ index }: { index: number }) {
  const opacity = ['opacity-90', 'opacity-75', 'opacity-85', 'opacity-70'][index] ?? 'opacity-80';

  return (
    <div
      className={`feature-thumb h-28 overflow-hidden rounded-lg border border-syntax-border bg-syntax-code p-4 ${opacity}`}
    >
      <div className="h-2 w-16 rounded bg-white/15" />
      <div className="mt-3 h-2 w-full rounded bg-white/10" />
      <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
    </div>
  );
}

export function FeaturesSection() {
  const [stackFeature, captureFeature] = FEATURE_HIGHLIGHTS;

  return (
    <section
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
      id="features"
    >
      <SectionAmbient tone="features" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
      <Reveal className="mb-14" variant="blur-up">
        <SectionHead
          label="Features"
          title="Everything you need to keep the code"
          description="Don't dump snippets into random files. Capture the context, tag it, and reuse it when it actually matters."
        />
      </Reveal>

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <Reveal className="h-full" variant="scale">
          <article className="lift-card feature-card-glow flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5 sm:p-6">
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

        <Reveal className="h-full" delay={0.08} variant="scale">
          <article className="lift-card feature-card-glow flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5 sm:p-6">
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

      <Stagger className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {FEATURE_GRID.map((feature, index) => {
          const Icon = SMALL_ICONS[index] ?? IconSearch;

          return (
            <StaggerItem key={feature.title} className="h-full">
              <article className="lift-card feature-card-glow flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5">
                <GridThumb index={index} />
                <h3 className="mt-5 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.06em]">
                  <span className="text-syntax-text">
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
            </StaggerItem>
          );
        })}
      </Stagger>
      </div>
    </section>
  );
}
