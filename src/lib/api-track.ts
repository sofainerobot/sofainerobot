/**
 * Shared validation, rate-limiting, and CSRF helpers for API routes.
 *
 * Kept outside of route.ts so the route module only exports handler
 * functions (Next.js type-checks route.ts exports strictly).
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Escape HTML                                                        */
/* ------------------------------------------------------------------ */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c] as string));
}

/* ------------------------------------------------------------------ */
/* Input validation (zod)                                             */
/* ------------------------------------------------------------------ */

/* Query parameters used by the GET tracking beacon. */
export const TrackQuerySchema = z.object({
  tz: z.string().optional().default('UTC'),
  ref: z.string().optional().default('Direct'),
  lat: z.string().optional(),
  lon: z.string().optional(),
});

/* JSON body used by POST tracking events. */
export const TrackBodySchema = z.object({
  event: z.enum(['page_view', 'click', 'custom']).optional().default('page_view'),
  tz: z.string().optional(),
  ref: z.string().optional(),
  lat: z.string().optional(),
  lon: z.string().optional(),
});

/* ------------------------------------------------------------------ */
/* Rate limiting (in-memory, per IP)                                  */
/* ------------------------------------------------------------------ */
/* Note: Vercel serverless functions may reset this Map on cold starts /
   region changes, so this stops basic spam but is not a substitute for
   a distributed rate limiter (Redis, Upstash, Vercel KV, etc.). */
interface RateLimitEntry {
  count: number;
  windowStart: number;
}

export const rateLimitMap = new Map<string, RateLimitEntry>();

/* Per-method limits: stricter on state-changing endpoints. */
export const RATE_LIMITS = {
  GET: { max: 20, windowMs: 60 * 1000 }, // 20 tracking beacons / IP / minute
  POST: { max: 5, windowMs: 60 * 1000 }, // 5 tracked events / IP / minute
  PUT: { max: 3, windowMs: 60 * 1000 },
  DELETE: { max: 3, windowMs: 60 * 1000 },
} as const;

export function extractIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim() || 'Unknown';
  }
  return (
    headersList.get('x-real-ip') ?? headersList.get('x-vercel-ip') ?? 'Unknown'
  );
}

export function checkRateLimit(ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.windowStart + windowMs) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: Math.max(0, max - 1),
      resetTime: now + windowMs,
    };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= max,
    remaining: Math.max(0, max - entry.count),
    resetTime: entry.windowStart + windowMs,
  };
}

export function rateLimitResponse(limit: {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  max: number;
}) {
  const retryAfterSeconds = Math.ceil(
    Math.max(1, (limit.resetTime - Date.now()) / 1000),
  );
  return NextResponse.json(
    {
      error: 'Too many requests',
      message: `Rate limit exceeded. Maximum ${limit.max} requests per minute.`,
      remaining: 0,
      resetInSeconds: retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
        'X-RateLimit-Limit': String(limit.max),
        'X-RateLimit-Remaining': String(limit.remaining),
        'X-RateLimit-Reset': String(Math.ceil(limit.resetTime / 1000)),
      },
    },
  );
}

/* ------------------------------------------------------------------ */
/* User-Agent validation                                              */
/* ------------------------------------------------------------------ */
export const BOT_USER_AGENT_PATTERNS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /python-urllib/i,
  /http\.client/i,
  /axios/i,
  /node-fetch/i,
  /got/i,
  /bot/i,
  /crawler/i,
  /spider/i,
  /slurp/i,
  /headless/i,
  /phantom/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
];

export function isSuspiciousUserAgent(userAgent: string): boolean {
  if (!userAgent || userAgent.trim().length === 0) {
    return true;
  }
  return BOT_USER_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/* ------------------------------------------------------------------ */
/* CSRF protection                                                    */
/* ------------------------------------------------------------------ */
/* State-changing methods (POST/PUT/DELETE) require a matching Origin
   header (same-origin or a configured trusted origin) so cross-site
   form/fetch submissions are rejected. A custom X-CSRF-Token header can
   be added later once a session/token issuance flow exists. */

export const TRUSTED_ORIGINS = (process.env.TRUSTED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export function validateCSRF(request: NextRequest): {
  allowed: boolean;
  reason?: string;
} {
  const method = request.method;
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return { allowed: true };
  }

  const origin = request.headers.get('origin');
  if (!origin) {
    return { allowed: false, reason: 'Missing Origin header' };
  }

  const allowedOrigins = new Set([
    request.nextUrl.origin, // same-origin is always allowed
    ...TRUSTED_ORIGINS,
  ]);

  if (!allowedOrigins.has(origin)) {
    return { allowed: false, reason: 'Untrusted Origin header' };
  }

  return { allowed: true };
}
