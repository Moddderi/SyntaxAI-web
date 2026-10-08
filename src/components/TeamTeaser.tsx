import { Reveal, RevealNeonLine } from '@/components/motion/Reveal';
import { SectionAmbient } from '@/components/SectionAmbient';
import { TeamWorkspaceVisual } from '@/components/team/TeamWorkspaceVisual';
import { SUPPORT_EMAIL } from '@/lib/site';

export function TeamTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-syntax-border">
      <SectionAmbient tone="team" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
        <Reveal variant="left">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-syntax-muted">
            Team workspaces
          </p>
          <h2 className="mt-4 max-w-md font-mono text-3xl font-bold uppercase leading-tight tracking-[0.06em] md:text-4xl">
            Not just personal notes. Shared team context.
          </h2>
          <RevealNeonLine align="left" />
          <div className="mt-8 rounded-2xl border border-syntax-border/80 bg-syntax-card/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-syntax-border text-syntax-text team-icon-pulse">
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
            <p className="text-lg font-medium text-syntax-text">Team libraries are in development.</p>
            <p className="mt-3 max-w-md text-syntax-muted">
              Next: shared spaces where a team collects patterns, solutions, and the useful
              fragments of a project — together, not in five different Notion pages.
            </p>
            <a
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-syntax-text transition hover:text-syntax-muted"
              href={`mailto:${SUPPORT_EMAIL}?subject=SyntaxAI%20team%20workspaces`}
            >
              Get launch updates
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="right">
          <TeamWorkspaceVisual />
        </Reveal>
      </div>
    </section>
  );
}
