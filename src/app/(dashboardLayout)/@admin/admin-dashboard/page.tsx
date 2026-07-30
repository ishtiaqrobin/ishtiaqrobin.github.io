import { adminService } from "@/services/admin.service";
import { sessionService } from "@/services/session.service";
import { AdminClient } from "@/components/modules/dashboard/admin/admin/AdminClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const { data: stats } = await adminService.getStats(token);

  return <AdminClient stats={stats} token={token} />;
}
