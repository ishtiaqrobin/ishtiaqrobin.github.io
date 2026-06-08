import { env } from "@/env";
import type {
  IAiProviderConfig,
  IChatbotConfig,
  ICreateAiProviderConfigInput,
  ICreateChatbotConfigInput,
  ISendMessageInput,
  ISendMessageResponse,
  IUpdateAiProviderConfigInput,
  IUpdateChatbotConfigInput,
} from "@/types/chatbot.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

export const chatbotService = {
  // ── Chat (Public) ─────────────────────────────────────────────────

  /**
   * Send a chat message (public)
   * POST /chatbot/send
   */
  sendMessage: async function (
    payload: ISendMessageInput,
  ): Promise<Result<ISendMessageResponse>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error sending chatbot message:", err);
      return { data: null, error: toError(err, "Error sending message") };
    }
  },

  // ── AI Provider Config (Admin) ────────────────────────────────────

  /**
   * Get AI provider config (admin only)
   * GET /chatbot/ai-config
   */
  getAiProviderConfig: async function (
    token: string,
  ): Promise<Result<IAiProviderConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/ai-config`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching AI provider config:", err);
      return {
        data: null,
        error: toError(err, "Error fetching AI provider config"),
      };
    }
  },

  /**
   * Upsert AI provider config (admin only)
   * POST /chatbot/ai-config
   */
  upsertAiProviderConfig: async function (
    token: string,
    payload: ICreateAiProviderConfigInput,
  ): Promise<Result<IAiProviderConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/ai-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error upserting AI provider config:", err);
      return {
        data: null,
        error: toError(err, "Error saving AI provider config"),
      };
    }
  },

  /**
   * Update AI provider config (admin only)
   * PUT /chatbot/ai-config
   */
  updateAiProviderConfig: async function (
    token: string,
    payload: IUpdateAiProviderConfigInput,
  ): Promise<Result<IAiProviderConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/ai-config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating AI provider config:", err);
      return {
        data: null,
        error: toError(err, "Error updating AI provider config"),
      };
    }
  },

  // ── Chatbot Config (Admin) ────────────────────────────────────────

  /**
   * Get chatbot config (admin only)
   * GET /chatbot/config
   */
  getChatbotConfig: async function (
    token: string,
  ): Promise<Result<IChatbotConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/config`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching chatbot config:", err);
      return {
        data: null,
        error: toError(err, "Error fetching chatbot config"),
      };
    }
  },

  /**
   * Upsert chatbot config (admin only)
   * POST /chatbot/config
   */
  upsertChatbotConfig: async function (
    token: string,
    payload: ICreateChatbotConfigInput,
  ): Promise<Result<IChatbotConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error upserting chatbot config:", err);
      return {
        data: null,
        error: toError(err, "Error saving chatbot config"),
      };
    }
  },

  /**
   * Update chatbot config (admin only)
   * PUT /chatbot/config
   */
  updateChatbotConfig: async function (
    token: string,
    payload: IUpdateChatbotConfigInput,
  ): Promise<Result<IChatbotConfig>> {
    try {
      const res = await fetch(`${API_URL}/chatbot/config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating chatbot config:", err);
      return {
        data: null,
        error: toError(err, "Error updating chatbot config"),
      };
    }
  },
};
