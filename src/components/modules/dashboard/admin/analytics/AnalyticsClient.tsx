"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsManager } from "./AnalyticsManager";
import { useRouter } from "next/navigation";
import type { PageView, PageViewStat, ResumeDownloadLog } from "@/types/analytics.type";

interface AnalyticsClientProps {
  pageViews: PageView[];
  pageViewStats: PageViewStat[];
  resumeDownloadLogs: ResumeDownloadLog[];
  token: string;
}

export function AnalyticsClient({
  pageViews,
  pageViewStats,
  resumeDownloadLogs,
  token,
}: AnalyticsClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Page views and analytics for your portfolio
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.refresh()}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AnalyticsManager
        pageViews={pageViews}
        pageViewStats={pageViewStats}
        resumeDownloadLogs={resumeDownloadLogs}
      />
    </div>
  );
}
