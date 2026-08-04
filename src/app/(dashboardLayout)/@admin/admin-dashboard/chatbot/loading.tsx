import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardStaticHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminChatbotLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading chatbot settings">
      <DashboardStaticHeader
        title="Chatbot"
        description="Configure AI provider and chatbot behavior for your portfolio"
      />
      <div className="grid w-full max-w-md grid-cols-3 gap-1 rounded-lg bg-muted p-1">
        <Skeleton className="h-8 rounded-md" />
        <Skeleton className="h-8 rounded-md" />
        <Skeleton className="h-8 rounded-md" />
      </div>
      <div className="max-w-3xl rounded-xl border bg-card">
        <div className="flex items-start justify-between border-b p-6">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">AI Provider Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure which AI model powers your chatbot.
            </p>
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
          <button
            type="button"
            className="h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground"
          >
            Save AI Config
          </button>
        </div>
      </div>
      <span className="sr-only">Loading chatbot settings</span>
    </div>
  );
}
