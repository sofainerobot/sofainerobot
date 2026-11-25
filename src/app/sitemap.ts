import { MetadataRoute } from 'next';

/**
 * Dynamically generated sitemap.xml.
 *
 * Only PUBLIC pages are included. Sensitive/internal routes
 * (/api/*, /admin/*, /_next/*) are intentionally omitted.
 *
 * Set NEXT_PUBLIC_SITE_URL to your production domain (e.g. in
 * Vercel Project Settings → Environment Variables) so the <loc>
 * entries use the real canonical URL.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://<YOUR_DOMAIN>';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
