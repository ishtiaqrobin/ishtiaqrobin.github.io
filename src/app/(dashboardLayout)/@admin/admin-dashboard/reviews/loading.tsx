import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardLoadingHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminReviewsLoading() {
  return (
    <div className="min-h-screen space-y-6 pb-20" role="status" aria-label="Loading reviews">
      <DashboardLoadingHeader />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="rounded-xl border bg-card p-5 space-y-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
        <DashboardTableSkeleton columns={7} rows={6} />
      </div>
      <span className="sr-only">Loading reviews</span>
    </div>
  );
}
