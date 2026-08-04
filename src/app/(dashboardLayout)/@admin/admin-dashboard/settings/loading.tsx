import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardLoadingHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminSettingsLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading platform settings">
      <DashboardLoadingHeader actionWidth="w-24" />
      <div className="rounded-2xl border bg-card">
        <div className="space-y-2 border-b p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="space-y-8 p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <DashboardFormFields fields={6} />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <DashboardFormFields fields={6} />
          </div>
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading platform settings</span>
    </div>
  );
}
