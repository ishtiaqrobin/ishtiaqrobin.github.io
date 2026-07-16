import { UserTable } from "@/components/modules/dashboard/admin/user/UserTable";
import { adminService } from "@/services/admin.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const { data: sessionData } = await sessionService.getSession();
  if (!sessionData?.session) redirect("/login");

  const token = sessionData.session.token;
  const { data: users } = await adminService.getAllUsers(token);

  return (
    <div className="space-y-6 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all registered users, and administrators
        </p>
      </div>
      <UserTable
        users={users || []}
        token={token}
      />
    </div>
  );
}
