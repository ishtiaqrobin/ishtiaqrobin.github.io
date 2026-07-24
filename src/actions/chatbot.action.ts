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

// ── Chatbot Logs ───────────────────────────────────────────

/**
 * Get chatbot logs (admin only)
 */
export async function getChatbotLogsAction(
  token: string,
  limit?: number,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.getChatbotLogs(token, limit);

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: "Retrieved chatbot logs successfully",
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}

/**
 * Delete chatbot logs (admin only)
 * If sessionId is provided, deletes only that session's logs.
 * If sessionId is omitted, deletes ALL logs.
 */
export async function deleteChatbotLogsAction(
  token: string,
  sessionId?: string,
): Promise<ActionResult> {
  try {
    const { data, error } = await chatbotService.deleteChatbotLogs(
      token,
      sessionId,
    );

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/admin-dashboard/chatbot");

    return {
      success: true,
      message: data?.message || "Chatbot logs deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
    };
  }
}
