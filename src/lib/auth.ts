import { polar, checkout, portal, webhooks } from '@polar-sh/better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';
import { db } from './db';
import {
  isPolarEnabled,
  polarCore,
  polarProductId,
  polarWebhookSecret,
} from './polar';
import { setUserPlanFromExternalId } from './plan';
import { account, session, user, verification } from './schema';
import { SITE_URL } from './site';

const authBaseUrl = process.env.BETTER_AUTH_URL ?? SITE_URL;

const polarPlugin = isPolarEnabled
  ? polar({
      client: polarCore,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: polarProductId
            ? [{ productId: polarProductId, slug: 'pro' }]
            : [],
          successUrl: `${authBaseUrl}/account?checkout=success`,
          returnUrl: `${authBaseUrl}/pricing`,
          authenticatedUsersOnly: true,
          theme: 'dark',
        }),
        portal({
          returnUrl: `${authBaseUrl}/account`,
          theme: 'dark',
        }),
        webhooks({
          secret: polarWebhookSecret || 'missing',
          onSubscriptionActive: async (payload) => {
            await setUserPlanFromExternalId(payload.data.customer.external_id, 'pro');
          },
          onSubscriptionUncanceled: async (payload) => {
            await setUserPlanFromExternalId(payload.data.customer.external_id, 'pro');
          },
          onSubscriptionRevoked: async (payload) => {
            await setUserPlanFromExternalId(payload.data.customer.external_id, 'free');
          },
        }),
      ],
    })
  : null;

export const auth = betterAuth({
  appName: 'SyntaxAI',
  baseURL: authBaseUrl,
  secret: process.env.BETTER_AUTH_SECRET ?? 'build-placeholder-secret-min-32-chars',
  trustedOrigins: [
    SITE_URL,
    authBaseUrl,
    'http://localhost:3000',
    'https://syntaxai-web.vercel.app',
  ],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification },
    transaction: false,
  }),
  user: {
    additionalFields: {
      plan: {
        type: 'string',
        required: true,
        defaultValue: 'free',
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
  plugins: polarPlugin ? [polarPlugin, nextCookies()] : [nextCookies()],
});

export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}
