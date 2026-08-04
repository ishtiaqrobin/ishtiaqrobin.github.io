import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardStaticHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminAboutLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading about settings">
      <DashboardStaticHeader
        title="About Section"
        description="Manage the homepage about section, hero/profile images, and resume content."
      />
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-xl border bg-card">
          <div className="border-b p-6 space-y-2">
            <h2 className="text-xl font-semibold">About Section Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure the homepage about section text, image, and resume URL.
            </p>
          </div>
          <div className="space-y-6 p-6">
            <DashboardFormFields fields={5} textArea />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Live Preview</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            A quick summary of the current About section configuration.
          </p>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading about settings</span>
    </div>
  );
}
