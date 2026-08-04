import {
  DashboardFilterBar,
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminFaqsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading FAQs">
      <DashboardLoadingHeader />
      <DashboardFilterBar addButtonWidth="w-28" />
      <DashboardTableSkeleton columns={5} rows={6} />
      <span className="sr-only">Loading FAQs</span>
    </div>
  );
}
