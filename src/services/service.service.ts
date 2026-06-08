/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IService } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const portfolioService = {
  async getServices(): Promise<{
    data: IService[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/services`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch services");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
