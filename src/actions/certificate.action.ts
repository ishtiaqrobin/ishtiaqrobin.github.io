/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { certificateService } from "@/services/certificate.service";
import type { ICategoryPayload } from "@/types/certificate.type";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Create certificate (admin only)
 */
export async function createCertificateAction(
  payload: ICategoryPayload,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await certificateService.createCertificate(
      token,
      payload,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/certificates");
    revalidateTag("certificates", "max");

    return {
      success: true,
      message: "Certificate created successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

/**
 * Update certificate (admin only)
 */
export async function updateCertificateAction(
  id: string,
  payload: Partial<ICategoryPayload>,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await certificateService.updateCertificate(
      token,
      id,
      payload,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/certificates");
    revalidateTag("certificates", "max");

    return {
      success: true,
      message: "Certificate updated successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

/**
 * Delete certificate (admin only)
 */
export async function deleteCertificateAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await certificateService.deleteCertificate(
      token,
      id,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/certificates");
    revalidateTag("certificates", "max");

    return {
      success: true,
      message: "Certificate deleted successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

/**
 * Toggle certificate publish status (admin only)
 */
export async function toggleCertificatePublishAction(
  id: string,
  isPublished: boolean,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await certificateService.updateCertificate(
      token,
      id,
      { isPublished },
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/certificates");
    revalidateTag("certificates", "max");

    return {
      success: true,
      message: `Certificate ${isPublished ? "published" : "unpublished"} successfully`,
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
