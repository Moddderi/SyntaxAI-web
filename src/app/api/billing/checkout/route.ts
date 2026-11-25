import { createCheckout } from '@creem_io/better-auth/server';
import { getServerSession } from '@/lib/auth';
import {
  getCreemProductId,
  getCreemServerConfig,
  isCreemCheckoutEnabled,
} from '@/lib/creem';
import { getStoredHadTrial } from '@/lib/plan';
import { isBillingEnabled, SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';

export async function POST() {
  if (!isBillingEnabled || !isCreemCheckoutEnabled()) {
    return Response.json({ error: 'Checkout is not available yet.' }, { status: 503 });
  }

  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Sign in to upgrade.' }, { status: 401 });
  }

  const successBase = process.env.BETTER_AUTH_URL ?? SITE_URL;

  let skipTrial = false;
  try {
    skipTrial = await getStoredHadTrial(session.user.id);
  } catch {
    skipTrial = false;
  }

  try {
    const { url } = await createCheckout(getCreemServerConfig(), {
      productId: getCreemProductId(),
      customer: { email: session.user.email },
      successUrl: `${successBase}/account?checkout=success`,
      metadata: { referenceId: session.user.id },
      skipTrial,
    });

    return Response.json({ url });
  } catch (error) {
    console.error('[creem] checkout failed', error);
    return Response.json({ error: 'Could not start checkout. Try again.' }, { status: 500 });
  }
}
