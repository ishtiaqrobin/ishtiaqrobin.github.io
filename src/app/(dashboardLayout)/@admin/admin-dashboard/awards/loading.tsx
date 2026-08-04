import {
  DashboardFilterBar,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminAwardsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading awards">
      <DashboardStaticHeader
        title="Awards Management"
        description="Manage your awards, certifications, and recognitions"
      />
      <DashboardFilterBar searchPlaceholder="Search awards..." addLabel="Add Award" />
      <DashboardTableSkeleton columns={6} rows={6} />
      <span className="sr-only">Loading awards</span>
    </div>
  );
}
