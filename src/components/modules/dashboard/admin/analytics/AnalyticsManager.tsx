"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Download,
  TrendingUp,
  Globe,
  FileText,
  BarChart3,
  Activity,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  PageView,
  PageViewStat,
  ResumeDownloadLog,
} from "@/types/analytics.type";

interface AnalyticsManagerProps {
  pageViews: PageView[];
  pageViewStats: PageViewStat[];
  resumeDownloads: ResumeDownloadLog[];
  resumeDownloadCount: number;
  isLoading?: boolean;
}

const numberFmt = new Intl.NumberFormat("en-US");

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const truncate = (str: string | null | undefined, max = 48) => {
  if (!str) return "—";
  return str.length > max ? `${str.slice(0, max)}…` : str;
};

// ─── Hero KPI cards ────────────────────────────────────────────────

type Kpi = {
  title: string;
  value: number;
  description: string;
  icon: typeof Eye;
  text: string;
  soft: string;
  ring: string;
  gradient: string;
  glow: string;
};

function HeroCards({
  totalViews,
  uniquePages,
  resumeDownloads,
  uniqueVisitors,
}: {
  totalViews: number;
  uniquePages: number;
  resumeDownloads: number;
  uniqueVisitors: number;
}) {
  const kpis: Kpi[] = [
    {
      title: "Total Page Views",
      value: totalViews,
      description: "All-time across every page",
      icon: Eye,
      text: "text-blue-600 dark:text-blue-400",
      soft: "bg-blue-500/10",
      ring: "ring-blue-500/20",
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/20",
    },
    {
      title: "Unique Pages",
      value: uniquePages,
      description: "Distinct pages visited",
      icon: FileText,
      text: "text-purple-600 dark:text-purple-400",
      soft: "bg-purple-500/10",
      ring: "ring-purple-500/20",
      gradient: "from-purple-500 to-fuchsia-500",
      glow: "shadow-purple-500/20",
    },
    {
      title: "Resume Downloads",
      value: resumeDownloads,
      description: "Tracked via About singleton",
      icon: Download,
      text: "text-emerald-600 dark:text-emerald-400",
      soft: "bg-emerald-500/10",
      ring: "ring-emerald-500/20",
      gradient: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/20",
    },
    {
      title: "Unique Visitors",
      value: uniqueVisitors,
      description: "By distinct IP address",
      icon: Globe,
      text: "text-orange-600 dark:text-orange-400",
      soft: "bg-orange-500/10",
      ring: "ring-orange-500/20",
      gradient: "from-orange-500 to-amber-500",
      glow: "shadow-orange-500/20",
    },
  ];

  return (
    // Analytics cards
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ title, value, description, icon: Icon, ...c }) => (
        <Card
          key={title}
          className={cn(
            "group relative overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm",
            "transition-all duration-300 hover:-translate-y-1 hover:border-border",
            "shadow-sm hover:shadow-lg",
            c.glow,
          )}
        >
          {/* top gradient accent bar */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
              c.gradient,
            )}
          />
          {/* decorative blurred orb */}
          <div
            className={cn(
              "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-linear-to-br",
              c.gradient,
            )}
          />

          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {title}
                </p>
                <p className="text-3xl font-bold tracking-tight tabular-nums">
                  {numberFmt.format(value)}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset",
                  c.soft,
                  c.ring,
                )}
              >
                <Icon className={cn("h-5 w-5", c.text)} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp className={cn("h-3.5 w-3.5", c.text)} />
              <span className="truncate">{description}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── Page view stats (horizontal bar list) ─────────────────────────

function PageViewStatsList({ stats }: { stats: PageViewStat[] }) {
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

// ─── Filterable table helpers ──────────────────────────────────────

function EmptyState({
  icon: Icon,
  label,
}: {
  icon: typeof Eye;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
      <Icon className="h-10 w-10 opacity-50" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

function PageViewsTable({ rows }: { rows: PageView[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter(
      (r) =>
        r.page.toLowerCase().includes(needle) ||
        (r.country ?? "").toLowerCase().includes(needle) ||
        (r.city ?? "").toLowerCase().includes(needle) ||
        (r.ipAddress ?? "").toLowerCase().includes(needle) ||
        (r.referrer ?? "").toLowerCase().includes(needle),
    );
  }, [rows, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by page, country, IP…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary" className="tabular-nums">
          {numberFmt.format(filtered.length)} / {numberFmt.format(rows.length)}
        </Badge>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Eye} label="No page views match your filter" />
      ) : (
        <div className="rounded-lg border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead className="text-right">When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 200).map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.page}</TableCell>
                  <TableCell>{r.country ?? "—"}</TableCell>
                  <TableCell>{r.city ?? "—"}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {r.ipAddress ?? "—"}
                  </TableCell>
                  <TableCell
                    className="max-w-55 truncate text-xs"
                    title={r.referrer ?? ""}
                  >
                    {truncate(r.referrer, 40)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right text-xs text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length > 200 && (
            <p className="border-t px-4 py-2 text-center text-xs text-muted-foreground">
              Showing first 200 of {numberFmt.format(filtered.length)} rows
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ResumeDownloadsTable({ rows }: { rows: ResumeDownloadLog[] }) {
  if (rows.length === 0) {
    return <EmptyState icon={Download} label="No resume downloads yet" />;
  }
  return (
    <div className="rounded-lg border p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>User Agent</TableHead>
            <TableHead className="text-right">When</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.slice(0, 200).map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.country ?? "—"}</TableCell>
              <TableCell className="font-mono text-xs">
                {r.ipAddress ?? "—"}
              </TableCell>
              <TableCell
                className="max-w-90 truncate text-xs"
                title={r.userAgent ?? ""}
              >
                {truncate(r.userAgent, 64)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-right text-xs text-muted-foreground">
                {formatDate(r.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length > 200 && (
        <p className="border-t px-4 py-2 text-center text-xs text-muted-foreground">
          Showing first 200 of {numberFmt.format(rows.length)} rows
        </p>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────

export function AnalyticsManager({
  pageViews,
  pageViewStats,
  resumeDownloads,
  resumeDownloadCount,
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
        resumeDownloads={resumeDownloadCount}
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
          <TabsTrigger value="resume" className="gap-2">
            <Download className="h-4 w-4" />
            Resume Downloads ({numberFmt.format(resumeDownloads.length)})
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

        <TabsContent value="resume">
          <Card>
            <CardContent className="p-6">
              <ResumeDownloadsTable rows={resumeDownloads} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
