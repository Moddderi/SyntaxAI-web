import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { resolveDeviceToken } from '@/lib/device-token';
import { EXTENSION_CORS_HEADERS } from '@/lib/extension-api';
import { asPlan, getStoredPlan } from '@/lib/plan';

export const runtime = 'nodejs';

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: EXTENSION_CORS_HEADERS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: EXTENSION_CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.slice('Bearer '.length).trim();
    const deviceUser = await resolveDeviceToken(token);
    if (!deviceUser) {
      return json({ error: 'Unauthorized' }, 401);
    }

    return json({
      id: deviceUser.id,
      email: deviceUser.email,
      name: deviceUser.name,
      plan: deviceUser.plan,
    });
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const storedPlan = await getStoredPlan(session.user.id);

  return json({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    plan: asPlan(session.user.plan) === 'pro' || storedPlan === 'pro' ? 'pro' : storedPlan,
  });
}
