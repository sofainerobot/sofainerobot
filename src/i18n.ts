/**
 * next-intl locale configuration.
 *
 * Edit `locales` to add more languages (see Step 6). The first entry is the
 * default locale used when no locale is present in the URL.
 */
export const locales = ["en", "ar", "fr"] as const;
export const defaultLocale = "en" as const;
export type Locale = (typeof locales)[number];
