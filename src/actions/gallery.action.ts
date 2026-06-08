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

export async function createGalleryAction(
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/galleries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/gallery");
      revalidateTag("gallery", "max");
      return {
        success: true,
        message: result.message || "Gallery created successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create gallery",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateGalleryAction(
  id: string,
  formData: FormData,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/galleries/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/gallery");
      revalidateTag("gallery", "max");
      return {
        success: true,
        message: result.message || "Gallery updated successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update gallery",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteGalleryAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/galleries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/gallery");
      revalidateTag("gallery", "max");
      return {
        success: true,
        message: result.message || "Gallery deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete gallery",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
