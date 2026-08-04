import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardMetricCards,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminContactsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading contacts">
      <DashboardLoadingHeader />
      <DashboardMetricCards />
      <div className="rounded-xl border bg-card p-4">
        <DashboardFilterBar addButtonWidth="w-28" />
      </div>
      <DashboardTableSkeleton columns={6} rows={7} />
      <span className="sr-only">Loading contacts</span>
    </div>
  );
}
