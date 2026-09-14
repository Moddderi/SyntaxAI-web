# SyntaxAI Web

Marketing site and future API for [SyntaxAI](https://github.com/) Chrome extension.

## Pages

- `/` — Landing
- `/pricing` — Free vs Pro
- `/privacy` — Privacy policy (Chrome Web Store)
- `/terms` — Terms of service

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://syntaxai.app`
   - `NEXT_PUBLIC_CHROME_STORE_URL` = your Chrome Web Store listing URL
4. Add custom domain `syntaxai.app`

## Extension integration

The SyntaxAI extension already links Upgrade buttons to `https://syntaxai.app/pricing`.
