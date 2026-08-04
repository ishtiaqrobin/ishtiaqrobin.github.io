import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardMetricCards,
  DashboardStaticHeader,
  DashboardTableSkeleton,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminAnalyticsLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading analytics">
      <DashboardStaticHeader
        title="Analytics"
        description="Page views and analytics for your portfolio"
        actionLabel="Refresh"
      />
      <DashboardMetricCards count={3} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border bg-card p-6">
          <Skeleton className="mb-2 h-6 w-44" />
          <Skeleton className="mb-6 h-4 w-64" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="rounded-xl border bg-card p-6">
          <Skeleton className="mb-6 h-6 w-36" />
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <DashboardTableSkeleton columns={5} rows={5} />
      <span className="sr-only">Loading analytics</span>
    </div>
  );
}
