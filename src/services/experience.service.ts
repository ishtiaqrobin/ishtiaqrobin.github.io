/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IExperience } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const experienceService = {
  async getExperiences(): Promise<{
    data: IExperience[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/experiences`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch experience");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
