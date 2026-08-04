import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileLoading() {
  return (
    <div className="w-full min-h-screen space-y-6" role="status" aria-label="Loading profile">
      <div>
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your personal information and profile
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="h-fit overflow-hidden rounded-3xl border bg-card lg:col-span-4">
          <Skeleton className="h-24 w-full rounded-none" />
          <div className="-mt-16 space-y-4 p-6">
            <Skeleton className="mx-auto h-32 w-32 rounded-full border-4 border-background" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
        </div>
        <div className="space-y-8 lg:col-span-8">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold">Profile Information</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Update your profile information and preferences.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-2 h-3 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-6 h-10 w-36 rounded-full" />
          </div>
          <div className="rounded-3xl border bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading profile</span>
    </div>
  );
}
