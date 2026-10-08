import { createPolarCore } from '@polar-sh/sdk/2026-10';

export const polarAccessToken = process.env.POLAR_ACCESS_TOKEN ?? '';
export const polarWebhookSecret = process.env.POLAR_WEBHOOK_SECRET ?? '';
export const polarProductId = process.env.POLAR_PRODUCT_ID ?? '';
export const polarServer =
  process.env.POLAR_SERVER === 'sandbox' ? 'sandbox' : 'production';

export const isPolarEnabled = Boolean(polarAccessToken);
export const isPolarCheckoutEnabled = Boolean(polarAccessToken && polarProductId);

export const polarCore = createPolarCore({
  accessToken: polarAccessToken || 'missing',
  environment: polarServer,
});
