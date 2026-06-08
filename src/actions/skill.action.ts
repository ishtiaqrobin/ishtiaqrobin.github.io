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

export async function createSkillAction(
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/skills");
      revalidateTag("skill", "max");
      return {
        success: true,
        message: result.message || "Skill created successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create skill",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateSkillAction(
  id: string,
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/skills");
      revalidateTag("skill", "max");
      return {
        success: true,
        message: result.message || "Skill updated successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update skill",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteSkillAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/skills/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/skills");
      revalidateTag("skill", "max");
      return {
        success: true,
        message: result.message || "Skill deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete skill",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
