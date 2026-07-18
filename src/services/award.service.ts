import { env } from "@/env";
import { IAward } from "@/types/awards.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const awardService = {
  async getAwards(): Promise<{
    data: IAward[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/awards`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch awards");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
