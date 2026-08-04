import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminExperienceLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading experience">
      <DashboardLoadingHeader />
      <DashboardFilterBar addButtonWidth="w-32" />
      <DashboardTableSkeleton columns={6} rows={6} />
      <span className="sr-only">Loading experience</span>
    </div>
  );
}
