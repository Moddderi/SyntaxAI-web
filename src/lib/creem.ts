export function getCreemApiKey() {
  return process.env.CREEM_API_KEY ?? '';
}

export function getCreemWebhookSecret() {
  return process.env.CREEM_WEBHOOK_SECRET ?? '';
}

export function getCreemProductId() {
  return process.env.CREEM_PRODUCT_ID ?? '';
}

export function isCreemTestMode() {
  return process.env.CREEM_TEST_MODE === 'true';
}

export function isCreemEnabled() {
  return Boolean(getCreemApiKey());
}

export function isCreemCheckoutEnabled() {
  return Boolean(getCreemApiKey() && getCreemProductId());
}

export function getCreemServerConfig() {
  return {
    apiKey: getCreemApiKey(),
    testMode: isCreemTestMode(),
  };
}

export function creemReferenceUserId(
  metadata?: Record<string, string | number | null>,
): string | null {
  const value = metadata?.referenceId;
  return typeof value === 'string' && value.length > 0 ? value : null;
}
