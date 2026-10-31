import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { buildSnippetAnalyzerSystemPrompt } from '@/lib/ai-prompts';
import { analyzeSnippetRequestSchema, rawSnippetResultSchema } from '@/lib/ai-types';
import {
  createJsonChatCompletion,
  OpenAiProxyError,
  type OpenAiContentPart,
} from '@/lib/openai';

export const runtime = 'nodejs';
export const maxDuration = 60;

export function OPTIONS() {
  return extensionOptions();
}

function buildUserContent(
  promptOrCode: string,
  imagesBase64?: string[],
): OpenAiContentPart[] {
  const content: OpenAiContentPart[] = [];

  if (promptOrCode.trim()) {
    content.push({ type: 'text', text: promptOrCode.trim() });
  }

  if (imagesBase64) {
    for (const dataUrl of imagesBase64) {
      content.push({
        type: 'image_url',
        image_url: { url: dataUrl },
      });
    }
  }

  return content;
}

export async function POST(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = analyzeSnippetRequestSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      400,
    );
  }

  const { locale, promptOrCode, imagesBase64 } = parsed.data;

  try {
    const content = await createJsonChatCompletion([
      { role: 'system', content: buildSnippetAnalyzerSystemPrompt(locale) },
      { role: 'user', content: buildUserContent(promptOrCode, imagesBase64) },
    ]);

    let json: unknown;
    try {
      json = JSON.parse(content) as unknown;
    } catch {
      return extensionJson({ error: 'AI returned invalid JSON.' }, 502);
    }

    const result = rawSnippetResultSchema.safeParse(json);
    if (!result.success) {
      return extensionJson({ error: 'AI JSON does not match the expected schema.' }, 502);
    }

    return extensionJson({ result: result.data });
  } catch (error) {
    if (error instanceof OpenAiProxyError) {
      return extensionJson({ error: error.message }, error.status);
    }
    return extensionJson({ error: 'AI request failed.' }, 502);
  }
}
