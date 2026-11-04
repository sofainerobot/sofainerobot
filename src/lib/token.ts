/**
 * Pure token / password helpers.
 *
 * Safe to import from Next.js middleware (Edge Runtime): no `next/headers`,
 * no `node:crypto` — just deterministic string hashing.
 */

export const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * Simple deterministic hash (djb2). Works in Edge + Node, no crypto dependency.
 */
function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Returns the expected session token. Both login and middleware compute the same
 * value, so they stay in sync.
 *
 * Throws if ADMIN_PASSWORD or ADMIN_SESSION_SECRET are not set, preventing silent
 * fallback to weak hardcoded credentials in production.
 */
export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    throw new Error("ADMIN_PASSWORD and ADMIN_SESSION_SECRET must be set");
  }
  return "sess_" + simpleHash(`${password}:${secret}`);
}

/**
 * Check whether the supplied plaintext password matches the configured ADMIN_PASSWORD.
 *
 * Throws if ADMIN_PASSWORD is not set, preventing silent fallback to a weak
 * hardcoded credential.
 */
export function isValidPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD must be set");
  }
  return password === expected;
}
