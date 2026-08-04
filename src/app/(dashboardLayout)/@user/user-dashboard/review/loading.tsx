import { Skeleton } from "@/components/ui/skeleton";

export default function UserReviewLoading() {
  return (
    <div className="min-h-screen space-y-6 pb-20" role="status" aria-label="Loading review">
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-2 h-5 w-96 max-w-full" />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
        <div className="max-w-md overflow-hidden rounded-3xl border bg-card p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-8 w-16 rounded-sm" />
          </div>
          <Skeleton className="mt-6 h-3 w-36" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="mt-6 h-px w-full" />
          <Skeleton className="mt-4 h-3 w-44" />
        </div>
      </div>
      <span className="sr-only">Loading review</span>
    </div>
  );
}
