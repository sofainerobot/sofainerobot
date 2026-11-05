import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

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

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || 'Unknown';
  const device = parser.getDevice().type || 'Desktop';

  const tz = request.nextUrl.searchParams.get('tz') || 'UTC';
  const time = new Date().toLocaleString('en-US', { timeZone: tz });

  console.log("API Route Hit", { ip, country, city, region, device, browser, tz, time });

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
