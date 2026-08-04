import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardLoadingHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminChatbotLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading chatbot settings">
      <DashboardLoadingHeader />
      <div className="grid w-full max-w-md grid-cols-3 gap-1 rounded-lg bg-muted p-1">
        <Skeleton className="h-8 rounded-md" />
        <Skeleton className="h-8 rounded-md" />
        <Skeleton className="h-8 rounded-md" />
      </div>
      <div className="max-w-3xl rounded-xl border bg-card">
        <div className="flex items-start justify-between border-b p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-6 p-6">
          <DashboardFormFields fields={4} />
          <div className="space-y-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-full rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-full rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading chatbot settings</span>
    </div>
  );
}
