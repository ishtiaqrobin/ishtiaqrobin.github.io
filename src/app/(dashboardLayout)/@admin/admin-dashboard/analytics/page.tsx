import { AnalyticsClient } from "@/components/modules/dashboard/admin/analytics/AnalyticsClient";
import { analyticsService } from "@/services/analytics.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;

  const [pageViewsRes, pageViewStatsRes, resumeDownloadsRes] =
    await Promise.all([
      analyticsService.getPageViews(token),
      analyticsService.getPageViewStats(token),
      analyticsService.getResumeDownloadLogs(token),
    ]);

  return (
    <AnalyticsClient
      pageViews={pageViewsRes.data ?? []}
      pageViewStats={pageViewStatsRes.data ?? []}
      resumeDownloadLogs={resumeDownloadsRes.data ?? []}
      token={token}
    />
  );
}
