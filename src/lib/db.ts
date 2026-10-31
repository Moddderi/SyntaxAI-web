import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/** Strip accidental quotes from .env / Vercel paste */
function resolveDatabaseUrl() {
  const raw =
    process.env.DATABASE_URL ??
    'postgresql://build:build@placeholder.local/syntaxai';
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

const databaseUrl = resolveDatabaseUrl();

export const db = drizzle({
  client: neon(databaseUrl),
  schema,
});
