/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import type {
  IBlog,
  IBlogComment,
  IBlogLikeResult,
  IBlogListResponse,
  IBlogTag,
  ICreateBlogCommentInput,
} from "@/types/blog.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

export interface GetBlogsParams {
  status?: string;
  isFeatured?: boolean;
  isPinned?: boolean;
  tagId?: string;
  tagSlug?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const blogService = {
  // ── Public reads ────────────────────────────────────────────────

  /**
   * Get blogs (public — only PUBLISHED unless a token is supplied)
   * GET /blogs
   */
  getBlogs: async function (
    params: GetBlogsParams = {},
    token?: string,
  ): Promise<Result<IBlogListResponse>> {
    try {
      const qs = new URLSearchParams();
      if (params.status) qs.append("status", params.status);
      if (params.isFeatured !== undefined)
        qs.append("isFeatured", String(params.isFeatured));
      if (params.isPinned !== undefined)
        qs.append("isPinned", String(params.isPinned));
      if (params.tagId) qs.append("tagId", params.tagId);
      if (params.tagSlug) qs.append("tagSlug", params.tagSlug);
      if (params.search) qs.append("search", params.search);
      if (params.page) qs.append("page", String(params.page));
      if (params.limit) qs.append("limit", String(params.limit));

      const query = qs.toString();
      const res = await fetch(`${API_URL}/blogs${query ? `?${query}` : ""}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);

      return {
        data: { data: json.data ?? [], meta: json.meta },
        error: null,
      };
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return { data: null, error: toError(err, "Error fetching blogs") };
    }
  },

  /**
   * Get a single blog by slug (increments viewCount)
   * GET /blogs/slug/:slug
   */
  getBlogBySlug: async function (
    slug: string,
    token?: string,
  ): Promise<Result<IBlog>> {
    try {
      const res = await fetch(`${API_URL}/blogs/slug/${slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching blog:", err);
      return { data: null, error: toError(err, "Error fetching blog") };
    }
  },

  /**
   * Get related blogs by slug
   * GET /blogs/slug/:slug/related
   */
  getRelatedBlogs: async function (
    slug: string,
    limit = 3,
  ): Promise<Result<IBlog[]>> {
    try {
      const res = await fetch(
        `${API_URL}/blogs/slug/${slug}/related?limit=${limit}`,
        { cache: "no-store" },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data ?? [], error: null };
    } catch (err) {
      console.error("Error fetching related blogs:", err);
      return { data: null, error: toError(err, "Error fetching related blogs") };
    }
  },

  // ── Tags ────────────────────────────────────────────────────────

  /**
   * Get all tags
   * GET /blogs/tags
   */
  getTags: async function (): Promise<Result<IBlogTag[]>> {
    try {
      const res = await fetch(`${API_URL}/blogs/tags`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data ?? [], error: null };
    } catch (err) {
      console.error("Error fetching tags:", err);
      return { data: null, error: toError(err, "Error fetching tags") };
    }
  },

  /**
   * Create a tag (admin)
   * POST /blogs/tags
   */
  createTag: async function (
    token: string,
    payload: { name: string; slug?: string },
  ): Promise<Result<IBlogTag>> {
    try {
      const res = await fetch(`${API_URL}/blogs/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error creating tag:", err);
      return { data: null, error: toError(err, "Error creating tag") };
    }
  },

  /**
   * Delete a tag (admin)
   * DELETE /blogs/tags/:id
   */
  deleteTag: async function (
    token: string,
    id: string,
  ): Promise<Result<{ message: string }>> {
    try {
      const res = await fetch(`${API_URL}/blogs/tags/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json, error: null };
    } catch (err) {
      console.error("Error deleting tag:", err);
      return { data: null, error: toError(err, "Error deleting tag") };
    }
  },

  // ── Likes ───────────────────────────────────────────────────────

  /**
   * Like a blog (IP-deduped)
   * POST /blogs/:id/like
   */
  likeBlog: async function (id: string): Promise<Result<IBlogLikeResult>> {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}/like`, {
        method: "POST",
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error liking blog:", err);
      return { data: null, error: toError(err, "Error liking blog") };
    }
  },

  // ── Comments ────────────────────────────────────────────────────

  /**
   * Get approved comments for a blog (public)
   * GET /blogs/:id/comments
   */
  getComments: async function (blogId: string): Promise<Result<IBlogComment[]>> {
    try {
      const res = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data ?? [], error: null };
    } catch (err) {
      console.error("Error fetching comments:", err);
      return { data: null, error: toError(err, "Error fetching comments") };
    }
  },

  /**
   * Submit a comment (public — needs approval)
   * POST /blogs/:id/comments
   */
  createComment: async function (
    blogId: string,
    payload: ICreateBlogCommentInput,
  ): Promise<Result<IBlogComment>> {
    try {
      const res = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error submitting comment:", err);
      return { data: null, error: toError(err, "Error submitting comment") };
    }
  },

  /**
   * Get all comments for moderation (admin)
   * GET /blogs/comments?isApproved=&page=&limit=
   */
  getAllComments: async function (
    token: string,
    params: { isApproved?: boolean; page?: number; limit?: number } = {},
  ): Promise<Result<{ data: IBlogComment[]; meta: any }>> {
    try {
      const qs = new URLSearchParams();
      if (params.isApproved !== undefined)
        qs.append("isApproved", String(params.isApproved));
      if (params.page) qs.append("page", String(params.page));
      if (params.limit) qs.append("limit", String(params.limit));

      const query = qs.toString();
      const res = await fetch(
        `${API_URL}/blogs/comments${query ? `?${query}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
          cache: "no-store",
        },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: { data: json.data ?? [], meta: json.meta }, error: null };
    } catch (err) {
      console.error("Error fetching comments:", err);
      return { data: null, error: toError(err, "Error fetching comments") };
    }
  },

  /**
   * Approve / unapprove a comment (admin)
   * PATCH /blogs/comments/:id/approve
   */
  approveComment: async function (
    token: string,
    id: string,
    isApproved: boolean,
  ): Promise<Result<IBlogComment>> {
    try {
      const res = await fetch(`${API_URL}/blogs/comments/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved }),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error approving comment:", err);
      return { data: null, error: toError(err, "Error approving comment") };
    }
  },

  /**
   * Delete a comment (admin)
   * DELETE /blogs/comments/:id
   */
  deleteComment: async function (
    token: string,
    id: string,
  ): Promise<Result<{ message: string }>> {
    try {
      const res = await fetch(`${API_URL}/blogs/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json, error: null };
    } catch (err) {
      console.error("Error deleting comment:", err);
      return { data: null, error: toError(err, "Error deleting comment") };
    }
  },
};
