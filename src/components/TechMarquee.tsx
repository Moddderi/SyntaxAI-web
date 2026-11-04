import { STACK_MARQUEE } from '@/lib/site';

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {STACK_MARQUEE.map((name) => (
        <li
          className="rounded-full border border-syntax-border bg-syntax-card/70 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-syntax-muted transition-colors duration-300 hover:border-white/30 hover:text-syntax-text"
          key={name}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies SyntaxAI recognizes" className="relative py-10">
      <p className="mb-5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-syntax-muted">
        Recognizes your stack automatically
      </p>
      <div className="marquee marquee-mask group">
        <div className="marquee__track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
