/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IGallery } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const galleryService = {
  async getGalleries(): Promise<{
    data: IGallery[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/galleries`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch gallery");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
