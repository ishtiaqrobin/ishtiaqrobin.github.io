import { Skeleton } from "@/components/ui/skeleton";

/**
 * Instant fallback for data-driven dashboard routes.
 *
 * Used by route-level loading.tsx files so the dashboard shell remains
 * interactive while the Server Component fetches the page data.
 */
export function DashboardPageSkeleton() {
  return (
    <div
      className="min-h-screen space-y-6"
      role="status"
      aria-label="Loading dashboard content"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-xl" />
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full sm:w-72" />
          <Skeleton className="h-10 w-36" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.5fr_1fr_0.8fr] gap-4 border-b py-3 last:border-0"
            >
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading dashboard content…</span>
    </div>
  );
}
