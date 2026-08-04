import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardFormFields,
  DashboardStaticHeader,
} from "@/components/modules/dashboard/DashboardLoadingPrimitives";

export default function AdminSettingsLoading() {
  return (
    <div className="min-h-screen space-y-8" role="status" aria-label="Loading platform settings">
      <DashboardStaticHeader
        title="Platform Settings"
        description="Manage your social links, contact info, and site configuration"
        actionLabel="Refresh"
      />
      <div className="rounded-2xl border bg-card">
        <div className="space-y-2 border-b p-6">
          <h2 className="text-xl font-semibold">Global Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure your site identity, social links, contact info, and SEO.
          </p>
        </div>
        <div className="space-y-8 p-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80">
              Social Links
            </h3>
            <DashboardFormFields fields={6} />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80">
              Contact &amp; Professional
            </h3>
            <DashboardFormFields fields={6} />
          </div>
          <button
            type="button"
            className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Save All Settings
          </button>
        </div>
      </div>
      <span className="sr-only">Loading platform settings</span>
    </div>
  );
}
