/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IEducation } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const educationService = {
  async getEducations(): Promise<{
    data: IEducation[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/educations`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch education");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
