import { MARQUEE_ROW_A, MARQUEE_ROW_B, TechIcon, type Tech } from '@/lib/techIcons';

function Chip({ tech }: { tech: Tech }) {
  return (
    <li
      className="tech-chip flex items-center gap-2.5 rounded-2xl border border-syntax-border bg-syntax-card/80 py-2.5 pl-3 pr-5 backdrop-blur"
      style={{ '--tc': tech.color } as React.CSSProperties}
    >
      <span className="tech-chip__icon flex h-8 w-8 items-center justify-center rounded-xl border border-syntax-border bg-black">
        <TechIcon className="h-[18px] w-[18px]" tech={tech} />
      </span>
      <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-syntax-text">
        {tech.name}
      </span>
    </li>
  );
}

function Row({ items, hidden = false }: { items: Tech[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((tech) => (
        <Chip key={tech.name} tech={tech} />
      ))}
    </ul>
  );
}

function Lane({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  return (
    <div className="marquee marquee-mask">
      <div className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}>
        <Row items={items} />
        <Row hidden items={items} />
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies SyntaxAI recognizes" className="relative py-12">
      <p className="mb-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-syntax-muted">
        <span className="text-syntax-brand">●</span> Recognizes your stack automatically
      </p>
      <div className="space-y-3">
        <Lane items={MARQUEE_ROW_A} />
        <Lane items={MARQUEE_ROW_B} reverse />
      </div>
    </section>
  );
}
