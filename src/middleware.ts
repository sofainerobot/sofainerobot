/**
 * Next.js Middleware — CSP nonce + security headers.
 *
 * Security design:
 *   * Generates a UNIQUE nonce per request via crypto.randomUUID() (Edge-safe).
 *   * Sets the nonce on the request header `x-nonce` so the Root Layout can
 *     read it (headers() forces dynamic rendering) and so Next.js can apply it
 *     to the scripts it injects (runtime / HMR).
 *   * Sets the `Content-Security-Policy` response header.
 *   * The STRICT nonce-based CSP is GATED behind NODE_ENV === 'production' so
 *     local development (HMR / Fast Refresh) keeps working.
 *
 * References implemented: nonce generation [0], x-nonce + CSP headers [1],
 * exact CSP string [2], dynamic rendering via headers() [3],
 * style-src 'unsafe-inline' kept only for Next.js hydration [4].
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const config = {
  // Run on every request except Next.js internals and static public files.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

/**
 * Builds the Content-Security-Policy value for the current request.
 */
function buildCSP(nonce: string): string {
  if (IS_PRODUCTION) {
    // Production: strict nonce-based CSP. 'unsafe-inline' is kept ONLY for
    // style-src because Next.js injects inline styles during hydration.
    return [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');
  }

  // Development: relaxed CSP so HMR / Fast Refresh are not blocked.
  // Never use this policy in production.
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}

export function middleware(request: NextRequest) {
  // 1. Unique nonce per request. crypto.randomUUID() is available in the
  //    Next.js Edge Runtime (Web Crypto API).
  const nonce = crypto.randomUUID();

  // 2. Propagate the nonce to the request so layout / API code can read it.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 3. Content-Security-Policy response header.
  response.headers.set('Content-Security-Policy', buildCSP(nonce));

  return response;
}
