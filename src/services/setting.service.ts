import { env } from "@/env";
import { ISettings } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

export const settingService = {
  /**
   * Get all platform settings
   */
  getSettings: async function (): Promise<{
    data: ISettings | null;
    error: ServiceError | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`,
        );
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error fetching settings:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching settings",
        },
      };
    }
  },

  /**
   * Update platform settings
   */
  updateSettings: async function (
    token: string,
    payload: Partial<ISettings>,
  ): Promise<{ data: ISettings | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`,
        );
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error updating settings:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error updating settings",
        },
      };
    }
  },
};
