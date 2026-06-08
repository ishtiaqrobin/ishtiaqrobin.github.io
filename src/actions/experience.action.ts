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

export async function createExperienceAction(
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/experience");
      revalidateTag("experience", "max");
      return { success: true, message: result.message || "Experience created successfully" };
    }

    return { success: false, message: result.message || "Failed to create experience" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateExperienceAction(
  id: string,
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/experiences/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/experience");
      revalidateTag("experience", "max");
      return { success: true, message: result.message || "Experience updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update experience" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteExperienceAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/experiences/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/experience");
      revalidateTag("experience", "max");
      return { success: true, message: result.message || "Experience deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete experience" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
