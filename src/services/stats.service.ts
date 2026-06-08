import { env } from "@/env";
import type { IStats } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

export const statsService = {
  /**
   * Get public statistics (no auth)
   * GET /public-stats
   */
  getStats: async function (): Promise<Result<IStats>> {
    try {
      const res = await fetch(`${API_URL}/public-stats`, {
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching stats:", err);
      return { data: null, error: toError(err, "Error fetching stats") };
    }
  },

  /**
   * Update public statistics (admin only)
   * PATCH /public-stats
   */
  updateStats: async function (
    token: string,
    payload: Partial<IStats>,
  ): Promise<Result<IStats>> {
    try {
      const res = await fetch(`${API_URL}/public-stats`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating stats:", err);
      return { data: null, error: toError(err, "Error updating stats") };
    }
  },
};
