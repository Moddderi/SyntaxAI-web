import { HERO_VIDEO_URL } from '@/lib/site';

export function HeroMedia() {
  return (
    <div className="hero-enter hero-enter-5 relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-white/[0.06] blur-3xl" />

      <div className="hero-media-float relative [perspective:1400px]">
        <div className="overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_32px_80px_rgba(0,0,0,0.65)] transition duration-500 hover:border-white/20 lg:[transform:rotateX(6deg)_rotateY(-10deg)]">
          <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 rounded-lg border border-syntax-border bg-syntax-bg px-3 py-1 font-mono text-[11px] text-syntax-muted">
              syntaxai.app — product walkthrough
            </div>
          </div>

          <div className="relative aspect-[16/10] bg-syntax-bg">
            {HERO_VIDEO_URL ? (
              <video
                autoPlay
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                src={HERO_VIDEO_URL}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_rgb(255_255_255_/_0.06)_0%,_transparent_62%)]">
                <div className="absolute inset-6 rounded-xl border border-syntax-border bg-syntax-card/60 p-5">
                  <div className="skeleton mb-4 h-3 w-28 rounded" />
                  <div className="space-y-2">
                    <div className="skeleton h-2.5 w-full rounded" />
                    <div className="skeleton h-2.5 w-5/6 rounded" />
                    <div className="skeleton h-2.5 w-2/3 rounded" />
                  </div>
                  <div className="code-surface mt-6 p-4 text-[11px] leading-relaxed text-syntax-muted">
                    <span className="text-syntax-text">const</span> note = capture(tab)
                  </div>
                </div>

                <div className="play-pulse relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-syntax-accent text-syntax-accent-fg shadow-[var(--syntax-glow-strong)]">
                  <span className="play-ring" />
                  <svg
                    aria-hidden="true"
                    className="ml-1 h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </div>
                <p className="relative z-10 text-xs font-medium text-syntax-muted">
                  Walkthrough video — coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
