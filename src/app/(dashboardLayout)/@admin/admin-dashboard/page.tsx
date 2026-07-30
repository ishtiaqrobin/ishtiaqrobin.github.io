import { adminService } from "@/services/admin.service";
import { sessionService } from "@/services/session.service";
import { contactService } from "@/services/contact.service";
import { AdminClient } from "@/components/modules/dashboard/admin/admin/AdminClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;

  const [statsRes, contactsRes] = await Promise.all([
    adminService.getStats(token),
    contactService.getAllContacts(token, { status: "UNREAD" }),
  ]);

  return (
    <AdminClient
      stats={statsRes.data}
      token={token}
      recentContacts={contactsRes.data ?? []}
    />
  );
}
