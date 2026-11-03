import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Next.js 16 يتطلب أن يكون اسم الدالة المصدرة "proxy" وليس "middleware"
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // منطق حماية لوحة التحكم
  if (pathname.includes('/admin')) {
    // 1. استثناء صفحة تسجيل الدخول (منع الحلقة اللانهائية)
    if (pathname.includes('/admin/login')) {
      return intlMiddleware(request);
    }

    // 2. التحقق من وجود كوكي الجلسة
    const session = request.cookies.get('admin_session')?.value;

    // 3. إذا لم تكن هناك جلسة صالحة، قم بالطرد إلى صفحة الدخول
    if (session !== 'true') {
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  // تمرير باقي الطلبات إلى next-intl للتعامل مع اللغات
  return intlMiddleware(request);
}

export const config = {
  // استبعاد الملفات الثابتة وواجهات API من الفحص
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};