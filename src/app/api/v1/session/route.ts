import type { NextRequest } from 'next/server';
import {
  authenticateExtension,
  extensionJson,
  extensionOptions,
} from '@/lib/extension-api';
import { planForAccount } from '@/lib/plan';
import { enforceRateLimit, SESSION_RATE_LIMITS } from '@/lib/rate-limit';
import { FREE_LIMITS, isBillingEnabled } from '@/lib/site';

export const runtime = 'nodejs';

export function OPTIONS() {
  return extensionOptions();
}

export async function GET(request: NextRequest) {
  const user = await authenticateExtension(request);
  if (!user) {
    return extensionJson({ error: 'Unauthorized' }, 401);
  }

  const limited = enforceRateLimit('session', user.id, SESSION_RATE_LIMITS);
  if (limited) {
    return limited;
  }

  const plan = planForAccount(user.email, user.plan);

  return extensionJson({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      plan,
    },
    billing: {
      enabled: isBillingEnabled,
      limits: isBillingEnabled ? FREE_LIMITS : null,
    },
    sync: {
      notesPath: '/api/v1/notes',
      strategy: 'local-first',
    },
    ai: {
      analyzeSnippetPath: '/api/v1/ai/analyze-snippet',
      analyzeMixedPath: '/api/v1/ai/analyze-mixed',
    },
    support: {
      feedbackPath: '/api/v1/feedback',
    },
  });
}
