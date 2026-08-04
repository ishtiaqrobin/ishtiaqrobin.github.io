import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminProjectsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading projects">
      <DashboardLoadingHeader />
      <DashboardFilterBar addButtonWidth="w-32" />
      <DashboardTableSkeleton columns={7} rows={6} />
      <span className="sr-only">Loading projects</span>
    </div>
  );
}
