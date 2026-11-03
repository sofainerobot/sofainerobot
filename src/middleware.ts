import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // تأكد من مسار ملف routing الخاص بك

// 1. إنشاء ميدلوير اللغة
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. التحقق مما إذا كان المسار الحالي هو مسار إداري (admin)
  // نستخدم split للتحقق من وجود 'admin' في أي جزء من المسار
  const isAdminRoute = pathname.split('/').includes('admin');

  // 3. إذا كان مساراً إدارياً، نتحقق من وجود جلسة صالحة
  if (isAdminRoute) {
    const sessionCookie = request.cookies.get('admin_session')?.value;

    // إذا لم تكن هناك جلسة، نعيد التوجيه إلى صفحة تسجيل الدخول
    if (!sessionCookie) {
      // إعادة التوجيه مع الحفاظ على اللغة الحالية (إن وجدت)
      const locale = pathname.split('/')[1] || 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. إذا لم يكن مساراً إدارياً أو كان المستخدم مسجلاً، نكمل مع ميدلوير اللغة
  return intlMiddleware(request);
}

// 5. تكوين matcher ليشمل جميع المسارات، مع استثناء الملفات الثابتة وواجهات API
export const config = {
  matcher: [
    // طابق جميع المسارات باستثناء الملفات الثابتة و API
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};