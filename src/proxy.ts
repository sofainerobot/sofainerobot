import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. منطق المصادقة: التحقق من مسارات لوحة التحكم
  if (pathname.includes('/admin')) {
    // استثناء صفحة تسجيل الدخول لتجنب الحلقة اللانهائية
    if (pathname.includes('/admin/login')) {
      return intlMiddleware(request);
    }

    const session = request.cookies.get('admin_session')?.value;

    // إذا لم يكن هناك جلسة صالحة، قم بإعادة التوجيه إلى صفحة الدخول
    if (session !== 'true') {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  // 2. تمرير الطلب إلى next-intl لباقي المسارات
  return intlMiddleware(request);
}

// 3. إعدادات matcher (يجب أن تستبعد الملفات الثابتة والـ API)
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};