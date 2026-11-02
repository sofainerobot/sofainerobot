"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  getExpectedToken,
  isValidPassword,
} from "@/lib/token";
import {
  getSessionToken,
  setSessionToken,
  clearSessionToken,
} from "@/lib/session";
import {
  createFAQ,
  createSocialLink,
  deleteFAQ,
  deleteSocialLink as dbDeleteSocialLink,
  getFAQs,
  getHeroSettings,
  getSocialLinks,
  updateFAQ,
  updateHeroSettings as dbUpdateHeroSettings,
  updateSocialLink,
} from "@/lib/db";
import type { FAQItem, SocialLink } from "@/lib/db";
import { cookies } from "next/headers";

/**
 * Locale-aware path helpers.
 *
 * After restructuring, admin routes live under `[locale]`
 * (e.g. `/en/admin/dashboard`), so every admin redirect / revalidation must
 * include the current locale. The locale is read from the next-intl
 * `NEXT_LOCALE` cookie.
 *
 * Note: `cookies()` returns a Promise in Next.js 15, so `getLocale` is async.
 */
async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get("NEXT_LOCALE")?.value ?? "en";
}

async function adminPath(path: string): Promise<string> {
  return `/${await getLocale()}/admin${path}`;
}

async function rootPath(): Promise<string> {
  return `/${await getLocale()}/`;
}

/* ------------------------------------------------------------------ */
/* Authentication                                                     */
/* ------------------------------------------------------------------ */

/**
 * Admin login. Verifies the password and sets the session cookie.
 * On failure, redirects back to login with an error query param.
 * On success, redirects to the dashboard.
 */
export async function adminLogin(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");

  if (!isValidPassword(password)) {
    redirect(await adminPath("/login?error=invalid"));
  }

  await setSessionToken(getExpectedToken());
  revalidatePath(await adminPath("/dashboard"));
  redirect(await adminPath("/dashboard"));
}

/** Admin logout. Clears the session cookie and redirects to login. */
export async function adminLogout(): Promise<never> {
  await clearSessionToken();
  redirect(await adminPath("/login"));
}

/**
 * Guard used by mutating actions. Returns true if the caller has a valid session.
 */
async function requireAdmin(): Promise<boolean> {
  const token = await getSessionToken();
  return token === getExpectedToken();
}

/* ------------------------------------------------------------------ */
/* Build FormData helper (Server Actions read FormData)               */
/* ------------------------------------------------------------------ */

function buildFormData(obj: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      fd.append(key, String(value));
    }
  }
  return fd;
}

/* ------------------------------------------------------------------ */
/* Hero settings                                                      */
/* ------------------------------------------------------------------ */

export async function updateHeroSettings(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return { error: "Hero title is required." };
  }

  await dbUpdateHeroSettings({ title, description });
  revalidatePath(await rootPath());
  revalidatePath(await adminPath("/dashboard"));
  return { success: true };
}

/* ------------------------------------------------------------------ */
/* FAQ items                                                          */
/* ------------------------------------------------------------------ */

export async function upsertFaq(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const order = Number(String(formData.get("order") ?? "")) || 0;

  if (!question || !answer) {
    return { error: "Question and answer are both required." };
  }

  if (id) {
    await updateFAQ({ id, question, answer, order });
  } else {
    await createFAQ({ question, answer, order });
  }

  revalidatePath(await rootPath());
  revalidatePath(await adminPath("/dashboard"));
  return { success: true };
}

export async function deleteFaq(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { error: "No FAQ id provided." };
  }

  await deleteFAQ({ id });

  revalidatePath(await rootPath());
  revalidatePath(await adminPath("/dashboard"));
  return { success: true };
}

/* ------------------------------------------------------------------ */
/* Social media links                                                 */
/* ------------------------------------------------------------------ */

export async function upsertSocialLink(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const platform = String(formData.get("platform") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();

  if (!platform || !url || !icon) {
    return { error: "Platform, URL, and icon are all required." };
  }

  if (id) {
    await updateSocialLink({ id, platform, url, icon });
  } else {
    await createSocialLink({ platform, url, icon });
  }

  revalidatePath(await rootPath());
  revalidatePath(await adminPath("/dashboard"));
  return { success: true };
}

export async function deleteSocialLink(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await requireAdmin())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { error: "No social link id provided." };
  }

  await dbDeleteSocialLink({ id });

  revalidatePath(await rootPath());
  revalidatePath(await adminPath("/dashboard"));
  return { success: true };
}

/* ------------------------------------------------------------------ */
/* Re-exported types for client components                            */
/* ------------------------------------------------------------------ */

export type { FAQItem, SocialLink };
