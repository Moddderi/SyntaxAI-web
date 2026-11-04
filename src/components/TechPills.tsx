import { TECHS, TechIcon } from '@/lib/techIcons';

const PILLS = [
  TECHS.react,
  TECHS.typescript,
  TECHS.javascript,
  TECHS.python,
  TECHS.go,
  TECHS.rust,
  TECHS.node,
  TECHS.nextjs,
  TECHS.vue,
  TECHS.postgres,
  TECHS.docker,
  TECHS.tailwind,
];

export function TechPills({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {PILLS.map((tech) => (
        <span
          className="tech-chip inline-flex items-center gap-2 rounded-lg border border-syntax-border bg-syntax-bg px-2.5 py-1.5 text-[12px] font-medium text-syntax-text"
          key={tech.name}
          style={{ '--tc': tech.color } as React.CSSProperties}
        >
          <TechIcon className="h-4 w-4" tech={tech} />
          {tech.name}
        </span>
      ))}
      <span className="inline-flex items-center rounded-lg border border-dashed border-syntax-border px-2.5 py-1.5 text-[12px] text-syntax-muted">
        and more…
      </span>
    </div>
  );
}
