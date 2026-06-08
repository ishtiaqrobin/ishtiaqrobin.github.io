/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { appointmentService } from "@/services/appointment.service";
import type {
  ICreateAppointmentSlotInput,
  IUpdateAppointmentSlotInput,
  IUpdateAppointmentStatusInput,
} from "@/types/appointment.type";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Create appointment slot (admin only)
 */
export async function createAppointmentSlotAction(
  payload: ICreateAppointmentSlotInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await appointmentService.createAppointmentSlot(
      token,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/appointments");
    revalidateTag("appointments", "max");

    return {
      success: true,
      message: "Appointment slot created successfully",
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
 * Update appointment slot (admin only)
 */
export async function updateAppointmentSlotAction(
  slotId: string,
  payload: IUpdateAppointmentSlotInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await appointmentService.updateAppointmentSlot(
      token,
      slotId,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/appointments");
    revalidateTag("appointments", "max");

    return {
      success: true,
      message: "Appointment slot updated successfully",
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
 * Delete appointment slot (admin only)
 */
export async function deleteAppointmentSlotAction(
  slotId: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await appointmentService.deleteAppointmentSlot(
      token,
      slotId,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/appointments");
    revalidateTag("appointments", "max");

    return {
      success: true,
      message: "Appointment slot deleted successfully",
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
 * Update appointment status (admin only)
 */
export async function updateAppointmentStatusAction(
  appointmentId: string,
  payload: IUpdateAppointmentStatusInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await appointmentService.updateAppointmentStatus(
      token,
      appointmentId,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/appointments");
    revalidateTag("appointments", "max");

    return {
      success: true,
      message: "Appointment status updated successfully",
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
 * Delete appointment (admin only)
 */
export async function deleteAppointmentAction(
  appointmentId: string,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await appointmentService.deleteAppointment(
      token,
      appointmentId,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/appointments");
    revalidateTag("appointments", "max");

    return {
      success: true,
      message: "Appointment deleted successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
