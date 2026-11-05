'use client';

import { useEffect } from 'react';
import { trackVisitor } from '@/app/actions/track';

export default function VisitorTracker() {
  // Track the visitor once when the component mounts.
  // Errors are handled silently inside the server action so the UI is never affected.
  useEffect(() => {
    trackVisitor().catch(() => {
      // Swallow errors to avoid impacting the user experience
    });
  }, []);

  return null;
}
