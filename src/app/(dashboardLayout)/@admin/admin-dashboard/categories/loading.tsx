import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminCategoriesLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading categories">
      <DashboardLoadingHeader />
      <DashboardFilterBar addButtonWidth="w-32" />
      <DashboardTableSkeleton columns={5} rows={7} />
      <span className="sr-only">Loading categories</span>
    </div>
  );
}
