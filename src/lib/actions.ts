'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// دالة مساعدة للتحقق من أن المستخدم هو المسؤول (Admin)
async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (session !== 'true') {
    throw new Error('Unauthorized: You must be an admin to do this.');
  }
}

export async function deleteFaq(id: number) {
  await checkAdmin(); // إضافة حماية
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath('/[locale]', 'layout');
}

export async function createSocialLink(data: any) {
  await checkAdmin(); // إضافة حماية
  await prisma.socialLink.create({ data });
  revalidatePath('/[locale]', 'layout');
}

// (أضف نفس السطر `await checkAdmin();` في بداية أي دالة أخرى تقوم بتعديل البيانات)
