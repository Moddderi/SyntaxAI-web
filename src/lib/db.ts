import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://build:build@placeholder.local/syntaxai';

export const db = drizzle({
  client: neon(databaseUrl),
  schema,
});
