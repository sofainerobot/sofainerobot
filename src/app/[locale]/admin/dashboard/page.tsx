export const dynamic = 'force-dynamic';
import { getHeroSettings, getFAQs, getSocialLinks } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getExpectedToken } from "@/lib/token";
import AdminDashboard from "@/components/admin/Dashboard";

/**
 * Admin Dashboard page (Server Component).
 *
 * Protected by BOTH middleware (middleware.ts) and this page-level cookie check,
 * so the dashboard is never accessible without a valid admin session.
 *
 * Reads the current database content and passes it to the interactive client
 * dashboard.
 */
export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

  if (token !== getExpectedToken()) {
    redirect(`/${locale}/admin/login`);
  }

  const [hero, faqs, socialLinks] = await Promise.all([
    getHeroSettings(),
    getFAQs(),
    getSocialLinks(),
  ]);

  return (
    <AdminDashboard hero={hero} faqs={faqs} socialLinks={socialLinks} />
  );
}
