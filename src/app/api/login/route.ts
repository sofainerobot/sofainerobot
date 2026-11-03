import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const data = await request.formData();
  const password = data.get('password');

  if (password === 'Sofaine_Admin_2026!') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800,
      path: '/',
    });
    return NextResponse.redirect(new URL('/admin/dashboard', request.url), 303);
  }
  return NextResponse.redirect(new URL('/admin/login', request.url), 303);
}
