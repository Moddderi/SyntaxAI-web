import { resolveDeviceToken } from '@/lib/device-token';
import type { Plan } from '@/lib/plan';

export const EXTENSION_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
} as const;

export function extensionOptions() {
  return new Response(null, { status: 204, headers: EXTENSION_CORS_HEADERS });
}

export function extensionJson(body: unknown, status = 200) {
  return Response.json(body, { status, headers: EXTENSION_CORS_HEADERS });
}

export type ExtensionUser = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
};

export async function authenticateExtension(
  request: Request,
): Promise<ExtensionUser | null> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.slice('Bearer '.length).trim();
  if (!token) {
    return null;
  }

  return resolveDeviceToken(token);
}
