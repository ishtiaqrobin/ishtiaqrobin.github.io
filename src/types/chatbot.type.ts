/**
 * Chatbot domain types — mirrors the backend Prisma
 * `ChatbotConfig` and `AiProviderConfig` models.
 */

// ── AI Provider Config ────────────────────────────────────

export interface IAiProviderConfig {
  id: string;
  provider: string; // "gemini" | "openai" | "groq" | "river" | "custom"
  apiKey: string;
  model: string;
  endpoint: string | null;
  maxTokens: number;
  temperature: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAiProviderConfigInput {
  provider: string;
  apiKey: string;
  model: string;
  endpoint?: string | null;
  maxTokens?: number;
  temperature?: number;
  isEnabled?: boolean;
}

export type IUpdateAiProviderConfigInput =
  Partial<ICreateAiProviderConfigInput>;

// ── Test Connection ───────────────────────────────────────

/**
 * সব field optional — না দিলে backend saved config ব্যবহার করবে।
 * Dashboard থেকে save না করেই test করা যাবে।
 */
export interface ITestAiProviderInput {
  provider?: string;
  apiKey?: string;
  model?: string;
  endpoint?: string | null;
  maxTokens?: number;
  temperature?: number;
}

export interface ITestAiProviderResult {
  success: boolean;
  provider: string;
  model: string;
  endpoint: string | null;
  latencyMs: number;
  reply: string | null;
  message: string;
}

// ── Chatbot Config ────────────────────────────────────────

export interface IChatbotConfig {
  id: string;
  isEnabled: boolean;
  botName: string;
  welcomeMsg: string | null;
  systemPrompt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateChatbotConfigInput {
  isEnabled?: boolean;
  botName?: string;
  welcomeMsg?: string;
  systemPrompt?: string;
}

export type IUpdateChatbotConfigInput = Partial<ICreateChatbotConfigInput>;

// ── Chat ──────────────────────────────────────────────────

export interface ISendMessageInput {
  message: string;
  sessionId: string;
}

export interface ISendMessageResponse {
  reply: string;
  sessionId: string;
  botName: string;
}

// ── UI state ──────────────────────────────────────────────

export interface IChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ── Chatbot Log ───────────────────────────────────────────

export interface IChatbotLog {
  id: string;
  sessionId: string;
  role: string;
  message: string;
  ipAddress: string | null;
  createdAt: string;
}

export interface IChatbotLogResponse {
  data: IChatbotLog[];
  meta: { total: number };
}
