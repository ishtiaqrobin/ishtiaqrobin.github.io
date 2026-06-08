/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import {
  Blog,
  BlogTag,
  CreateBlogCommentInput,
  CreateBlogTagInput,
  UpdateBlogTagInput,
} from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActionResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// ── Blog ──────────────────────────────────────────────────

export async function createBlogAction(
  formData: FormData,
  token: string,
): Promise<ActionResult<Blog>> {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidateTag("blogs", "max");
      return {
        success: true,
        message: result.message || "Blog created successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create blog",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateBlogAction(
  id: string,
  formData: FormData,
  token: string,
): Promise<ActionResult<Blog>> {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidateTag("blogs", "max");
      revalidateTag(`blog-${id}`, "max"); // invalidate single blog cache
      return {
        success: true,
        message: result.message || "Blog updated successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update blog",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteBlogAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidateTag("blogs", "max");
      revalidateTag(`blog-${id}`, "max"); // invalidate single blog cache
      return {
        success: true,
        message: result.message || "Blog deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete blog",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// Like blog — public, no token required
// Backend: PATCH /:id/like — no auth middleware
export async function likeBlogAction(
  id: string,
): Promise<ActionResult<{ likeCount: number }>> {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}/like`, {
      method: "PATCH",
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag(`blog-${id}`, "max"); // reflect updated likeCount
      return {
        success: true,
        message: result.message || "Blog liked",
        data: result.data, // { likeCount: number }
      };
    }

    return { success: false, message: result.message || "Failed to like blog" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// ── Blog Tag ──────────────────────────────────────────────

export async function createBlogTagAction(
  payload: CreateBlogTagInput,
  token: string,
): Promise<ActionResult<BlogTag>> {
  try {
    const res = await fetch(`${API_URL}/blogs/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidateTag("blog-tags", "max");
      return {
        success: true,
        message: result.message || "Tag created successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create tag",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateBlogTagAction(
  id: string,
  payload: UpdateBlogTagInput,
  token: string,
): Promise<ActionResult<BlogTag>> {
  try {
    const res = await fetch(`${API_URL}/blogs/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidateTag("blog-tags", "max");
      return {
        success: true,
        message: result.message || "Tag updated successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update tag",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteBlogTagAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidateTag("blog-tags", "max");
      return {
        success: true,
        message: result.message || "Tag deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete tag",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// ── Blog Comment ──────────────────────────────────────────

// Public — no token needed
// ipAddress is extracted server-side from req.ip — do NOT send from frontend
export async function createCommentAction(
  payload: CreateBlogCommentInput,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      // Note: revalidating by blogId (not slug) — slug-based page uses cache: "no-store"
      revalidatePath(`/blogs`);
      return {
        success: true,
        message: result.message || "Comment submitted, pending approval",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to submit comment",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function approveCommentAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/comments/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs/comments");
      return {
        success: true,
        message: result.message || "Comment approved successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to approve comment",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteCommentAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs/comments");
      return {
        success: true,
        message: result.message || "Comment deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete comment",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
