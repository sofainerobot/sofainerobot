import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // التحقق مما إذا كان المسار يخص لوحة التحكم
  if (pathname.includes('/admin')) {
    
    // 🚨 التعديل الأهم: استثناء صفحة تسجيل الدخول من الحماية لمنع الحلقة اللانهائية
    if (pathname.includes('/admin/login')) {
      return intlMiddleware(request); 
    }

    const session = request.cookies.get('admin_session')?.value;
    
    // إذا لم يكن هناك جلسة، قم بتوجيهه لصفحة الدخول
    if (!session || session !== 'true') {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};