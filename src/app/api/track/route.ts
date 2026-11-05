import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? 'unknown';
  const country = headersList.get('x-vercel-ip-country') ?? 'unknown';
  const city = headersList.get('x-vercel-ip-city') ?? 'unknown';

  console.log("API Route Hit", { ip, country, city });

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
            text: `👤 New Visitor Detected\n\nIP: ${ip}\nCountry: ${country}`,
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
