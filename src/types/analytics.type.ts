// ─── Inputs (mirror Backend `analytics.interface.ts`) ─────────────

export interface CreatePageViewInput {
  page: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  referrer?: string;
}

export interface CreateResumeDownloadLogInput {
  ipAddress?: string;
  country?: string;
  userAgent?: string;
}

export interface AnalyticsQueryInput {
  page?: string;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
}

// ─── Entities (mirror Prisma rows returned by the API) ────────────

export interface PageView {
  id: string;
  page: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  country?: string | null;
  city?: string | null;
  referrer?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface ResumeDownloadLog {
  id: string;
  ipAddress?: string | null;
  country?: string | null;
  userAgent?: string | null;
  createdAt: string;
  updatedAt?: string;
}

// ─── Aggregations returned by the API ─────────────────────────────

export interface PageViewStat {
  page: string;
  totalViews: number;
}

export interface ResumeDownloadCount {
  resumeDownloadCount: number;
}
