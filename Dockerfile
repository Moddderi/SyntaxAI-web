FROM node:22-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=https://syntaxai.app
ENV BETTER_AUTH_URL=https://syntaxai.app
ENV BETTER_AUTH_SECRET=build-placeholder-secret-min-32-chars-xx
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
ENV NEXT_PUBLIC_BILLING_ENABLED=false

RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Railway bills by RAM-minutes: keep the V8 heap small so the idle API stays cheap.
ENV NODE_OPTIONS=--max-old-space-size=256

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

USER nextjs
EXPOSE 3000
CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
