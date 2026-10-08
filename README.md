# SyntaxAI Web

Marketing site and account/billing API for the SyntaxAI Chrome extension.

## Pages

- `/` — Landing
- `/pricing` — Free vs Pro (Polar checkout)
- `/auth/signin` — Google or GitHub sign-in
- `/account` — Plan and Polar customer portal
- `/privacy` — Privacy policy
- `/terms` — Terms of service

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local`, then push the schema to Neon:

```bash
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Accounts and Polar

1. **Neon** — create a project, copy `DATABASE_URL`, run `npm run db:push`.
2. **Better Auth** — `openssl rand -base64 32` → `BETTER_AUTH_SECRET`. Set `BETTER_AUTH_URL` to the public site URL.
3. **Google Cloud** — OAuth client type Web. Origins: `http://localhost:3000` and `https://syntaxai-web.vercel.app`. Redirects: `{origin}/api/auth/callback/google`.
4. **GitHub** — OAuth App. Callback: `{origin}/api/auth/callback/github`. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (button hidden until client id is set).
5. **Polar** — create a recurring Pro product at `$3.49/mo`. Copy product id + organization access token. Webhook URL: `https://syntaxai-web.vercel.app/api/auth/polar/webhooks` (subscribe to subscription events). Use `POLAR_SERVER=sandbox` with sandbox credentials while testing.

When `syntaxai.app` is connected later, change `NEXT_PUBLIC_SITE_URL` / `BETTER_AUTH_URL` and update Google + Polar URLs.

## Deploy (Vercel)

1. Import the GitHub repo
2. Set the same environment variables as `.env.example` (use the production Vercel URL until the custom domain exists)
3. Redeploy after env changes

`GET /api/me` returns `{ email, name, plan }` for a cookie session or `Authorization: Bearer` device token. Extension pairing is the next phase.

## Extension integration

The SyntaxAI extension still links Upgrade to `https://syntaxai.app/pricing`. That URL stays dead until the custom domain is attached. The site checkout is live on the current Vercel URL.
