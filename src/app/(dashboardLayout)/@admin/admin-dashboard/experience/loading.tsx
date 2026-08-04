import {
  DashboardFilterBar,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminExperienceLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading experience">
      <DashboardStaticHeader
        title="Experience Management"
        description="Manage your professional career history and job roles"
      />
      <DashboardFilterBar
        searchPlaceholder="Search experiences..."
        addLabel="Add Experience"
      />
      <DashboardTableSkeleton columns={6} rows={6} />
      <span className="sr-only">Loading experience</span>
    </div>
  );
}
