const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o-mini';

export class OpenAiProxyError extends Error {
  readonly status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = 'OpenAiProxyError';
    this.status = status;
  }
}

type OpenAiTextPart = { type: 'text'; text: string };
type OpenAiImagePart = { type: 'image_url'; image_url: { url: string } };
export type OpenAiContentPart = OpenAiTextPart | OpenAiImagePart;

export type OpenAiMessage =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string | OpenAiContentPart[] };

interface OpenAiChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
}

function getOpenAiApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new OpenAiProxyError('AI is not configured on the server.', 503);
  }
  return key;
}

export async function createJsonChatCompletion(
  messages: OpenAiMessage[],
  temperature = 0.2,
): Promise<string> {
  const apiKey = getOpenAiApiKey();

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      response_format: { type: 'json_object' },
      messages,
      temperature,
    }),
  });

  const payload = (await response.json()) as OpenAiChatCompletionResponse;

  if (!response.ok) {
    const message =
      payload.error?.message ?? `OpenAI request failed with status ${response.status}.`;

    // Never forward OpenAI auth/forbidden statuses to the extension — they look like
    // client auth failures. Rate limits stay 429; other upstream 4xx become 502.
    if (response.status === 429) {
      throw new OpenAiProxyError(message, 429);
    }

    throw new OpenAiProxyError(message, 502);
  }

  const content = payload.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new OpenAiProxyError('OpenAI returned an empty response.', 502);
  }

  return content;
}
