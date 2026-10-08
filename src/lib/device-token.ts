import { createHash, randomBytes } from 'node:crypto';
import { and, eq, gt } from 'drizzle-orm';
import { db } from './db';
import { asPlan, type Plan } from './plan';
import { deviceToken, user } from './schema';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 365;

export function hashDeviceToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function issueDeviceToken(userId: string) {
  const token = `sat_${randomBytes(32).toString('hex')}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS);

  await db.insert(deviceToken).values({
    id: randomBytes(16).toString('hex'),
    tokenHash: hashDeviceToken(token),
    userId,
    createdAt: now,
    expiresAt,
  });

  return { token, expiresAt };
}

export async function resolveDeviceToken(token: string): Promise<{
  id: string;
  email: string;
  name: string;
  plan: Plan;
} | null> {
  const tokenHash = hashDeviceToken(token);
  const rows = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
    })
    .from(deviceToken)
    .innerJoin(user, eq(deviceToken.userId, user.id))
    .where(
      and(eq(deviceToken.tokenHash, tokenHash), gt(deviceToken.expiresAt, new Date())),
    )
    .limit(1);

  const row = rows[0];
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    plan: asPlan(row.plan),
  };
}
