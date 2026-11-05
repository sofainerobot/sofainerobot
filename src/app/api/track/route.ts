import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

function parseUserAgent(ua: string): { device: string; browser: string } {
  const lowerUa = ua.toLowerCase();

  // Detect device
  let device = 'Unknown';
  if (/iphone|ipad|ipod/.test(lowerUa)) {
    device = 'iPhone';
  } else if (/android/.test(lowerUa)) {
    device = 'Android';
  } else if (/windows/.test(lowerUa)) {
    device = 'Windows';
  } else if (/macintosh|mac os x/.test(lowerUa)) {
    device = 'Mac';
  }

  // Detect browser (Edge must come before Chrome since Edge's UA contains "Chrome")
  let browser = 'Unknown';
  if (/edg\//.test(lowerUa)) {
    browser = 'Edge';
  } else if (/chrome|chromium/.test(lowerUa)) {
    browser = 'Chrome';
  } else if (/safari/.test(lowerUa)) {
    browser = 'Safari';
  } else if (/firefox/.test(lowerUa)) {
    browser = 'Firefox';
  }

  return { device, browser };
}

export async function GET() {
  const headersList = await headers();

  const ip =
    headersList.get('x-forwarded-for') ??
    headersList.get('x-real-ip') ??
    'Unknown';

  const country = headersList.get('x-vercel-ip-country') ?? 'Unknown';
  const city = headersList.get('x-vercel-ip-city') ?? 'Unknown';
  const region = headersList.get('x-vercel-ip-country-region') ?? 'Unknown';
  const userAgent = headersList.get('user-agent') ?? '';

  const { device, browser } = parseUserAgent(userAgent);

  const now = new Date();
  const time = now.toLocaleString();

  console.log("API Route Hit", { ip, country, city, region, device, browser });

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🌐 *New Visitor Detected*\n\n📍 *Location:* ${city}, ${region}, ${country}\n🖥️ *Device:* ${device} - ${browser}\n🔗 *IP:* ${ip}\n⏰ *Time:* ${time}`,
            parse_mode: 'Markdown',
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

  return NextResponse.json({ error: "Missing variables", token: !botToken, chatId: !!chatId });
}
