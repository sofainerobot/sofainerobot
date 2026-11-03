import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const data = await request.formData();
  const password = data.get('password');
  const locale = data.get('locale') || 'en';

  if (password === 'Sofaine_Admin_2026!') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800,
      path: '/',
    });
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url), 303);
  } else {
    return NextResponse.redirect(new URL(`/${locale}/admin/login?error=1`, request.url), 303);
  }
}
