import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

/* Escape HTML special characters in user-controlled values so they
   don't break Telegram's HTML parse_mode. */
function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c] as string));
}

/* -------------------------------------------------------------------------- */
/* Rate limiting (in-memory, per IP)                                          */
/* -------------------------------------------------------------------------- */
/* Note: Vercel serverless functions may reset this Map on cold starts /      */
/* region changes, so this stops basic spam but is not a substitute for       */
/* a distributed rate limiter (Redis, Upstash, Vercel KV, etc.) in production. */
interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function extractIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for may be a comma-separated list; use the left-most (client) IP.
    return forwarded.split(',')[0].trim() || 'Unknown';
  }
  return (
    headersList.get('x-real-ip') ?? headersList.get('x-vercel-ip') ?? 'Unknown'
  );
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Start a new window if there is no entry or the current window expired.
  if (!entry || now >= entry.windowStart + RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count),
    resetTime: entry.windowStart + RATE_LIMIT_WINDOW_MS,
  };
}

/* -------------------------------------------------------------------------- */
/* User-Agent validation                                                      */
/* -------------------------------------------------------------------------- */
const BOT_USER_AGENT_PATTERNS = [
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

function isSuspiciousUserAgent(userAgent: string): boolean {
  if (!userAgent || userAgent.trim().length === 0) {
    // Empty user-agent is a strong signal of a script/bot.
    return true;
  }
  return BOT_USER_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export async function GET(request: NextRequest) {
  const headersList = await headers();

  // ------------------------------------------------------------------
  // 1. User-Agent validation — reject obvious bots/scripts immediately.
  // ------------------------------------------------------------------
  const userAgent = headersList.get('user-agent') ?? '';
  if (isSuspiciousUserAgent(userAgent)) {
    return NextResponse.json(
      { error: 'Forbidden: invalid or missing user-agent' },
      { status: 403 },
    );
  }

  // ------------------------------------------------------------------
  // 2. Rate limiting — max 3 requests per IP per 1 minute.
  // ------------------------------------------------------------------
  const ip = extractIp(headersList);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.ceil(
      (rateLimit.resetTime - Date.now()) / 1000,
    );
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Maximum ${RATE_LIMIT_MAX_REQUESTS} requests per minute.`,
        remaining: 0,
        resetInSeconds: retryAfterSeconds > 0 ? retryAfterSeconds : 0,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.max(1, retryAfterSeconds)),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetTime / 1000)),
        },
      },
    );
  }

  const country = headersList.get('x-vercel-ip-country') ?? 'Unknown';
  const city = headersList.get('x-vercel-ip-city') ?? 'Unknown';
  const region = headersList.get('x-vercel-ip-country-region') ?? 'Unknown';
  const acceptLanguage = headersList.get('accept-language') ?? 'Unknown';

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || 'Unknown';
  const browserVersion = parser.getBrowser().version || '';
  const device = parser.getDevice().type || 'Desktop';
  const deviceVendor = parser.getDevice().vendor || '';
  const deviceModel = parser.getDevice().model || '';
  const os = parser.getOS().name || 'Unknown';
  const osVersion = parser.getOS().version || '';

  const tz = request.nextUrl.searchParams.get('tz') || 'UTC';
  const time = new Date().toLocaleString('en-US', { timeZone: tz });

  // Referrer source tracking
  const ref = request.nextUrl.searchParams.get('ref') || 'Direct';

  function determineReferrerSource(ref: string): string {
    const lower = ref.toLowerCase();
    if (lower.includes('instagram.com')) return 'Instagram 📸';
    if (lower.includes('t.me') || lower.includes('telegram'))
      return 'Telegram ✈️';
    if (lower.includes('google.com')) return 'Google Search 🔍';
    if (lower.includes('facebook.com')) return 'Facebook 📘';
    if (lower.includes('tiktok.com')) return 'TikTok 🎵';
    if (!ref || ref === 'Direct') return 'Direct / Unknown 🔗';

    // Otherwise, try to extract the domain name from the URL.
    try {
      const url = new URL(ref);
      return url.hostname;
    } catch {
      return ref;
    }
  }

  const source = determineReferrerSource(ref);

  // Optional GPS location (sent from the client; requires user permission).
  // Falls back to IP-based city/region/country when not provided.
  const lat = request.nextUrl.searchParams.get('lat') ?? '';
  const lon = request.nextUrl.searchParams.get('lon') ?? '';

  const gpsLink = lat && lon
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
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
🌍 <b>Location:</b> <code>${escapeHtml(city)}, ${escapeHtml(country)}</code>
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
          headers: {
            'Content-Type': 'application/json',
          },
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
      return NextResponse.json({ telegramResponse: data });
    } catch (error) {
      console.error('Telegram fetch failed:', error);
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  return NextResponse.json({ error: "Missing variables", token: !!botToken, chatId: !!chatId });
}
