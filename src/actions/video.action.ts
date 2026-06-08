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

export async function createVideoAction(
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/");
      revalidateTag("video", "max");
      return {
        success: true,
        message: result.message || "Video created successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create video",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateVideoAction(
  id: string,
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/");
      revalidateTag("video", "max");
      return {
        success: true,
        message: result.message || "Video updated successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update video",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteVideoAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/videos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/");
      revalidateTag("video", "max");
      return {
        success: true,
        message: result.message || "Video deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete video",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
