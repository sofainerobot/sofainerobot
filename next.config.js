/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // إزالة هيدر X-Powered-By لتوفير بايتات
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // إزالة رسائل الكونسول في النسخة النهائية
  },
  images: {
    formats: ['image/avif', 'image/webp'], // استخدام صيغ صور حديثة وخفيفة
  },
  swcMinify: true, // ضغط الكود بأقصى سرعة
};
module.exports = nextConfig;
