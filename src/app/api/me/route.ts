import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { resolveDeviceToken } from '@/lib/device-token';
import { asPlan, getStoredPlan } from '@/lib/plan';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
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
    email: session.user.email,
    name: session.user.name,
    plan: asPlan(session.user.plan) === 'pro' || storedPlan === 'pro' ? 'pro' : storedPlan,
  });
}
