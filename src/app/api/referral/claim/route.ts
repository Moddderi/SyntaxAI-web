import { cookies } from 'next/headers';
import { getServerSession } from '@/lib/auth';
import { linkReferrer, resolveReferrerId } from '@/lib/referrals';

export async function POST() {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookieStore = await cookies();
  const ref = cookieStore.get('syntax_ref')?.value;
  const referrerId = await resolveReferrerId(ref);

  if (!referrerId || referrerId === session.user.id) {
    return Response.json({ ok: true, linked: false });
  }

  let linked = false;
  try {
    linked = await linkReferrer(session.user.id, referrerId);
  } catch {
    return Response.json({ ok: false, linked: false }, { status: 503 });
  }

  if (linked) {
    cookieStore.delete('syntax_ref');
  }

  return Response.json({ ok: true, linked });
}
