'use client';

import { useEffect, useState } from 'react';

export default function VisitorTracker() {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (tracked) return;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const referrer = document.referrer || 'Direct';

    // IP-based geolocation is handled server-side via Vercel headers
    // (x-vercel-ip-country, x-vercel-ip-city, x-vercel-ip-country-region).
    // No browser permission prompt is required — it fires immediately on entry.
    fetch(
      `/api/track?tz=${encodeURIComponent(timezone)}&ref=${encodeURIComponent(
        referrer,
      )}`,
    ).catch(console.error);

    setTracked(true);
  }, [tracked]);

  return null;
}
