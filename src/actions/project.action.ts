/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function createProjectAction(
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/projects");
      revalidateTag("project", "max");
      return { success: true, message: result.message || "Project created successfully" };
    }

    return { success: false, message: result.message || "Failed to create project" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateProjectAction(
  id: string,
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/projects");
      revalidateTag("project", "max");
      return { success: true, message: result.message || "Project updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update project" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteProjectAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/projects");
      revalidateTag("project", "max");
      return { success: true, message: result.message || "Project deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete project" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
