import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import {
  TrackQuerySchema,
  RATE_LIMITS,
  checkRateLimit,
  escapeHtml,
  extractIp,
  isSuspiciousUserAgent,
  rateLimitResponse,
  TRUSTED_ORIGINS,
  validateCSRF,
} from '@/lib/api-track';

/* ------------------------------------------------------------------ */
/* Upstash Redis rate limiter (POST): max 5 requests per minute per IP */
/* ------------------------------------------------------------------ */
const trackRateLimitRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const trackRateLimit = new Ratelimit({
  redis: trackRateLimitRedis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
});

/* Reads a single cookie value from the raw Cookie header. */
function getCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`),
  );
  return match ? match[1] : undefined;
}

/* ------------------------------------------------------------------ */
/* GET — visitor tracking beacon                                      */
/* ------------------------------------------------------------------ */
export async function GET(request: NextRequest) {
  const headersList = await headers();

  // 1. User-Agent validation — reject obvious bots/scripts.
  const userAgent = headersList.get('user-agent') ?? '';
  if (isSuspiciousUserAgent(userAgent)) {
    return NextResponse.json(
      { error: 'Forbidden: invalid or missing user-agent' },
      { status: 403 },
    );
  }

  // 2. Rate limiting — per IP.
  const ip = extractIp(headersList);
  const { max: getMax, windowMs: getWindow } = RATE_LIMITS.GET;
  const rateLimit = checkRateLimit(ip, getMax, getWindow);
  if (!rateLimit.allowed) {
    return rateLimitResponse({ ...rateLimit, max: getMax });
  }

  // 3. Input validation — query parameters via zod. Reject anything that
  //    doesn't match the schema.
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsedQuery = TrackQuerySchema.safeParse(query);
  if (!parsedQuery.success) {
    return NextResponse.json(
      {
        error: 'Invalid query parameters',
        details: parsedQuery.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { tz, ref, lat, lon } = parsedQuery.data;

  const country = headersList.get('x-vercel-ip-country') ?? 'Unknown';
  const city = headersList.get('x-vercel-ip-city') ?? 'Unknown';
  const region = headersList.get('x-vercel-ip-country-region') ?? 'Unknown';

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || 'Unknown';
  const browserVersion = parser.getBrowser().version || '';
  const device = parser.getDevice().type || 'Desktop';
  const deviceVendor = parser.getDevice().vendor || '';
  const deviceModel = parser.getDevice().model || '';
  const os = parser.getOS().name || 'Unknown';
  const osVersion = parser.getOS().version || '';

  const time = new Date().toLocaleString('en-US', { timeZone: tz });

  function determineReferrerSource(ref: string): string {
    const lower = ref.toLowerCase();
    if (lower.includes('instagram.com')) return 'Instagram 📸';
    if (lower.includes('t.me') || lower.includes('telegram'))
      return 'Telegram ✈️';
    if (lower.includes('google.com')) return 'Google Search 🔍';
    if (lower.includes('facebook.com')) return 'Facebook 📘';
    if (lower.includes('tiktok.com')) return 'TikTok 🎵';
    if (!ref || ref === 'Direct') return 'Direct / Unknown 🔗';
    try {
      return new URL(ref).hostname;
    } catch {
      return ref;
    }
  }

  const source = determineReferrerSource(ref);

  const gpsLink = lat && lon
    ? `https://www.google.com/maps/search/?api=1&query=${escapeHtml(lat)},${escapeHtml(lon)}`
    : null;

  const locationLabel = gpsLink
    ? `GPS (${lat}, ${lon})`
    : `${escapeHtml(city)}, ${escapeHtml(country)}`;

  console.log("API Route Hit", {
    ip,
    country,
    city,
    region,
    device,
    deviceVendor,
    deviceModel,
    os,
    osVersion,
    browser,
    browserVersion,
    tz,
    time,
    lat,
    lon,
  });

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const deviceLabel = `${deviceVendor} ${deviceModel}`.trim() || 'Unknown';
      const osLabel = `${os} ${osVersion}`.trim() || 'Unknown';

      const text = `<b>🌐 NEW VISITOR DETECTED</b>
━━━━━━━━━━━━━━━━
📱 <b>Phone:</b> <code>${escapeHtml(deviceLabel)}</code>
🤖 <b>OS:</b> <code>${escapeHtml(osLabel)}</code>
🌍 <b>Location:</b> <code>${escapeHtml(locationLabel)}</code>
🔗 <b>IP:</b> <code>${escapeHtml(ip)}</code>
⏰ <b>Time:</b> <code>${escapeHtml(time)}</code>
🔗 <b>Source:</b> <code>${escapeHtml(source)}</code>
━━━━━━━━━━━━━━━━
📜 <b>Raw User-Agent:</b>
<pre>${escapeHtml(userAgent)}</pre>`;

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        }
      );

      const data = await response.json();
      console.log("Telegram Response:", data);
      return NextResponse.json({ ok: true, telegramResponse: data });
    } catch (error) {
      console.error('Telegram fetch failed:', error);
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(
    { error: "Missing variables", token: !!botToken, chatId: !!chatId },
    { status: 500 },
  );
}

/* ------------------------------------------------------------------ */
/* POST — tracked event                                               */
/*   a) Origin header must match TRUSTED_ORIGINS (else 403)           */
/*   b) CSRF double-submit: csrf-token cookie === X-CSRF-Token header */
/*       (missing or mismatched = 403)                                */
/*   c) Upstash Redis rate limit: max 5 requests per minute per IP    */
/*       (exceeded = 429)                                             */
/*   d) Valid requests return 204                                     */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  const headersList = await headers();

  // a) Origin header must match TRUSTED_ORIGINS.
  const origin = headersList.get('origin');
  if (!origin || !TRUSTED_ORIGINS.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  // b) CSRF double-submit: csrf-token cookie must equal X-CSRF-Token header.
  const tokenFromCookie = getCookie(headersList.get('cookie'), 'csrf-token');
  const tokenFromHeader = headersList.get('x-csrf-token');
  if (!tokenFromCookie || !tokenFromHeader || tokenFromCookie !== tokenFromHeader) {
    return new NextResponse(null, { status: 403 });
  }

  // c) Rate limit via Upstash Redis — max 5 requests per minute per IP.
  const ip = extractIp(headersList);
  const { success } = await trackRateLimit.limit(ip);
  if (!success) {
    return new NextResponse(null, { status: 429 });
  }

  // d) Valid request.
  return new NextResponse(null, { status: 204 });
}

/* ------------------------------------------------------------------ */
/* PUT / DELETE — state-changing (CSRF + rate limit, not implemented) */
/* ------------------------------------------------------------------ */

async function handleStateChanging(request: NextRequest) {
  const headersList = await headers();

  const userAgent = headersList.get('user-agent') ?? '';
  if (isSuspiciousUserAgent(userAgent)) {
    return NextResponse.json(
      { error: 'Forbidden: invalid or missing user-agent' },
      { status: 403 },
    );
  }

  const ip = extractIp(headersList);
  const method = request.method as keyof typeof RATE_LIMITS;
  const { max, windowMs } = RATE_LIMITS[method ?? 'PUT'];
  const rateLimit = checkRateLimit(ip, max, windowMs);
  if (!rateLimit.allowed) {
    return rateLimitResponse({ ...rateLimit, max });
  }

  const csrf = validateCSRF(request);
  if (!csrf.allowed) {
    return NextResponse.json(
      { error: 'CSRF validation failed', reason: csrf.reason },
      { status: 403 },
    );
  }

  return NextResponse.json({ error: 'Method not implemented' }, { status: 501 });
}

export const PUT = handleStateChanging;
export const DELETE = handleStateChanging;
