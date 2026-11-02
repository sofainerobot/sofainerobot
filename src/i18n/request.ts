import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  if (!['en', 'ar', 'fr', 'es'].includes(locale as string)) {
    return {locale: 'en', messages: (await import(`../messages/en.json`)).default};
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
