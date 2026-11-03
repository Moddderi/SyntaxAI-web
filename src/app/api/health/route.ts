export const runtime = 'nodejs';

/** Liveness for Railway / load balancers — no auth */
export function GET() {
  return Response.json({ ok: true, service: 'syntaxai-web' });
}
