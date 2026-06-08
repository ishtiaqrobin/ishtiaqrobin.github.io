/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { ISkill } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

export const skillService = {
  /**
   * Get all skills
   */
  getSkills: async function (): Promise<{
    data: ISkill[] | null;
    error: ServiceError | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/skills`, {
        cache: "no-store",
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || `HTTP error! status: ${res.status}`);
      }

      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error fetching skills:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error fetching skills",
        },
      };
    }
  },

  /**
   * Create skill
   */
  createSkill: async function (
    token: string,
    data: any,
  ): Promise<{ data: ISkill | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || `HTTP error! status: ${res.status}`);
      }

      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error creating skill:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error creating skill",
        },
      };
    }
  },

  /**
   * Update skill
   */
  updateSkill: async function (
    token: string,
    id: string,
    data: any,
  ): Promise<{ data: ISkill | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || `HTTP error! status: ${res.status}`);
      }

      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error updating skill:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error updating skill",
        },
      };
    }
  },

  /**
   * Delete skill
   */
  deleteSkill: async function (
    token: string,
    id: string,
  ): Promise<{ data: ISkill | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || `HTTP error! status: ${res.status}`);
      }

      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error deleting skill:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error deleting skill",
        },
      };
    }
  },
};
