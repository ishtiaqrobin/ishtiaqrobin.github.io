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

export async function createFaqAction(
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/faqs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/faqs");
      revalidateTag("faq", "max");
      return { success: true, message: result.message || "FAQ created successfully" };
    }

    return { success: false, message: result.message || "Failed to create FAQ" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateFaqAction(
  id: string,
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/faqs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/faqs");
      revalidateTag("faq", "max");
      return { success: true, message: result.message || "FAQ updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update FAQ" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteFaqAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/faqs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/faqs");
      revalidateTag("faq", "max");
      return { success: true, message: result.message || "FAQ deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete FAQ" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
