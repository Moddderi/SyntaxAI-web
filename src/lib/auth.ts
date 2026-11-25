import { creem } from '@creem_io/better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';
import { db } from './db';
import {
  creemReferenceUserId,
  getCreemApiKey,
  getCreemWebhookSecret,
  isCreemEnabled,
  isCreemTestMode,
} from './creem';
import { applyCreemAccess } from './plan';
import { account, session, user, verification } from './schema';
import { SITE_URL } from './site';

const authBaseUrl = process.env.BETTER_AUTH_URL ?? SITE_URL;

const creemPlugin = isCreemEnabled()
  ? creem({
      apiKey: getCreemApiKey(),
      webhookSecret: getCreemWebhookSecret() || undefined,
      testMode: isCreemTestMode(),
      defaultSuccessUrl: `${authBaseUrl}/account?checkout=success`,
      persistSubscriptions: false as const,
      onCheckoutCompleted: async ({ customer, metadata }) => {
        await applyCreemAccess({
          userId: creemReferenceUserId(metadata),
          plan: 'pro',
          creemCustomerId: customer?.id,
        });
      },
      onGrantAccess: async ({ customer, metadata, reason }) => {
        await applyCreemAccess({
          userId: creemReferenceUserId(metadata),
          plan: 'pro',
          creemCustomerId: customer.id,
          hadTrial: reason === 'subscription_trialing',
        });
      },
      onRevokeAccess: async ({ metadata }) => {
        await applyCreemAccess({
          userId: creemReferenceUserId(metadata),
          plan: 'free',
        });
      },
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
    'https://syntax-ai-web.vercel.app',
    'https://syntaxai.app',
    'https://www.syntaxai.app',
    'https://api.syntaxai.app',
    ...(process.env.RAILWAY_PUBLIC_DOMAIN
      ? [`https://${process.env.RAILWAY_PUBLIC_DOMAIN}`]
      : []),
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
  plugins: creemPlugin ? [creemPlugin, nextCookies()] : [nextCookies()],
});

export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}
