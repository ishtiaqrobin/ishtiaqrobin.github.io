import {
  DashboardFilterBar,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminFaqsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading FAQs">
      <DashboardStaticHeader
        title="FAQ Management"
        description="Manage frequently asked questions"
      />
      <DashboardFilterBar searchPlaceholder="Search FAQs..." addLabel="Add FAQ" />
      <DashboardTableSkeleton columns={5} rows={6} />
      <span className="sr-only">Loading FAQs</span>
    </div>
  );
}
