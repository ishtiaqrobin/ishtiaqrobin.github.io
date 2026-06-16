/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IReview } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  // Public — approved only
  async getAllReviews(): Promise<{ data: IReview[] | null; error: any }> {
    try {
      const res = await fetch(`${API_URL}/reviews`, { cache: "no-store" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch reviews");
      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // Admin — all reviews including unapproved
  async getAllReviewsAdmin(
    token: string,
  ): Promise<{ data: IReview[] | null; error: any }> {
    try {
      const res = await fetch(`${API_URL}/reviews/admin`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Failed to fetch all reviews");
      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // User — own review(s)
  async getMyReview(
    token: string,
  ): Promise<{ data: IReview[] | null; error: any }> {
    try {
      const res = await fetch(`${API_URL}/reviews/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Failed to fetch your review");
      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
