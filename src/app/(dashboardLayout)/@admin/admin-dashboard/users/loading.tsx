import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminUsersLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading users">
      <DashboardLoadingHeader />
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-80 rounded-lg" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
      <div className="rounded-xl border bg-card p-4">
        <DashboardTableSkeleton columns={5} rows={7} />
      </div>
      <span className="sr-only">Loading users</span>
    </div>
  );
}
