import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStaticHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function DashboardStaticHeader({
  title,
  description,
  actionLabel,
}: DashboardStaticHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
      {actionLabel && (
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface DashboardLoadingHeaderProps {
  actionWidth?: string;
  compact?: boolean;
}

export function DashboardLoadingHeader({
  actionWidth,
  compact = false,
}: DashboardLoadingHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      {actionWidth && <Skeleton className={`h-10 ${actionWidth} rounded-lg`} />}
      {compact && <Skeleton className="h-8 w-24 rounded-lg" />}
    </div>
  );
}

export function DashboardMetricCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-5 space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function DashboardFilterBar({
  hasStatusFilter = true,
  addLabel = "Add item",
  searchPlaceholder = "Search...",
}: {
  hasStatusFilter?: boolean;
  addLabel?: string;
  searchPlaceholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        aria-label={searchPlaceholder}
        placeholder={searchPlaceholder}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none sm:w-72"
      />
      <div className="flex items-center gap-2">
        {hasStatusFilter && (
          <button
            type="button"
            className="h-10 w-36 rounded-lg border border-input bg-background px-3 text-left text-sm text-muted-foreground"
          >
            All Status
          </button>
        )}
        <button
          type="button"
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm font-medium"
        >
          Reset
        </button>
        <button
          type="button"
          className="h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          {addLabel}
        </button>
      </div>
    </div>
  );
}

export function DashboardTableSkeleton({
  columns = 6,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div
        className="grid gap-4 border-b bg-muted/40 px-4 py-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-3/4" />
        ))}
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 px-4 py-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <Skeleton
                key={columnIndex}
                className={`h-5 ${
                  columnIndex === 0 ? "w-full" : "w-3/4"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardFormFields({
  fields = 6,
  textArea = false,
}: {
  fields?: number;
  textArea?: boolean;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: fields }).map((_, index) => (
        <div
          key={index}
          className={textArea && index === fields - 1 ? "sm:col-span-2" : ""}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {textArea && index === fields - 1 ? "Description" : "Field"}
          </p>
          {textArea && index === fields - 1 ? (
            <textarea className="h-32 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none" />
          ) : (
            <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none" />
          )}
        </div>
      ))}
    </div>
  );
}
