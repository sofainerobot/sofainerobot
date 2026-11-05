'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    console.log("Visitor Tracker Mounted");
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    fetch('/api/track?tz=' + timezone).catch(console.error);
  }, []);

  return null;
}
