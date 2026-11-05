'use server';

import { headers } from 'next/headers';
import { after } from 'next/server';
import { ipAddress, geolocation } from '@vercel/functions';

export async function trackVisitor() {
  'use server';

  try {
    // Read the incoming request headers (async in Next.js 15/16)
    const headersList = await headers();

    // Detect visitor IP and geo data from Vercel headers
    const ip = ipAddress(headersList);
    const geo = geolocation({ headers: headersList } as Request);

    const visitorData = {
      ip: ip ?? 'unknown',
      country: geo.country ?? 'unknown',
      countryCode: geo.countryRegion ?? 'unknown',
      city: geo.city ?? 'unknown',
      region: geo.region ?? 'unknown',
      visitedAt: new Date().toISOString(),
    };

    // Log the data (database storage can be added later)
    console.log('[VisitorTracker] Visitor data:', visitorData);

    // Log the data before sending the Telegram notification
    console.log('Visitor Tracked:', {
      ip: visitorData.ip,
      country: visitorData.country,
      city: visitorData.city,
    });

    // Send a real-time notification to Telegram (kept alive in the background via `after`)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = [
        '👤 *New Visitor Detected*',
        '',
        `*IP:* \`${visitorData.ip}\``,
        `*Country:* ${visitorData.country} (${visitorData.countryCode})`,
        `*City:* ${visitorData.city}`,
        `*Region:* ${visitorData.region}`,
        `*Time:* ${visitorData.visitedAt}`,
      ].join('\n');

      after(async () => {
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
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true,
              }),
            }
          );

          const data = await response.json();
          console.log('Telegram API Response:', data);
        } catch (telegramError) {
          console.error('[VisitorTracker] Telegram fetch failed:', telegramError);
        }
      });
    }
  } catch (error) {
    // Silent error handling — never break the user experience
    console.error('[VisitorTracker] Failed to track visitor:', error);
  }
}
