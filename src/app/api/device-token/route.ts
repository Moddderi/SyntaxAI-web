import { auth } from '@/lib/auth';
import { issueDeviceToken } from '@/lib/device-token';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const issued = await issueDeviceToken(session.user.id);

  return Response.json({
    token: issued.token,
    expiresAt: issued.expiresAt.toISOString(),
  });
}
