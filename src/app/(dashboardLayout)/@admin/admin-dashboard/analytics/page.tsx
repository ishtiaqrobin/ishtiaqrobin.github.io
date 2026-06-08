"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AnalyticsManager } from "@/components/modules/dashboard/admin/analytics/AnalyticsManager";
import { analyticsService } from "@/services/analytics.service";
import { useAuth } from "@/hooks/useAuth";
import type {
  PageView,
  PageViewStat,
  ResumeDownloadLog,
} from "@/types/analytics.type";

export default function AdminAnalyticsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [pageViewStats, setPageViewStats] = useState<PageViewStat[]>([]);
  const [resumeDownloads, setResumeDownloads] = useState<ResumeDownloadLog[]>(
    [],
  );
  const [resumeDownloadCount, setResumeDownloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);

    const [viewsRes, statsRes, downloadsRes, countRes] = await Promise.all([
      analyticsService.getPageViews(userToken),
      analyticsService.getPageViewStats(userToken),
      analyticsService.getResumeDownloadLogs(userToken),
      analyticsService.getResumeDownloadCount(userToken),
    ]);

    const errors = [
      viewsRes.error,
      statsRes.error,
      downloadsRes.error,
      countRes.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      toast.error("Failed to load some analytics data", {
        description: errors.map((e) => e?.message).join(" • "),
      });
    }

    setPageViews(viewsRes.data ?? []);
    setPageViewStats(statsRes.data ?? []);
    setResumeDownloads(downloadsRes.data ?? []);
    setResumeDownloadCount(countRes.data?.resumeDownloadCount ?? 0);
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (!authLoading && userToken) {
      Promise.resolve().then(() => fetchAll());
    }
  }, [authLoading, userToken, fetchAll]);

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Page views and resume downloads across your portfolio
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAll}
          disabled={isLoading || !userToken}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AnalyticsManager
        pageViews={pageViews}
        pageViewStats={pageViewStats}
        resumeDownloads={resumeDownloads}
        resumeDownloadCount={resumeDownloadCount}
        isLoading={isLoading}
      />
    </div>
  );
}
