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
 */
export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || "sofaine_admin_2026";
  const secret = process.env.ADMIN_SESSION_SECRET || "sofaine-change-me-in-production";
  return "sess_" + simpleHash(`${password}:${secret}`);
}

/**
 * Check whether the supplied plaintext password matches the configured ADMIN_PASSWORD.
 */
export function isValidPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD || "sofaine_admin_2026");
}
