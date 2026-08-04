import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminUsersLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading users">
      <DashboardStaticHeader
        title="User Management"
        description="Manage all registered users, and administrators"
      />
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <input
          aria-label="Search users"
          placeholder="Search by name or email..."
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none md:w-80"
        />
        <button
          type="button"
          className="h-10 w-40 rounded-lg border border-input bg-background px-3 text-left text-sm text-muted-foreground"
        >
          All Users
        </button>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <DashboardTableSkeleton columns={5} rows={7} />
      </div>
      <span className="sr-only">Loading users</span>
    </div>
  );
}
