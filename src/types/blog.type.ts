/**
 * Blog domain types — mirrors the backend Prisma `Blog`, `BlogTag`,
 * and `BlogComment` models.
 */

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// ── Tag ───────────────────────────────────────────────────

export interface IBlogTag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  _count?: { blogs: number };
}

// ── Comment ───────────────────────────────────────────────

export interface IBlogComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  isApproved: boolean;
  ipAddress: string | null;
  blogId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  replies?: IBlogComment[];
  blog?: { id: string; title: string; slug: string };
}

export interface ICreateBlogCommentInput {
  name: string;
  email: string;
  comment: string;
  parentId?: string;
}

// ── Blog ──────────────────────────────────────────────────

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail: string | null;
  coverImageAlt: string | null;
  status: BlogStatus;
  isFeatured: boolean;
  isPinned: boolean;
  publishedAt: string | null;

  authorName: string | null;
  readingTime: number | null;

  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;

  viewCount: number;
  likeCount: number;

  tags: IBlogTag[];
  _count?: { comments: number };

  createdAt: string;
  updatedAt: string;
}

export interface ICreateBlogInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  coverImageAlt?: string;
  status?: BlogStatus;
  isFeatured?: boolean;
  isPinned?: boolean;
  publishedAt?: string | null;

  authorName?: string;
  readingTime?: number;

  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;

  tagIds?: string[];
  tagNames?: string[];
}

export type IUpdateBlogInput = Partial<ICreateBlogInput>;

// ── List response ─────────────────────────────────────────

export interface IBlogListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBlogListResponse {
  data: IBlog[];
  meta: IBlogListMeta;
}

// ── Like ──────────────────────────────────────────────────

export interface IBlogLikeResult {
  liked: boolean;
  alreadyLiked: boolean;
  likeCount: number;
  message: string;
}

// ── TOC ───────────────────────────────────────────────────

export interface ITocItem {
  id: string;
  text: string;
  level: number;
}
