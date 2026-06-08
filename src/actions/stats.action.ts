/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { statsService } from "@/services/stats.service";
import type { IStats } from "@/types";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function updateStatsAction(
  data: Partial<IStats>,
  token: string,
): Promise<ActionResult> {
  try {
    const { data: updated, error } = await statsService.updateStats(
      token,
      data,
    );

    if (error) return { success: false, message: error.message };

    revalidatePath("/");
    revalidateTag("stats", "max");

    return {
      success: true,
      message: "Statistics updated successfully",
      data: updated,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
