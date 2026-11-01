import { cookies } from "next/headers";

/**
 * Cookie-based session helpers (Server Actions only — uses next/headers, so NOT
 * safe for Next.js middleware / Edge Runtime).
 *
 * Token generation lives in src/lib/token.ts (pure, edge-safe).
 */

export const ADMIN_SESSION_COOKIE = "admin_session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
} as const;

/** Read the current session token from the request cookies. */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? null;
}

/** Set the session cookie after a successful login. */
export async function setSessionToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
}

/** Clear the session cookie on logout. */
export async function clearSessionToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: 0,
  });
}
