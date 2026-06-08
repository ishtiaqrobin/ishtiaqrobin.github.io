import { env } from "@/env";
import type {
  AnalyticsQueryInput,
  CreatePageViewInput,
  CreateResumeDownloadLogInput,
  PageView,
  PageViewStat,
  ResumeDownloadCount,
  ResumeDownloadLog,
} from "@/types/analytics.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

const buildQuery = (params: Record<string, string | undefined>): string => {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "",
  ) as [string, string][];
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries).toString()}`;
};

export const analyticsService = {
  // ─── Page Views ─────────────────────────────────────────────────

  /**
   * Track a page view (public). Called from the frontend on page load.
   * POST /analytics/page-views
   */
  trackPageView: async function (
    payload: CreatePageViewInput,
  ): Promise<Result<PageView>> {
    try {
      const res = await fetch(`${API_URL}/analytics/page-views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // keepalive lets the request survive page navigation/unload
        keepalive: true,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error tracking page view:", err);
      return { data: null, error: toError(err, "Error tracking page view") };
    }
  },

  /**
   * Get all page views with optional filters (admin only).
   * GET /analytics/page-views
   */
  getPageViews: async function (
    token: string,
    query: AnalyticsQueryInput = {},
  ): Promise<Result<PageView[]>> {
    try {
      const qs = buildQuery({
        page: query.page,
        startDate: query.startDate,
        endDate: query.endDate,
      });
      const res = await fetch(`${API_URL}/analytics/page-views${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching page views:", err);
      return { data: null, error: toError(err, "Error fetching page views") };
    }
  },

  /**
   * Get page view stats grouped by page (admin only).
   * GET /analytics/page-views/stats
   */
  getPageViewStats: async function (
    token: string,
  ): Promise<Result<PageViewStat[]>> {
    try {
      const res = await fetch(`${API_URL}/analytics/page-views/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching page view stats:", err);
      return {
        data: null,
        error: toError(err, "Error fetching page view stats"),
      };
    }
  },

  // ─── Resume Downloads ───────────────────────────────────────────

  /**
   * Track a resume download (public). Called when a visitor downloads the resume.
   * POST /analytics/resume-downloads
   */
  trackResumeDownload: async function (
    payload: CreateResumeDownloadLogInput = {},
  ): Promise<Result<ResumeDownloadLog>> {
    try {
      const res = await fetch(`${API_URL}/analytics/resume-downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error tracking resume download:", err);
      return {
        data: null,
        error: toError(err, "Error tracking resume download"),
      };
    }
  },

  /**
   * Get all resume download logs (admin only).
   * GET /analytics/resume-downloads
   */
  getResumeDownloadLogs: async function (
    token: string,
  ): Promise<Result<ResumeDownloadLog[]>> {
    try {
      const res = await fetch(`${API_URL}/analytics/resume-downloads`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching resume download logs:", err);
      return {
        data: null,
        error: toError(err, "Error fetching resume download logs"),
      };
    }
  },

  /**
   * Get resume download count from About singleton (admin only).
   * GET /analytics/resume-downloads/count
   */
  getResumeDownloadCount: async function (
    token: string,
  ): Promise<Result<ResumeDownloadCount>> {
    try {
      const res = await fetch(`${API_URL}/analytics/resume-downloads/count`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching resume download count:", err);
      return {
        data: null,
        error: toError(err, "Error fetching resume download count"),
      };
    }
  },
};
