/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // ------------------------------------------------------------------
  // Security Headers (applied by Next.js for all routes).
  //
  // NOTE: Content-Security-Policy is intentionally NOT set here. It is
  // generated PER-REQUEST by middleware.ts (nonce-based, strict-dynamic)
  // so that each page load gets a unique nonce. Setting a static CSP here
  // as well would cause browsers to INTERSECT the two policies and break
  // the nonce-based delivery.
  // ------------------------------------------------------------------
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Strict transport security (HTTPS only; browsers honor it only
          // over secure connections, so it is safe to emit unconditionally).
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions / Feature Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
