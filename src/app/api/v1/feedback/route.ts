import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { enforceRateLimit, FEEDBACK_RATE_LIMITS } from '@/lib/rate-limit';
import {
  feedbackRequestSchema,
  sendFeedbackEmail,
  validateFeedbackPayload,
} from '@/lib/feedback';

export const runtime = 'nodejs';

export function OPTIONS() {
  return extensionOptions();
}

export async function POST(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('feedback', user.id, FEEDBACK_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return extensionJson({ error: 'Invalid JSON' }, 400);
  }

  const parsed = feedbackRequestSchema.safeParse(body);
  if (!parsed.success) {
    return extensionJson(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      400,
    );
  }

  const validationError = validateFeedbackPayload(parsed.data);
  if (validationError) {
    return extensionJson({ error: validationError }, 400);
  }

  try {
    await sendFeedbackEmail({
      payload: parsed.data,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    return extensionJson({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send feedback';

    if (message.includes('RESEND_API_KEY')) {
      return extensionJson({ error: 'Feedback is temporarily unavailable.' }, 503);
    }

    console.error('[SyntaxAI] feedback send failed', error);

    // Surface Resend config issues (unverified domain, invalid from, etc.)
    const isConfigHint =
      /domain|verified|from|sender|invalid|not allowed|forbidden/i.test(message);

    return extensionJson(
      {
        error: isConfigHint
          ? message
          : 'Failed to send feedback.',
      },
      502,
    );
  }
}
