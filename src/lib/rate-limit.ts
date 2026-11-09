import { extensionJson } from '@/lib/extension-api';

interface WindowState {
  count: number;
  resetAt: number;
}

export interface RateLimitRule {
  /** Max requests allowed inside the window. */
  limit: number;
  windowMs: number;
}

/**
 * In-memory fixed-window limiter. The API runs as a single Railway instance,
 * so a process-local map is sufficient for the beta. Swap for Redis/Upstash
 * before scaling horizontally.
 */
const buckets = new Map<string, WindowState>();
const MAX_BUCKETS = 50_000;
let lastSweepAt = 0;

function sweep(now: number): void {
  if (now - lastSweepAt < 60_000 && buckets.size < MAX_BUCKETS) {
    return;
  }

  lastSweepAt = now;

  for (const [key, state] of buckets) {
    if (state.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  scope: string,
  subject: string,
  rule: RateLimitRule,
  now: number = Date.now(),
): RateLimitResult {
  sweep(now);

  const key = `${scope}:${subject}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= rule.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test helper — clears all counters. */
export function resetRateLimits(): void {
  buckets.clear();
  lastSweepAt = 0;
}

/**
 * Returns a 429 Response when any rule is exceeded, otherwise null.
 * Rules are evaluated in order; the first violated rule wins.
 */
export function enforceRateLimit(
  scope: string,
  subject: string,
  rules: readonly RateLimitRule[],
): Response | null {
  for (const [index, rule] of rules.entries()) {
    const result = checkRateLimit(`${scope}:${index}`, subject, rule);

    if (!result.allowed) {
      const response = extensionJson(
        {
          error: 'Too many requests. Please wait a moment and try again.',
          retryAfterSeconds: result.retryAfterSeconds,
        },
        429,
      );
      response.headers.set('Retry-After', String(result.retryAfterSeconds));
      return response;
    }
  }

  return null;
}

export const AI_RATE_LIMITS: readonly RateLimitRule[] = [
  { limit: 20, windowMs: 60_000 },
  { limit: 300, windowMs: 24 * 60 * 60_000 },
];

export const FEEDBACK_RATE_LIMITS: readonly RateLimitRule[] = [
  { limit: 5, windowMs: 10 * 60_000 },
  { limit: 20, windowMs: 24 * 60 * 60_000 },
];

export const NOTES_RATE_LIMITS: readonly RateLimitRule[] = [{ limit: 120, windowMs: 60_000 }];

export const PROFILE_RATE_LIMITS: readonly RateLimitRule[] = [{ limit: 10, windowMs: 60_000 }];
