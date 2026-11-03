import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // استثناء admin و api من ميدلوير اللغات
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)']
};
