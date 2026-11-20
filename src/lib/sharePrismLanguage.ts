const PRISM_LANGUAGE_ALIASES: Record<string, string> = {
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'tsx',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'jsx',
  python: 'python',
  py: 'python',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  rs: 'rust',
  cpp: 'cpp',
  'c++': 'cpp',
  csharp: 'csharp',
  'c#': 'csharp',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  dart: 'dart',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  sql: 'sql',
  postgresql: 'sql',
  postgres: 'sql',
  html: 'markup',
  html5: 'markup',
  markup: 'markup',
  css: 'css',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  markdown: 'markdown',
  md: 'markdown',
  php: 'php',
  ruby: 'ruby',
  react: 'tsx',
  nextjs: 'tsx',
  vue: 'javascript',
  vuejs: 'javascript',
  svelte: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',
  docker: 'docker',
  dockerfile: 'docker',
  text: 'text',
};

const DEFAULT_PRISM_LANGUAGE = 'javascript';

export function resolveSharePrismLanguage(language?: string): string {
  if (!language || language.trim().length === 0) {
    return DEFAULT_PRISM_LANGUAGE;
  }

  const normalized = language.trim().toLowerCase().replace(/[^a-z0-9+#]+/g, '');
  return PRISM_LANGUAGE_ALIASES[normalized] ?? DEFAULT_PRISM_LANGUAGE;
}