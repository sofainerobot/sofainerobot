import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getExpectedToken } from "./src/lib/token";

/**
 * Middleware protecting the admin panel.
 *
 * Runs on every request; non-admin paths pass through immediately.
 * - /admin/login: accessible to everyone; redirects already-logged-in users to /admin/dashboard
 * - /admin/* (all other admin routes): requires a valid admin_session cookie
 *
 * For production, replace this hardcoded-token approach with a proper auth provider.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only admin paths are handled here; everything else passes through.
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  const isAuthenticated = token === getExpectedToken();

  // Login page: if already authenticated, send to dashboard
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // All other admin routes: require authentication
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
