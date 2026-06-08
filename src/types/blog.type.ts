// ── Blog Types ────────────────────────────────────────────

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogComment = {
  id: string;
  name: string;
  email: string;
  comment: string;
  blogId: string;
  parentId: string | null;
  isApproved: boolean;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
  replies?: BlogComment[];
  blog?: { title: string; slug: string };
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  status: BlogStatus;
  isFeatured: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  tags: BlogTag[];
  comments: BlogComment[];
};

// ── Input Types ───────────────────────────────────────────

export type CreateBlogInput = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  status?: BlogStatus;
  isFeatured?: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tagIds?: string[];
};

export type UpdateBlogInput = Partial<CreateBlogInput>;

export type CreateBlogTagInput = {
  name: string;
  slug: string;
};

export type UpdateBlogTagInput = Partial<CreateBlogTagInput>;

export type CreateBlogCommentInput = {
  name: string;
  email: string;
  comment: string;
  blogId: string;
  parentId?: string;
};

// ── Filter Types ──────────────────────────────────────────

export type BlogFilters = {
  status?: BlogStatus;
  isFeatured?: boolean;
  tagId?: string;
};

export type CommentFilters = {
  blogId?: string;
  isApproved?: boolean;
};

// ── API Response Types ────────────────────────────────────

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
