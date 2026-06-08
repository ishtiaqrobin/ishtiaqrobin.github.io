/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { settingService } from "@/services/setting.service";
import type { ISettings } from "@/types";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function updateSettingsAction(
  data: Partial<ISettings>,
  token: string,
): Promise<ActionResult> {
  try {
    const { data: updated, error } = await settingService.updateSettings(
      token,
      data,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/");
    revalidateTag("settings", "max");

    return {
      success: true,
      message: "Settings updated successfully",
      data: updated,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
