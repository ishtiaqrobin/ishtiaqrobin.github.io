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

export async function createServiceAction(
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/services");
      revalidateTag("service", "max");
      return { success: true, message: result.message || "Service created successfully" };
    }

    return { success: false, message: result.message || "Failed to create service" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function updateServiceAction(
  id: string,
  data: any,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/services");
      revalidateTag("service", "max");
      return { success: true, message: result.message || "Service updated successfully" };
    }

    return { success: false, message: result.message || "Failed to update service" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

export async function deleteServiceAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard/services");
      revalidateTag("service", "max");
      return { success: true, message: result.message || "Service deleted successfully" };
    }

    return { success: false, message: result.message || "Failed to delete service" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
