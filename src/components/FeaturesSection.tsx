import Image from 'next/image';
import type { ReactNode } from 'react';
import { FEATURE_GRID, FEATURE_HIGHLIGHTS, INSIGHTS_FEATURE } from '@/lib/site';
import { SHOTS } from '@/lib/shots';
import { Reveal } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionAmbient } from '@/components/SectionAmbient';
import { SectionHead } from '@/components/SectionHead';
import { TechPills } from '@/components/TechPills';

function FeatureCheck({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-syntax-muted">
      <svg
        aria-hidden="true"
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
      {children}
    </li>
  );
}

function TitleWithIcon({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <h3 className="mt-6 flex items-center gap-2.5 font-mono text-base font-bold uppercase tracking-[0.08em]">
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

function IconPanel() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <path d="M15 4v16" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" strokeLinecap="round" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <circle cx="9" cy="9" r="1.6" />
      <path d="m21 15-4.5-4.5L7 20" strokeLinejoin="round" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="10" rx="2" width="14" x="5" y="11" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const SMALL_ICONS = [IconSearch, IconImage, IconBolt, IconLock];

/** Browser-ish window around a real screenshot with hover zoom + scan line. */
function ShotWell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`shot-well relative overflow-hidden rounded-xl border border-syntax-border bg-syntax-bg ${className}`}
    >
      <span aria-hidden className="feature-shot__scan" />
      {children}
    </div>
  );
}

const CARD =
  'group flex h-full flex-col rounded-2xl border border-syntax-border bg-syntax-card p-5 sm:p-6';

export function FeaturesSection() {
  const [stackFeature, captureFeature] = FEATURE_HIGHLIGHTS;
  const { stack, insights, sidepanel } = SHOTS;

  return (
    <section className="relative scroll-mt-24 overflow-hidden py-20 md:py-28" id="features">
      <SectionAmbient tone="features" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mb-14" variant="blur-up">
          <SectionHead
            description="Don't dump snippets into random files. Capture the context, tag it, and reuse it when it actually matters."
            label="Features"
            title="Everything you need to keep the code"
          />
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-6">
          {/* Side panel — tall */}
          <Reveal className="h-full lg:col-span-2 lg:row-span-2" variant="scale">
            <SpotlightCard className="lift-card h-full rounded-2xl">
              <article className={CARD}>
                <ShotWell className="shot-fade-bottom min-h-[380px] flex-1">
                  <Image
                    alt={sidepanel.alt}
                    className="mx-auto mt-6 h-auto w-[74%] max-w-[300px] rounded-xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:-translate-y-2"
                    src={sidepanel.src}
                    unoptimized
                  />
                </ShotWell>
                <TitleWithIcon icon={<IconPanel />}>{captureFeature.title}</TitleWithIcon>
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
            </SpotlightCard>
          </Reveal>

          {/* Stack */}
          <Reveal className="h-full lg:col-span-4" delay={0.08} variant="scale">
            <SpotlightCard className="lift-card h-full rounded-2xl">
              <article className={CARD}>
                <ShotWell>
                  <Image
                    alt={stack.alt}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    src={stack.src}
                    unoptimized
                  />
                </ShotWell>
                <TitleWithIcon icon={<IconLayers />}>{stackFeature.title}</TitleWithIcon>
                <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
                  {stackFeature.description}
                </p>
                <div className="mt-auto pt-5">
                  <TechPills />
                </div>
              </article>
            </SpotlightCard>
          </Reveal>

          {/* Insights */}
          <Reveal className="h-full lg:col-span-4" delay={0.14} variant="scale">
            <SpotlightCard className="lift-card h-full rounded-2xl">
              <article className={CARD}>
                <ShotWell className="shot-fade-bottom h-[260px] sm:h-[320px]">
                  <Image
                    alt={insights.alt}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    src={insights.src}
                    unoptimized
                  />
                </ShotWell>
                <TitleWithIcon icon={<IconChart />}>{INSIGHTS_FEATURE.title}</TitleWithIcon>
                <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
                  {INSIGHTS_FEATURE.description}
                </p>
                <ul className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
                  {INSIGHTS_FEATURE.points.map((point) => (
                    <FeatureCheck key={point}>{point}</FeatureCheck>
                  ))}
                </ul>
              </article>
            </SpotlightCard>
          </Reveal>
        </div>

        <Stagger
          className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {FEATURE_GRID.map((feature, index) => {
            const Icon = SMALL_ICONS[index] ?? IconSearch;

            return (
              <StaggerItem className="h-full" key={feature.title}>
                <SpotlightCard className="lift-card h-full rounded-2xl">
                  <article className={`${CARD} sm:p-5`}>
                    <span className="icon-tile flex h-11 w-11 items-center justify-center rounded-xl border border-syntax-border bg-syntax-bg text-syntax-text">
                      <Icon />
                    </span>
                    <h3 className="mt-5 font-mono text-sm font-bold uppercase tracking-[0.06em]">
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
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
