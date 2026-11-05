'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    console.log("Visitor Tracker Mounted");
    fetch('/api/track').catch(console.error);
  }, []);

  return null;
}
