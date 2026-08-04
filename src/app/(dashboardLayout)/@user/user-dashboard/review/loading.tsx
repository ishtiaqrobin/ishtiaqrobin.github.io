import { Skeleton } from "@/components/ui/skeleton";

export default function UserReviewLoading() {
  return (
    <div className="min-h-screen space-y-6 pb-20" role="status" aria-label="Loading review">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Your Review</h1>
        <p className="mt-2 text-muted-foreground">
          Share your experience and help others learn more about my services
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Review &amp; Feedback</h2>
          <button
            type="button"
            className="h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
          >
            Write a Review
          </button>
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
