/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { IProject } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const projectService = {
  async getProjects(categoryId?: string): Promise<{
    data: IProject[] | null;
    error: any;
  }> {
    try {
      const url = categoryId 
        ? `${API_URL}/projects?categoryId=${categoryId}`
        : `${API_URL}/projects`;
        
      const res = await fetch(url, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch projects");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  async getCategories(): Promise<{
    data: any[] | null;
    error: any;
  }> {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch categories");
      }

      return { data: result.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
