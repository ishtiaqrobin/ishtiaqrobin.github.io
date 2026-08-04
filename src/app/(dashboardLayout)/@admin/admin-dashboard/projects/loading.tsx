import {
  DashboardFilterBar,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminProjectsLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading projects">
      <DashboardStaticHeader
        title="Project Management"
        description="Showcase your best work and manage project details"
      />
      <DashboardFilterBar
        searchPlaceholder="Search projects..."
        addLabel="Add Project"
      />
      <DashboardTableSkeleton columns={7} rows={6} />
      <span className="sr-only">Loading projects</span>
    </div>
  );
}
