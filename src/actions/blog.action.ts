/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { revalidatePath, revalidateTag } from "next/cache";
import { blogService } from "@/services/blog.service";
import type { ICreateBlogCommentInput } from "@/types/blog.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

// ── Blog CRUD ─────────────────────────────────────────────

export async function createBlogAction(
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidateTag("blog", "max");
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
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidatePath(`/blogs/${result.data?.slug ?? ""}`);
      revalidateTag("blog", "max");
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
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/blogs");
      revalidatePath("/blogs");
      revalidateTag("blog", "max");
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

// ── Tags ──────────────────────────────────────────────────

export async function createBlogTagAction(
  payload: { name: string; slug?: string },
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await blogService.createTag(token, payload);
    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/blogs");
    revalidateTag("blog", "max");
    return { success: true, message: "Tag created successfully", data };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

export async function deleteBlogTagAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { error } = await blogService.deleteTag(token, id);
    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/blogs");
    revalidateTag("blog", "max");
    return { success: true, message: "Tag deleted successfully" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

// ── Comments ──────────────────────────────────────────────

export async function createBlogCommentAction(
  blogId: string,
  payload: ICreateBlogCommentInput,
): Promise<ActionResult> {
  try {
    const { data, error } = await blogService.createComment(blogId, payload);
    if (error) return { success: false, message: error.message };

    return {
      success: true,
      message: "Comment submitted — it will appear after approval.",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

export async function approveBlogCommentAction(
  id: string,
  isApproved: boolean,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await blogService.approveComment(
      token,
      id,
      isApproved,
    );
    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/blogs");
    revalidateTag("blog", "max");
    return {
      success: true,
      message: isApproved ? "Comment approved" : "Comment unapproved",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

export async function deleteBlogCommentAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { error } = await blogService.deleteComment(token, id);
    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/blogs");
    revalidateTag("blog", "max");
    return { success: true, message: "Comment deleted successfully" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

// ── Likes ─────────────────────────────────────────────────

export async function likeBlogAction(id: string): Promise<ActionResult> {
  try {
    const { data, error } = await blogService.likeBlog(id);
    if (error) return { success: false, message: error.message };

    return {
      success: true,
      message: data?.message ?? "Liked",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
