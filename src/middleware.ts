import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/site';

const REF_COOKIE = 'syntax_ref';
const REF_PATTERN = /^[a-f0-9]{8}$/i;
const REF_PATHS = new Set(['/auth/signin', '/auth/extension', '/auth/complete']);

const CANONICAL_HOST = new URL(SITE_URL).host;
const WWW_HOST = `www.${CANONICAL_HOST}`;

/**
 * OAuth state cookies are host-scoped and the provider callback always lands on the canonical host
 * (BETTER_AUTH_URL). Starting sign-in on www therefore ends in `?error=state_mismatch`,
 * so every www request is redirected to the canonical host first.
 */
function redirectWwwToCanonical(request: NextRequest): NextResponse | null {
  const host = request.headers.get('host')?.toLowerCase();
  if (host !== WWW_HOST) {
    return null;
  }

  const target = request.nextUrl.clone();
  target.protocol = 'https:';
  target.host = CANONICAL_HOST;
  target.port = '';
  return NextResponse.redirect(target, 308);
}

/** Capture invite ?ref= on auth pages — cookies cannot be set in Server Components */
function captureInviteRef(request: NextRequest): NextResponse {
  const ref = request.nextUrl.searchParams.get('ref');
  if (!REF_PATHS.has(request.nextUrl.pathname) || !ref || !REF_PATTERN.test(ref)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set(REF_COOKIE, ref.toLowerCase(), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}

export function middleware(request: NextRequest) {
  return redirectWwwToCanonical(request) ?? captureInviteRef(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};
