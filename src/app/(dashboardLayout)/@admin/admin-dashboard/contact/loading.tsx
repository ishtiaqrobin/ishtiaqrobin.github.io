import {
  DashboardFilterBar,
  DashboardMetricCards,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminContactsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading contacts">
      <DashboardStaticHeader
        title="Contacts Management"
        description="Manage messages from your portfolio visitors"
      />
      <DashboardMetricCards />
      <div className="rounded-xl border bg-card p-4">
        <DashboardFilterBar searchPlaceholder="Search contacts..." addLabel="Refresh" />
      </div>
      <DashboardTableSkeleton columns={6} rows={7} />
      <span className="sr-only">Loading contacts</span>
    </div>
  );
}
