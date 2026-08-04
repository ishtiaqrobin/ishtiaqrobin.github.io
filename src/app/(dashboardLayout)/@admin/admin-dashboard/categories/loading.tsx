import {
  DashboardFilterBar,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminCategoriesLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading categories">
      <DashboardStaticHeader
        title="Category Management"
        description="Create and manage tutoring subjects and descriptors"
      />
      <DashboardFilterBar
        searchPlaceholder="Search categories..."
        addLabel="Add Category"
      />
      <DashboardTableSkeleton columns={5} rows={7} />
      <span className="sr-only">Loading categories</span>
    </div>
  );
}
