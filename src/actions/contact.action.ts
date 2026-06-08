/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { contactService } from "@/services/contact.service";
import type { IUpdateContactInput } from "@/types/contact.type";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Update contact status / admin note (admin only)
 */
export async function updateContactAction(
  id: string,
  payload: IUpdateContactInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await contactService.updateContact(
      token,
      id,
      payload,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/contacts");

    return {
      success: true,
      message: "Contact updated successfully",
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
 * Delete a contact (admin only)
 */
export async function deleteContactAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await contactService.deleteContact(token, id);

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin-dashboard/contacts");

    return {
      success: true,
      message: "Contact deleted successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
