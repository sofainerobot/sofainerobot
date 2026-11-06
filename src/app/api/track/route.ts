import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

/* Escape Telegram Markdown special characters in user-controlled values. */
function escapeMd(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export async function GET(request: NextRequest) {
  const headersList = await headers();

  const ip =
    headersList.get('x-forwarded-for') ??
    headersList.get('x-real-ip') ??
    'Unknown';

  const country = headersList.get('x-vercel-ip-country') ?? 'Unknown';
  const city = headersList.get('x-vercel-ip-city') ?? 'Unknown';
  const region = headersList.get('x-vercel-ip-country-region') ?? 'Unknown';
  const userAgent = headersList.get('user-agent') ?? '';
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

  // Optional GPS location (sent from the client; requires user permission).
  // Falls back to IP-based city/region/country when not provided.
  const lat = request.nextUrl.searchParams.get('lat') ?? '';
  const lon = request.nextUrl.searchParams.get('lon') ?? '';

  const gpsLink = lat && lon
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    : null;

  const locationLabel = gpsLink
    ? `GPS (${lat}, ${lon})`
    : `${escapeMd(city)}, ${escapeMd(country)}`;

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
      const isMobile = device === 'mobile';
      const phoneLine = isMobile
        ? `📱 *Phone:* ${escapeMd(`${deviceVendor} ${deviceModel}`).trim() || 'Unknown'}\n🤖 *OS:* ${escapeMd(os)} ${escapeMd(osVersion)}\n🌐 *Browser:* ${escapeMd(browser)} ${escapeMd(browserVersion)}`
        : `🖥️ *Device:* ${device} - ${escapeMd(browser)} ${escapeMd(browserVersion)}\n💻 *OS:* ${escapeMd(os)} ${escapeMd(osVersion)}`;

      const text = `🌐 *New Visitor Detected*\n\n${phoneLine}\n📍 *Location:* ${locationLabel}\n🌐 *Browser & Device:* ${escapeMd(browser)} ${escapeMd(browserVersion)} | ${escapeMd(device)} - ${escapeMd(`${deviceVendor} ${deviceModel}`).trim()}\n📱 *Raw User-Agent:* ${escapeMd(userAgent)}\n🗣️ *Language:* ${escapeMd(acceptLanguage)}\n🔗 *IP:* ${escapeMd(ip)}\n⏰ *Time:* ${time}${gpsLink ? `\n🗺️ *Map:* ${gpsLink}` : ''}`;

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
            parse_mode: 'Markdown',
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
