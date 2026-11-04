import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionHead } from '@/components/SectionHead';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { HOW_IT_WORKS } from '@/lib/site';

const ICONS = [
  <svg aria-hidden="true" className="h-6 w-6" fill="none" key="capture" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg aria-hidden="true" className="h-6 w-6" fill="none" key="ai" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" strokeLinejoin="round" />
    <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" strokeLinejoin="round" />
  </svg>,
  <svg aria-hidden="true" className="h-6 w-6" fill="none" key="find" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>,
];

export function HowItWorks() {
  return (
    <section className="relative px-6 py-16 md:py-24" id="how-it-works">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14" variant="blur-up">
          <SectionHead
            description="From a random tab to a tagged, searchable snippet — in seconds, without breaking your flow."
            label="How it works"
            title="Capture. Tag. Reuse."
          />
        </Reveal>

        <div className="relative">
          <div aria-hidden className="steps-line hidden md:block" />
          <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.14}>
            {HOW_IT_WORKS.map((item, index) => (
              <StaggerItem className="h-full" key={item.step}>
                <SpotlightCard className="lift-card h-full rounded-2xl border border-syntax-border bg-syntax-card p-6">
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-syntax-border bg-syntax-bg text-syntax-text shadow-[var(--syntax-glow)]">
                        {ICONS[index]}
                      </span>
                      <span className="font-mono text-4xl font-bold text-white/10">{item.step}</span>
                    </div>
                    <h3 className="mt-6 font-mono text-base font-bold uppercase tracking-[0.08em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-syntax-muted">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
