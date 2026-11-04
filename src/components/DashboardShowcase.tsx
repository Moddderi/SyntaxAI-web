'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { SHOTS } from '@/lib/shots';

/** Positions are percentages over the library screenshot. */
const HOTSPOTS = [
  { label: 'Search notes, tags, languages', x: 36, y: 6.5, side: 'right' },
  { label: 'Filter by stack', x: 15.5, y: 37.7, side: 'right' },
  { label: 'Grid or list view', x: 87.5, y: 12.5, side: 'left' },
] as const;

export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'center 55%'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);

  const { library } = SHOTS;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28" id="demo">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[28rem] max-w-4xl rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-12" variant="blur-up">
          <SectionHead
            description="Every note is titled, tagged and stacked by AI. One calm dashboard for your whole library."
            label="The dashboard"
            title="Your whole library, one search away"
          />
        </Reveal>

        <div className="[perspective:1800px]" ref={ref}>
          <m.div
            className="relative origin-top"
            style={reduce ? undefined : { rotateX, scale, opacity }}
          >
            <m.div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -bottom-10 h-1/2 rounded-[3rem] bg-white blur-[90px]"
              style={reduce ? { opacity: 0.12 } : { opacity: glow }}
            />

            <div className="hero-frame relative rounded-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_50px_120px_rgba(0,0,0,0.75)]">
                <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 truncate rounded-lg border border-syntax-border bg-syntax-bg px-3 py-1 font-mono text-[11px] text-syntax-muted">
                    SyntaxAI — All notes
                  </div>
                </div>

                <div className="relative">
                  <Image
                    alt={library.alt}
                    className="h-auto w-full"
                    src={library.src}
                    unoptimized
                  />
                  <span aria-hidden className="feature-shot__scan" />

                  {HOTSPOTS.map((spot) => (
                    <div
                      className="hotspot hidden lg:block"
                      key={spot.label}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                      <span className="hotspot__dot" />
                      <span
                        className={`hotspot__label ${
                          spot.side === 'left' ? 'hotspot__label--left' : ''
                        }`}
                      >
                        {spot.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
