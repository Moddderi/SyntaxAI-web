import { NextResponse, type NextRequest } from 'next/server';

const REF_COOKIE = 'syntax_ref';
const REF_PATTERN = /^[a-f0-9]{8}$/i;

/** Capture invite ?ref= on auth pages — cookies cannot be set in Server Components */
export function middleware(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get('ref');
  if (!ref || !REF_PATTERN.test(ref)) {
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

export const config = {
  matcher: ['/auth/signin', '/auth/extension', '/auth/complete'],
};
