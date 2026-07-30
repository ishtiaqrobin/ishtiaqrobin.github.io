"use client";

import { useMemo } from "react";
import { BarChart3 } from "lucide-react";
import type { PageViewStat } from "@/types/analytics.type";

const numberFmt = new Intl.NumberFormat("en-US");

export function PageViewStatsList({ stats }: { stats: PageViewStat[] }) {
  const max = useMemo(
    () => stats.reduce((m, s) => Math.max(m, s.totalViews), 0),
    [stats],
  );

  if (stats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
        <BarChart3 className="h-10 w-10 opacity-50" />
        <p className="text-sm">No page view data yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {stats.map((s) => {
        const pct = max > 0 ? (s.totalViews / max) * 100 : 0;
        return (
          <div key={s.page} className="group">
            <div className="mb-1 flex items-center justify-between gap-3 text-sm">
              <span className="truncate font-medium" title={s.page}>
                {s.page}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {numberFmt.format(s.totalViews)}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:from-blue-600 group-hover:to-cyan-600"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
