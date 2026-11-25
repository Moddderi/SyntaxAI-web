import { createPortal } from '@creem_io/better-auth/server';
import { getServerSession } from '@/lib/auth';
import { getCreemServerConfig, isCreemEnabled } from '@/lib/creem';
import { getStoredCreemCustomerId } from '@/lib/plan';
import { isBillingEnabled } from '@/lib/site';

export const runtime = 'nodejs';

export async function POST() {
  if (!isBillingEnabled || !isCreemEnabled()) {
    return Response.json({ error: 'Billing portal is not available yet.' }, { status: 503 });
  }

  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Sign in to manage billing.' }, { status: 401 });
  }

  const customerId = await getStoredCreemCustomerId(session.user.id);
  if (!customerId) {
    return Response.json(
      { error: 'No billing account yet. Upgrade to Pro first.' },
      { status: 400 },
    );
  }

  try {
    const { url } = await createPortal(getCreemServerConfig(), customerId);
    if (!url) {
      return Response.json({ error: 'Could not open the billing portal.' }, { status: 500 });
    }

    return Response.json({ url });
  } catch {
    return Response.json({ error: 'Could not open the billing portal.' }, { status: 500 });
  }
}
