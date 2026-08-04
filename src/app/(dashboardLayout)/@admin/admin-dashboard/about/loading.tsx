import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardLoadingHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminAboutLoading() {
  return (
    <div className="min-h-screen space-y-6" role="status" aria-label="Loading about settings">
      <DashboardLoadingHeader />
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-xl border bg-card">
          <div className="border-b p-6 space-y-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <div className="space-y-6 p-6">
            <DashboardFormFields fields={5} textArea />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <Skeleton className="mb-2 h-6 w-28" />
          <Skeleton className="mb-6 h-4 w-64 max-w-full" />
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
