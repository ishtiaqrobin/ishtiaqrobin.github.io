import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardLoading() {
  return (
    <div className="min-h-screen space-y-8 pb-10" role="status" aria-label="Loading user dashboard">
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-primary/5 p-8 shadow-md">
        <div className="space-y-4">
          <Skeleton className="h-9 w-80 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full" />
          <Skeleton className="h-5 w-72 max-w-full" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>
        <Skeleton className="absolute right-10 top-8 hidden h-32 w-32 rounded-full md:block" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-5 space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border bg-card">
            <Skeleton className="h-12 w-full rounded-none" />
            <div className="space-y-4 p-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading user dashboard</span>
    </div>
  );
}
