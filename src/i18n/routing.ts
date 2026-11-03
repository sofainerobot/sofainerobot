import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // قائمة اللغات التي يدعمها موقعك
  locales: ['en', 'ar', 'fr', 'es'],
  
  // اللغة الافتراضية
  defaultLocale: 'en'
});