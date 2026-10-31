import { auth } from '@/lib/auth';
import { issueDeviceToken } from '@/lib/device-token';
import { EXTENSION_CORS_HEADERS } from '@/lib/extension-api';

export const runtime = 'nodejs';

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: EXTENSION_CORS_HEADERS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: EXTENSION_CORS_HEADERS });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const issued = await issueDeviceToken(session.user.id);

  return json({
    token: issued.token,
    expiresAt: issued.expiresAt.toISOString(),
    userId: session.user.id,
  });
}
