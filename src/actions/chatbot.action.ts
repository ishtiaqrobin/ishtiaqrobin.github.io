/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { chatbotService } from "@/services/chatbot.service";
import type {
  ICreateAiProviderConfigInput,
  ICreateChatbotConfigInput,
  IUpdateAiProviderConfigInput,
  IUpdateChatbotConfigInput,
} from "@/types/chatbot.type";

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

// ── AI Provider Config ────────────────────────────────────

/**
 * Upsert AI provider config (admin only)
 */
export async function upsertAiProviderConfigAction(
  payload: ICreateAiProviderConfigInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.upsertAiProviderConfig(
      token,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/chatbot");

    return {
      success: true,
      message: "AI provider config saved successfully",
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
 * Update AI provider config (admin only)
 */
export async function updateAiProviderConfigAction(
  payload: IUpdateAiProviderConfigInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.updateAiProviderConfig(
      token,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/chatbot");

    return {
      success: true,
      message: "AI provider config updated successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

// ── Chatbot Config ────────────────────────────────────────

/**
 * Upsert chatbot config (admin only)
 */
export async function upsertChatbotConfigAction(
  payload: ICreateChatbotConfigInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.upsertChatbotConfig(
      token,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/chatbot");

    return {
      success: true,
      message: "Chatbot config saved successfully",
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
 * Update chatbot config (admin only)
 */
export async function updateChatbotConfigAction(
  payload: IUpdateChatbotConfigInput,
  token: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.updateChatbotConfig(
      token,
      payload,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/chatbot");

    return {
      success: true,
      message: "Chatbot config updated successfully",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
