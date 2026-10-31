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
3. **Google Cloud** — OAuth client type Web. Origins: `http://localhost:3000` and `https://syntaxai.app`. Redirects: `{origin}/api/auth/callback/google`.
4. **GitHub** — OAuth App. Homepage `https://syntaxai.app`. Callback: `{origin}/api/auth/callback/github`. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (button hidden until client id is set).
5. **Polar** — create a recurring Pro product at `$3.49/mo`. Copy product id + organization access token. Webhook URL: `https://syntaxai.app/api/auth/polar/webhooks` (subscribe to subscription events). Use `POLAR_SERVER=sandbox` with sandbox credentials while testing.

## Deploy (Vercel)

1. Import the GitHub repo
2. Set the same environment variables as `.env.example` (use the production Vercel URL until the custom domain exists)
3. Redeploy after env changes

## Custom domain: Cloudflare + Vercel (`syntaxai.app`)

Do this in order. DNS lives in **Cloudflare**; the app runs on **Vercel**.

### 1. Vercel — add the domain

1. [Vercel](https://vercel.com) → project **syntaxai-web** → **Settings** → **Domains**
2. Add **`syntaxai.app`** and **`www.syntaxai.app`**
3. Set one as **primary** (usually apex `syntaxai.app`; redirect `www` → apex in Vercel if you want)

Vercel will show which DNS records it expects. Typical setup:

| Type | Name | Value | Proxy (Cloudflare) |
|------|------|--------|------------------|
| `A` | `@` | `76.76.21.21` | DNS only (grey cloud) recommended first |
| `CNAME` | `www` | `cname.vercel-dns.com` | DNS only |

### 2. Cloudflare — DNS records

1. **Cloudflare** → zone **syntaxai.app** → **DNS** → **Records**
2. Remove conflicting `A` / `CNAME` for `@` and `www` if they point elsewhere
3. Add the records from the table above (or exactly what Vercel shows)
4. **SSL/TLS** → **Overview** → **Full (strict)** (after Vercel issues its cert)
5. For first connect, use **DNS only** (grey cloud) on those records; turn orange proxy on later if you need Cloudflare CDN/WAF

Wait 5–30 minutes. In Vercel, both domains should show **Valid Configuration**.

### 3. Vercel — production env

**Settings** → **Environment Variables** (Production):

```env
NEXT_PUBLIC_SITE_URL=https://syntaxai.app
BETTER_AUTH_URL=https://syntaxai.app
```

Redeploy **Production** (Deployments → … → Redeploy).

### 4. OAuth and billing URLs

Update every provider to use `https://syntaxai.app` (keep `http://localhost:3000` for local dev):

- **Google** — Authorized JavaScript origins: `https://syntaxai.app`  
  Redirect URI: `https://syntaxai.app/api/auth/callback/google`
- **GitHub** — Homepage: `https://syntaxai.app`  
  Callback: `https://syntaxai.app/api/auth/callback/github`
- **Polar** — Webhook: `https://syntaxai.app/api/auth/polar/webhooks`

### 5. Smoke test

- `https://syntaxai.app` loads with valid HTTPS
- Sign in with Google/GitHub
- `/account` after login
- Optional: `www` redirects to apex (or the reverse), per your Vercel domain settings

## Extension API (v1)

Base URL: `NEXT_PUBLIC_SITE_URL` (e.g. `https://syntaxai.app`). All extension routes send CORS headers for `chrome-extension://` origins configured in Better Auth `trustedOrigins`.

### Auth flow

1. User opens `/auth/extension` (or completes sign-in) in a tab the extension opened.
2. Page `POST /api/device-token` with **cookies** → `{ token, expiresAt, userId }` (`sat_…`, ~1 year).
3. Page posts to the extension via `window.postMessage`:

```json
{
  "source": "syntaxai-web",
  "type": "syntaxai:auth",
  "version": 1,
  "token": "sat_…",
  "expiresAt": "ISO-8601",
  "userId": "…"
}
```

4. Extension stores the token and sends `Authorization: Bearer sat_…` on API calls.

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/session` | User id, plan, `billing.enabled`, sync hints |
| `GET` | `/api/me` | Lightweight profile (same Bearer) |
| `GET` | `/api/v1/notes?since=` | Pull notes changed after `since` (ISO); omit for full set |
| `POST` | `/api/v1/notes` | Push batch from extension |
| `POST` | `/api/v1/ai/analyze-snippet` | Snippet / OCR analysis (server OpenAI key) |
| `POST` | `/api/v1/ai/analyze-mixed` | Page-context mixed note analysis |

### AI proxy

Requires `Authorization: Bearer sat_…` and server env `OPENAI_API_KEY` (never `NEXT_PUBLIC_*`).

`POST /api/v1/ai/analyze-snippet`

```json
{
  "locale": "en",
  "promptOrCode": "…",
  "imagesBase64": ["data:image/png;base64,…"]
}
```

`POST /api/v1/ai/analyze-mixed`

```json
{
  "locale": "en",
  "pageContext": {
    "selectedText": "",
    "rawContent": "…",
    "url": "https://…",
    "pageTitle": "",
    "metaDescription": "",
    "siteType": "general",
    "timestamp": 0
  }
}
```

Both return `{ "result": { … } }`. Prompts and the OpenAI key stay on the server.

### Local-first sync (recommended)

1. **Write locally first** (extension storage) for instant UI.
2. **Push** changed notes in the background: `POST /api/v1/notes` with `{ notes: [...] }`.
3. **Pull** periodically or on focus: `GET /api/v1/notes?since=<lastSync>` and merge (server last-write-wins on `updatedAt`).
4. **Deletes**: set `deletedAt` on the note object; server stores tombstones and returns them on pull.

Note shape (client-generated UUID `id`):

```json
{
  "id": "uuid",
  "title": "",
  "content": "",
  "tags": ["tag"],
  "pageUrl": "https://…",
  "stack": null,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "deletedAt": null
}
```

### Beta billing

Set `NEXT_PUBLIC_BILLING_ENABLED=false` (default in `.env.example`). When false, `/api/v1/session` returns `billing.enabled: false` and no limits — extension should not block features. Enable Polar env + flag when FOP/checkout is ready.

Apply migrations on Neon: `0000`, `0001` (referrals, device tokens), `0002_notes.sql` (or `npm run db:push`).

## Extension integration

Upgrade in the extension can link to `https://syntaxai.app/pricing`. During beta, checkout may be hidden until billing is enabled.
