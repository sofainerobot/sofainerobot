import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { locales, defaultLocale } from "@/i18n";
import { getExpectedToken } from "@/lib/token";

/**
 * next-intl locale middleware.
 *
 * Handles locale detection, redirects (e.g. `/` -> `/en/`), and the
 * NEXT_LOCALE cookie so the user's language persists across requests.
 *
 * `localePrefix: "always"` means every public URL carries the locale:
 * `/en/`, `/ar/`, `/fr/`, ...
 */
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ------------------------------------------------------------------
  // Admin panel protection.
  //
  // After restructuring, admin routes live under [locale], so they are
  // reachable at /<locale>/admin/*. We protect those paths here.
  // ------------------------------------------------------------------
  const adminMatch = pathname.match(/^\/([a-z]{2})\/admin\/(.*)$/);
  if (adminMatch) {
    const [, locale] = adminMatch;
    const token = request.cookies.get("admin_session")?.value;
    const isAuthenticated = token === getExpectedToken();
    const isLogin = pathname.endsWith("/admin/login");

    if (isLogin) {
      // Already authenticated: send to dashboard.
      if (isAuthenticated) {
        return NextResponse.redirect(
          new URL(`/${locale}/admin/dashboard`, request.url)
        );
      }
      // Not authenticated: let them see the login page.
      return intlMiddleware(request);
    }

    // All other admin routes: require authentication.
    if (!isAuthenticated) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ------------------------------------------------------------------
  // Everything else: let next-intl handle locale routing/redirects.
  // ------------------------------------------------------------------
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files (anything with a file extension).
    "/((?!_next|.*\\..*).*)",
  ],
};
