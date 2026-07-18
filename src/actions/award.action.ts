"use server";

import { env } from "@/env";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function createAwardAction(
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/awards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/awards");
      revalidateTag("award", "max");
      return { success: true, message: result.message || "Award created successfully" };
    }

    return { success: false, message: result.message || "Failed to create award" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateAwardAction(
  id: string,
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/awards/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/awards");
      revalidateTag("award", "max");
      return { success: true, message: result.message || "Award updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update award" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteAwardAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/awards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/awards");
      revalidateTag("award", "max");
      return { success: true, message: result.message || "Award deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete award" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
