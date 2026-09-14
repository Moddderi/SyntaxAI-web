import { SUPPORT_EMAIL } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';

export function TeamTeaser() {
  return (
    <section className="border-y border-syntax-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-syntax-accent">
            Team workspaces
          </p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Not just personal notes. Shared team context.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="md:border-l md:border-syntax-border md:pl-12">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-syntax-accent/30 text-syntax-accent">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-lg font-medium">Team libraries are in development.</p>
            <p className="mt-3 max-w-md text-syntax-muted">
              Next: shared spaces where a team collects patterns, solutions, and the useful
              fragments of a project — together, not in five different Notion pages.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-syntax-accent transition hover:text-syntax-accent/80"
              href={`mailto:${SUPPORT_EMAIL}?subject=SyntaxAI%20team%20workspaces`}
            >
              Get launch updates
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
