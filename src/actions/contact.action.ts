/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { contactService } from "@/services/contact.service";
import type { IUpdateContactInput } from "@/types/contact.type";
import { contactSchema } from "@/lib/validation";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export const initialContactFormState: ActionResult = {
  success: false,
  message: "",
};

/**
 * Submit the public contact form.
 *
 * This uses a Server Action so the form has a progressive-enhancement path and
 * can expose its pending state through React's useActionState/useFormStatus.
 */
export async function submitContactAction(
  _previousState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const validated = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Please check your form fields.",
    };
  }

  const { error } = await contactService.createContact({
    ...validated.data,
    subject: "Portfolio Contact Form",
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin-dashboard/contact");
  return { success: true, message: "Message sent successfully!" };
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
