import {
  siAngular,
  siDocker,
  siDotnet,
  siGo,
  siJavascript,
  siKotlin,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siSvelte,
  siSwift,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons';

export interface Tech {
  name: string;
  path: string;
  color: string;
}

function make(icon: SimpleIcon, name: string, color?: string): Tech {
  return { name, path: icon.path, color: color ?? `#${icon.hex}` };
}

/**
 * Brand icons (simple-icons). Near-black brand colors are lifted so they read on a black UI.
 */
export const TECHS = {
  typescript: make(siTypescript, 'TypeScript'),
  react: make(siReact, 'React'),
  javascript: make(siJavascript, 'JavaScript'),
  python: make(siPython, 'Python', '#4B8BBE'),
  nextjs: make(siNextdotjs, 'Next.js', '#FFFFFF'),
  go: make(siGo, 'Go'),
  rust: make(siRust, 'Rust', '#F46623'),
  vue: make(siVuedotjs, 'Vue'),
  angular: make(siAngular, 'Angular', '#DD0031'),
  node: make(siNodedotjs, 'Node.js'),
  postgres: make(siPostgresql, 'PostgreSQL'),
  docker: make(siDocker, 'Docker'),
  tailwind: make(siTailwindcss, 'Tailwind'),
  svelte: make(siSvelte, 'Svelte'),
  java: make(siOpenjdk, 'Java', '#F89820'),
  dotnet: make(siDotnet, '.NET', '#7C5CFF'),
  kotlin: make(siKotlin, 'Kotlin'),
  swift: make(siSwift, 'Swift'),
  php: make(siPhp, 'PHP', '#8892BF'),
} as const;

export const MARQUEE_ROW_A: Tech[] = [
  TECHS.typescript,
  TECHS.react,
  TECHS.python,
  TECHS.nextjs,
  TECHS.go,
  TECHS.rust,
  TECHS.vue,
  TECHS.angular,
  TECHS.node,
  TECHS.postgres,
];

export const MARQUEE_ROW_B: Tech[] = [
  TECHS.docker,
  TECHS.tailwind,
  TECHS.svelte,
  TECHS.java,
  TECHS.dotnet,
  TECHS.kotlin,
  TECHS.swift,
  TECHS.php,
  TECHS.javascript,
];

export function TechIcon({ tech, className = 'h-5 w-5' }: { tech: Tech; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={tech.color}
      role="img"
      viewBox="0 0 24 24"
    >
      <path d={tech.path} />
    </svg>
  );
}
