"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Activity, Download } from "lucide-react";
import type { PageView, PageViewStat, ResumeDownloadLog } from "@/types/analytics.type";

const numberFmt = new Intl.NumberFormat("en-US");
import { HeroCards } from "./HeroCards";
import { PageViewStatsList } from "./PageViewStatsList";
import { PageViewsTable } from "./PageViewsTable";
import { ResumeDownloadsTable } from "./ResumeDownloadsTable";

interface AnalyticsManagerProps {
  pageViews: PageView[];
  pageViewStats: PageViewStat[];
  resumeDownloadLogs: ResumeDownloadLog[];
  isLoading?: boolean;
}

export function AnalyticsManager({
  pageViews,
  pageViewStats,
  resumeDownloadLogs,
  isLoading,
}: AnalyticsManagerProps) {
  const totals = useMemo(() => {
    const totalViews = pageViewStats.reduce((a, s) => a + s.totalViews, 0);
    const uniquePages = pageViewStats.length;
    const uniqueVisitors = new Set(
      pageViews.map((v) => v.ipAddress).filter(Boolean) as string[],
    ).size;
    return { totalViews, uniquePages, uniqueVisitors };
  }, [pageViews, pageViewStats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="h-32 animate-pulse border-border/60">
            <CardContent className="p-6">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="mt-3 h-8 w-20 rounded bg-muted" />
              <div className="mt-3 h-3 w-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <HeroCards
        totalViews={totals.totalViews}
        uniquePages={totals.uniquePages}
        uniqueVisitors={totals.uniqueVisitors}
      />

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            By Page
          </TabsTrigger>
          <TabsTrigger value="views" className="gap-2">
            <Activity className="h-4 w-4" />
            Page Views ({numberFmt.format(pageViews.length)})
          </TabsTrigger>
          <TabsTrigger value="downloads" className="gap-2">
            <Download className="h-4 w-4" />
            Resume Downloads ({numberFmt.format(resumeDownloadLogs.length)})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Views grouped by page
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most visited pages ranked by total views
                  </p>
                </div>
                <Badge variant="outline" className="tabular-nums">
                  {numberFmt.format(pageViewStats.length)} pages
                </Badge>
              </div>
              <PageViewStatsList stats={pageViewStats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="views">
          <Card>
            <CardContent className="p-6">
              <PageViewsTable rows={pageViews} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card>
            <CardContent className="p-6">
              <ResumeDownloadsTable rows={resumeDownloadLogs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
