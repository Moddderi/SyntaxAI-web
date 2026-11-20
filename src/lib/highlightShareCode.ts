import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import dart from 'highlight.js/lib/languages/dart';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

const LANGUAGE_ALIASES: Record<string, string> = {
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  python: 'python',
  py: 'python',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  rs: 'rust',
  kotlin: 'kotlin',
  kt: 'kotlin',
  java: 'java',
  swift: 'swift',
  dart: 'dart',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  sql: 'sql',
  postgresql: 'sql',
  postgres: 'sql',
  html: 'xml',
  html5: 'xml',
  xml: 'xml',
  markup: 'xml',
  css: 'css',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  markdown: 'markdown',
  md: 'markdown',
  php: 'php',
  ruby: 'ruby',
  react: 'typescript',
  nextjs: 'typescript',
  vue: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',
  docker: 'dockerfile',
  dockerfile: 'dockerfile',
  csharp: 'csharp',
  cs: 'csharp',
  cpp: 'cpp',
  cplusplus: 'cpp',
};

let registered = false;

function ensureLanguages(): void {
  if (registered) {
    return;
  }

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('python', python);
  hljs.registerLanguage('go', go);
  hljs.registerLanguage('rust', rust);
  hljs.registerLanguage('kotlin', kotlin);
  hljs.registerLanguage('java', java);
  hljs.registerLanguage('swift', swift);
  hljs.registerLanguage('dart', dart);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('yaml', yaml);
  hljs.registerLanguage('markdown', markdown);
  hljs.registerLanguage('php', php);
  hljs.registerLanguage('ruby', ruby);
  hljs.registerLanguage('dockerfile', dockerfile);
  hljs.registerLanguage('csharp', csharp);
  hljs.registerLanguage('cpp', cpp);
  registered = true;
}

export function resolveShareHighlightLanguage(language?: string): string {
  if (!language) {
    return 'plaintext';
  }

  const normalized = language.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  return LANGUAGE_ALIASES[normalized] ?? 'plaintext';
}

export function highlightShareCode(code: string, language?: string): string {
  ensureLanguages();
  const resolved = resolveShareHighlightLanguage(language);

  if (resolved !== 'plaintext' && hljs.getLanguage(resolved)) {
    return hljs.highlight(code, { language: resolved, ignoreIllegals: true }).value;
  }

  return hljs.highlightAuto(code).value;
}