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

export async function createEducationAction(
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/educations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/education");
      revalidateTag("education", "max");
      return { success: true, message: result.message || "Education created successfully" };
    }

    return { success: false, message: result.message || "Failed to create education" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateEducationAction(
  id: string,
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/educations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/education");
      revalidateTag("education", "max");
      return { success: true, message: result.message || "Education updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update education" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteEducationAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/educations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/education");
      revalidateTag("education", "max");
      return { success: true, message: result.message || "Education deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete education" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
