export type AiLocale = 'en' | 'uk';

// Mirrors the extension's tech catalog (src/utils/techCatalog.ts) so AI slugs map to icons.
const LANGUAGE_SLUGS =
  'javascript, typescript, python, java, kotlin, swift, csharp, cplusplus, c, go, rust, php, ruby, dart, scala, elixir, haskell, lua, r, perl, bash, powershell, sql, html5, css3, sass, yaml, json, toml, xml, graphql, solidity, objectivec, julia, clojure, fsharp, ocaml, erlang, groovy, matlab, latex, assembly, zig';

const STACK_SLUGS =
  'react, nextjs, remix, gatsby, reactnative, expo, vuejs, nuxtjs, angular, svelte, solidjs, astro, htmx, alpinejs, jquery, redux, zustand, mobx, tanstack-query, rxjs, zod, trpc, prisma, drizzle, typeorm, sequelize, mongoose, sqlalchemy, tailwindcss, bootstrap, materialui, chakraui, shadcn, styledcomponents, axios, lodash, socketio, threejs, d3js, nodejs, denojs, bun, express, fastify, hono, nestjs, django, djangorest, flask, fastapi, spring, laravel, symfony, wordpress, rails, dotnetcore, unity, flutter, jetpackcompose, android, swiftui, electron, tauri, vitejs, webpack, jest, vitest, playwright, cypressio, pytest, eslint, npm, yarn, pnpm, git, githubactions, docker, kubernetes, helm, terraform, ansible, nginx, amazonwebservices, azure, googlecloud, firebase, supabase, vercel, cloudflare, postgresql, mysql, sqlite, microsoftsqlserver, oracle, mongodb, redis, pandas, numpy, matplotlib, pytorch, tensorflow, scikitlearn, opencv, jupyter, streamlit, huggingface, selenium, openapi';

const TECH_SLUG_EXAMPLES = `Languages: ${LANGUAGE_SLUGS}\nFrameworks, libraries and tools: ${STACK_SLUGS}`;

function outputLanguageRule(locale: AiLocale): string {
  if (locale === 'uk') {
    return 'Write all human-readable text fields (title, summary, suggestedTitle, formattedNote) in Ukrainian. Do not use Russian.';
  }

  return 'Write all human-readable text fields (title, summary, suggestedTitle, formattedNote) in English. Do not use Russian.';
}

export function buildSnippetAnalyzerSystemPrompt(locale: AiLocale): string {
  const outputLanguage = outputLanguageRule(locale);

  return `You are SyntaxAI, a developer snippet analyzer for a Chrome extension notebook.

Analyze the user input and return JSON only (no markdown).

Separate the stack into three fields:

1. "primaryTech" — main framework, library, or tool slug for the card icon.
   Examples: redux, react, nextjs, django, docker, prisma, python (when plain script).
   Priority: framework > meta-framework > library/tool > base language when nothing else applies.

2. "language" — base programming language slug ONLY (not frameworks).
   Examples: typescript, javascript, python, go, rust, cplusplus, java, bash.
   Use typescript vs javascript based on syntax (types/interfaces → typescript).

3. "topics" — 1 to 3 contextual task tags WITHOUT language or framework names.
   Good: "auth", "state-management", "http-request", "hooks", "middleware", "pagination"
   Bad: "typescript", "react", "python", "redux", "#js", "javascript"

4. "summary" — 1-2 short sentences explaining what the code does or the task context.

Preferred slugs (use these exact spellings when they fit):
${TECH_SLUG_EXAMPLES}
- You MAY return ANY lowercase slug for primaryTech and language when nothing above fits.
- "language" must be one of the Languages above whenever possible (html5 / css3 for markup and styles, sql for queries, yaml for configs).
- "primaryTech" must be the most SPECIFIC stack: nextjs over react, nestjs over nodejs, tailwindcss over css3, prisma over typescript.

Intent recognition:
1. Raw code: extract title, primaryTech, language, topics, and code.
2. Natural language (e.g. "save react auth hook"): infer from intent.
3. Image(s): OCR into "code", then detect all fields from extracted code.

Output schema:
{
  "title": "string",
  "primaryTech": "string",
  "language": "string",
  "topics": ["auth", "state-management"],
  "summary": "string",
  "code": "string"
}

Requirements:
- All slugs lowercase, no # prefix in topics.
- topics must describe WHAT the snippet does, not WHICH stack it uses.
- ${outputLanguage}
- "code" = final snippet from input or OCR, empty string if none.`;
}

export function buildMixedContentSystemPrompt(locale: AiLocale): string {
  const outputLanguage = outputLanguageRule(locale);

  return `You are SyntaxAI, an AI assistant for developers. You receive a selected fragment from documentation or a website with text rules and code blocks.

Return STRICTLY JSON without markdown wrappers (no \`\`\`json) with this structure:
{
  "suggestedTitle": "Concise note title",
  "formattedNote": "Full structured note text in Markdown, including rules, bullets, and descriptions",
  "primaryCode": "Main extracted code block (if any)",
  "primaryTech": "most specific framework/library/tool slug for the icon (react, nextjs, docker, postgresql, python when plain script)",
  "language": "base programming language slug (javascript, typescript, python, go, rust, sql, bash, html5, css3, yaml, etc.)",
  "tags": ["array", "of", "tags", "without-hash"]
}

Rules:
1. Do not drop important context (versions, API rules, warnings from the text).
2. If there are multiple code blocks — merge or put the main one in primaryCode; keep others inside formattedNote.
3. tags — task context only, not language or framework names.
   primaryTech and language use these slugs where they fit.
   Languages: ${LANGUAGE_SLUGS}
   Frameworks, libraries and tools: ${STACK_SLUGS}
   Choose the MOST SPECIFIC stack (nextjs over react, tailwindcss over css3). Judge by the code AND the page URL/title (e.g. docs.docker.com => docker).
4. formattedNote must be ready to save as a developer markdown note.
5. ${outputLanguage}
6. Preserve technical terms and API names from the source; translate explanatory prose only.`;
}

export function buildMixedContentUserPrompt(locale: AiLocale): string {
  if (locale === 'uk') {
    return 'Проаналізуй виділений фрагмент сторінки та підготуй нотатку для бази знань розробника.';
  }

  return 'Analyze the selected page fragment and prepare a note for the developer knowledge base.';
}
