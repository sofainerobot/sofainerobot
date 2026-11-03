'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// 1. دالة التحقق من المسؤول
async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (session !== process.env.ADMIN_SESSION_SECRET && session !== 'true') {
    throw new Error('Unauthorized: You must be an admin to do this.');
  }
}

// 2. دوال تسجيل الدخول والخروج
export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD || 'sofaine_admin_2026';

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // أسبوع
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

// 3. دوال إعدادات الصفحة الرئيسية (Hero)
export async function updateHeroSettings(data: { title: string; description: string }) {
  await checkAdmin();
  const existing = await prisma.heroSettings.findFirst();
  if (existing) {
    await prisma.heroSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.heroSettings.create({ data });
  }
  revalidatePath('/[locale]', 'layout');
}

// 4. دوال الأسئلة الشائعة (FAQ)
export async function upsertFaq(data: { id?: number; question: string; answer: string; order?: number }) {
  await checkAdmin();
  if (data.id) {
    await prisma.fAQ.update({ where: { id: data.id }, data });
  } else {
    await prisma.fAQ.create({ data: { question: data.question, answer: data.answer, order: data.order || 0 } });
  }
  revalidatePath('/[locale]', 'layout');
}

export async function deleteFaq(id: number) {
  await checkAdmin();
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath('/[locale]', 'layout');
}

// 5. دوال روابط التواصل الاجتماعي (Social Links)
export async function upsertSocialLink(data: { id?: string; platform: string; url: string; icon: string }) {
  await checkAdmin();
  if (data.id) {
    await prisma.socialLink.update({ where: { id: data.id }, data });
  } else {
    await prisma.socialLink.create({ data: { platform: data.platform, url: data.url, icon: data.icon } });
  }
  revalidatePath('/[locale]', 'layout');
}

export async function deleteSocialLink(id: string) {
  await checkAdmin();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath('/[locale]', 'layout');
}