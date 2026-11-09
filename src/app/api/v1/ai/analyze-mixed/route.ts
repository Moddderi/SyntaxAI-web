import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import {
  buildMixedContentSystemPrompt,
  buildMixedContentUserPrompt,
  type AiLocale,
} from '@/lib/ai-prompts';
import {
  analyzeMixedRequestSchema,
  rawMixedResultSchema,
  type AnalyzeMixedRequest,
} from '@/lib/ai-types';
import { createJsonChatCompletion, OpenAiProxyError } from '@/lib/openai';
import { AI_RATE_LIMITS, enforceRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 60;

export function OPTIONS() {
  return extensionOptions();
}

function buildMixedContentUserMessage(
  pageContext: AnalyzeMixedRequest['pageContext'],
  locale: AiLocale,
): string {
  const descriptionLine = pageContext.metaDescription
    ? `- Description: ${pageContext.metaDescription}`
    : '';

  return [
    buildMixedContentUserPrompt(locale),
    '',
    'Page context:',
    `- Site type: ${pageContext.siteType}`,
    `- URL: ${pageContext.url}`,
    `- Page title: ${pageContext.pageTitle}`,
    descriptionLine,
    '',
    'Selected content (Markdown, preserve structure):',
    pageContext.rawContent,
  ]
    .filter(Boolean)
    .join('\n');
}

function normalizeMixedRaw(raw: {
  suggestedTitle?: string;
  title?: string;
  formattedNote?: string;
  note?: string;
  summary?: string;
  primaryCode?: string;
  code?: string;
  language?: string;
  primaryTech?: string;
  tags?: string[];
}): {
  suggestedTitle: string;
  formattedNote: string;
  primaryCode: string;
  language: string;
  primaryTech?: string;
  tags: string[];
} | null {
  const suggestedTitle = raw.suggestedTitle ?? raw.title ?? null;
  const formattedNote = raw.formattedNote ?? raw.note ?? raw.summary ?? null;
  const primaryCode = raw.primaryCode ?? raw.code ?? '';
  const hasNoteBody = Boolean(formattedNote?.trim());
  const hasCode = Boolean(primaryCode.trim());

  if (!suggestedTitle && !hasNoteBody && !hasCode) {
    return null;
  }

  return {
    suggestedTitle: suggestedTitle ?? '',
    formattedNote: formattedNote ?? '',
    primaryCode,
    // The extension re-detects from the text; 'javascript' is only the last-resort default.
    language: raw.language?.trim().toLowerCase() || 'javascript',
    ...(raw.primaryTech?.trim() ? { primaryTech: raw.primaryTech.trim().toLowerCase() } : {}),
    tags: (raw.tags ?? []).filter((tag): tag is string => typeof tag === 'string'),
  };
}

export async function POST(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('ai', user.id, AI_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = analyzeMixedRequestSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      400,
    );
  }

  const { locale, pageContext } = parsed.data;

  try {
    const content = await createJsonChatCompletion([
      { role: 'system', content: buildMixedContentSystemPrompt(locale) },
      { role: 'user', content: buildMixedContentUserMessage(pageContext, locale) },
    ]);

    let json: unknown;
    try {
      json = JSON.parse(content) as unknown;
    } catch {
      return extensionJson({ error: 'AI returned invalid JSON.' }, 502);
    }

    const raw = rawMixedResultSchema.safeParse(json);
    if (!raw.success) {
      return extensionJson({ error: 'AI JSON does not match the expected schema.' }, 502);
    }

    const result = normalizeMixedRaw(raw.data);
    if (!result) {
      return extensionJson(
        { error: 'AI could not structure the selection. Edit fields manually and save.' },
        422,
      );
    }

    return extensionJson({ result });
  } catch (error) {
    if (error instanceof OpenAiProxyError) {
      return extensionJson({ error: error.message }, error.status);
    }
    return extensionJson({ error: 'AI request failed.' }, 502);
  }
}
