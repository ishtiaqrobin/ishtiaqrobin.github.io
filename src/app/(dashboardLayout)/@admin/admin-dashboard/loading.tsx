import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardMetricCards,
  DashboardStaticHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading dashboard">
      <DashboardStaticHeader
        title="Admin Dashboard"
        description="Overall platform statistics and insights"
        actionLabel="Refresh"
      />
      <DashboardMetricCards />

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, cardIndex) => (
          <div key={cardIndex} className="rounded-xl border bg-card p-5">
            <Skeleton className="mb-5 h-6 w-40" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading admin dashboard</span>
    </div>
  );
}
