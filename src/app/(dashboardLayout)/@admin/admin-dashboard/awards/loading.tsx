import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminAwardsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading awards">
      <DashboardLoadingHeader />
      <DashboardFilterBar addButtonWidth="w-28" />
      <DashboardTableSkeleton columns={6} rows={6} />
      <span className="sr-only">Loading awards</span>
    </div>
  );
}
