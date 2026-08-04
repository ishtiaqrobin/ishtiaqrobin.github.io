import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardLoading() {
  return (
    <div className="min-h-screen space-y-8 pb-10" role="status" aria-label="Loading user dashboard">
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-primary/5 p-8 shadow-md">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="max-w-md text-muted-foreground">
            Here&apos;s an overview of your account and recent activities.
          </p>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-medium"
            >
              View Portfolio
            </button>
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
            <div className="h-12 bg-primary/5 px-6 py-4">
              <p className="text-lg font-semibold">
                {index === 0
                  ? "Review Management"
                  : index === 1
                    ? "Personal Profile"
                    : "Account Settings"}
              </p>
            </div>
            <div className="space-y-4 p-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <button
                type="button"
                className="h-8 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground"
              >
                {index === 0
                  ? "Manage My Review"
                  : index === 1
                    ? "Update Information"
                    : "Security Settings"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading user dashboard</span>
    </div>
  );
}
