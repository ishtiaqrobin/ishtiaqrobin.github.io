import { env } from "@/env";
import { Category, CategoryPayload } from "@/types/category.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

export const categoryService = {
  /**
   * Get all categories
   */
  getAllCategories: async function (): Promise<{
    data: Category[] | null;
    error: ServiceError | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/categories`, {
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
      console.error("Error fetching categories:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching categories",
        },
      };
    }
  },

  /**
   * Create category
   */
  createCategory: async function (
    token: string,
    payload: CategoryPayload,
  ): Promise<{ data: Category | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
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
      console.error("Error creating category:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error creating category",
        },
      };
    }
  },

  /**
   * Update category
   */
  updateCategory: async function (
    token: string,
    id: string,
    payload: CategoryPayload,
  ): Promise<{ data: Category | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
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
      console.error("Error updating category:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error updating category",
        },
      };
    }
  },

  /**
   * Delete category
   */
  deleteCategory: async function (
    token: string,
    id: string,
  ): Promise<{ data: Category | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      console.error("Error deleting category:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error deleting category",
        },
      };
    }
  },
};
