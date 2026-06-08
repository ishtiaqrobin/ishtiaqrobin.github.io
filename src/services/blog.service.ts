/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import {
  Blog,
  BlogComment,
  BlogFilters,
  BlogTag,
  CommentFilters,
} from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

// ── Blog ──────────────────────────────────────────────────

export const blogService = {
  async getBlogs(filters?: BlogFilters): Promise<{
    data: Blog[] | null;
    error: any;
  }> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.set("status", filters.status);
      if (filters?.isFeatured !== undefined)
        params.set("isFeatured", String(filters.isFeatured));
      if (filters?.tagId) params.set("tagId", filters.tagId);

      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`${API_URL}/blogs${query}`, {
        next: { revalidate: 60, tags: ["blogs"] },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch blogs");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  async getBlogById(id: string): Promise<{
    data: Blog | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        next: { revalidate: 60, tags: [`blog-${id}`] },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch blog");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // getBlogBySlug — must be cache: "no-store"
  // Reason: backend does prisma.blog.update({ viewCount: increment(1) })
  // on every call — caching would skip the increment and return stale data
  async getBlogBySlug(slug: string): Promise<{
    data: Blog | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/blogs/slug/${slug}`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Blog not found");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // ── Blog Tags ───────────────────────────────────────────

  async getBlogTags(): Promise<{
    data: BlogTag[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/blogs/tags/all`, {
        next: { revalidate: 300, tags: ["blog-tags"] },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch blog tags");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // ── Blog Comments ───────────────────────────────────────

  // Admin only — fetches all comments including unapproved
  // cache: "no-store" because admin needs real-time approval status
  async getComments(
    token: string,
    filters?: CommentFilters,
  ): Promise<{
    data: BlogComment[] | null;
    error: any;
  }> {
    try {
      const params = new URLSearchParams();
      if (filters?.blogId) params.set("blogId", filters.blogId);
      if (filters?.isApproved !== undefined)
        params.set("isApproved", String(filters.isApproved));

      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`${API_URL}/blogs/comments/all${query}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch comments");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
