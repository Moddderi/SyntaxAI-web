import Image from 'next/image';
import { TiltFrame } from '@/components/motion/TiltFrame';
import { HERO_VIDEO_URL, SHOTS } from '@/lib/site';

function ChipJs() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7df1e] font-mono text-[13px] font-extrabold text-black">
      JS
    </span>
  );
}

function ChipReact() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black">
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" fill="#61DAFB" r="2" />
        {[0, 60, 120].map((deg) => (
          <ellipse
            cx="12"
            cy="12"
            fill="none"
            key={deg}
            rx="10"
            ry="4"
            stroke="#61DAFB"
            strokeWidth="1.3"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      </svg>
    </span>
  );
}

function ChipTs() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3178c6] font-mono text-[13px] font-extrabold text-white">
      TS
    </span>
  );
}

export function HeroShowcase() {
  const { library, sidepanel } = SHOTS;

  return (
    <div className="hero-enter hero-enter-5 relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-white/[0.07] blur-3xl" />

      <TiltFrame className="relative">
        {/* main window */}
        <div className="hero-frame relative rounded-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-syntax-border bg-syntax-card shadow-[0_40px_90px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2 border-b border-syntax-border bg-[var(--syntax-code-header)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 truncate rounded-lg border border-syntax-border bg-syntax-bg px-3 py-1 font-mono text-[11px] text-syntax-muted">
                SyntaxAI — Developer notebook
              </div>
            </div>

            <div className="relative bg-syntax-bg">
              {HERO_VIDEO_URL ? (
                <video
                  autoPlay
                  className="aspect-[1500/951] w-full object-cover"
                  loop
                  muted
                  playsInline
                  src={HERO_VIDEO_URL}
                />
              ) : (
                <Image
                  alt={library.alt}
                  className="h-auto w-full"
                  fetchPriority="high"
                  height={library.height}
                  loading="eager"
                  sizes="(min-width: 1024px) 620px, 100vw"
                  src={library.src}
                  width={library.width}
                />
              )}
              <span aria-hidden className="feature-shot__scan" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>
        </div>

        {/* floating side panel */}
        <div className="hero-float hero-float--a absolute -bottom-10 -left-3 w-[27%] max-w-[168px] sm:-left-8 lg:[transform:translateZ(70px)]">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_28px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)]">
            <Image
              alt={sidepanel.alt}
              className="h-auto w-full"
              height={sidepanel.height}
              loading="eager"
              sizes="170px"
              src={sidepanel.src}
              width={sidepanel.width}
            />
          </div>
        </div>

        {/* floating chips */}
        <div
          className="hero-float hero-float--b absolute -top-5 right-6 hidden items-center gap-2 rounded-xl border border-white/15 bg-black/80 p-2 pr-3 shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur sm:flex lg:[transform:translateZ(50px)]"
        >
          <ChipReact />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-syntax-text">React hooks</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-syntax-muted">
              auto-tagged
            </p>
          </div>
        </div>

        <div className="hero-float hero-float--c absolute -right-3 top-[38%] hidden rounded-xl border border-white/15 bg-black/80 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur md:block lg:[transform:translateZ(40px)]">
          <ChipJs />
        </div>

        <div className="hero-float hero-float--d absolute -bottom-6 right-8 hidden rounded-xl border border-white/15 bg-black/80 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur md:block lg:[transform:translateZ(60px)]">
          <ChipTs />
        </div>
      </TiltFrame>
    </div>
  );
}
