async function postBilling(path: '/api/billing/checkout' | '/api/billing/portal') {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const payload = (await response.json().catch(() => null)) as
    | { url?: string; error?: string }
    | null;

  if (!response.ok || !payload?.url) {
    return {
      url: null,
      error: payload?.error || 'Checkout is not available yet.',
    };
  }

  return { url: payload.url, error: null };
}

export function startProCheckout() {
  return postBilling('/api/billing/checkout');
}

export function openBillingPortal() {
  return postBilling('/api/billing/portal');
}
