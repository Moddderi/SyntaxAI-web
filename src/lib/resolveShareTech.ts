import { TECHS, type Tech } from './techIcons';

const SLUG_ALIASES: Record<string, keyof typeof TECHS> = {
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  react: 'react',
  reactjs: 'react',
  nextjs: 'nextjs',
  next: 'nextjs',
  vue: 'vue',
  vuejs: 'vue',
  angular: 'angular',
  python: 'python',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  node: 'node',
  nodejs: 'node',
  kotlin: 'kotlin',
  java: 'java',
  csharp: 'dotnet',
  dotnet: 'dotnet',
  php: 'php',
  swift: 'swift',
  svelte: 'svelte',
  docker: 'docker',
  tailwind: 'tailwind',
  tailwindcss: 'tailwind',
  postgres: 'postgres',
  postgresql: 'postgres',
};

export function resolveShareTech(slug: string): Tech | null {
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  const key = SLUG_ALIASES[normalized];
  return key ? TECHS[key] : null;
}