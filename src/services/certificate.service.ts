import { env } from "@/env";
import type { ICategory, ICategoryPayload } from "@/types/certificate.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

export const certificateService = {
  // ─── Public ────────────────────────────────────────────────────

  /**
   * Get all certificates — optionally filter by isPublished
   * GET /certificates?isPublished=true
   */
  getCertificates: async function (
    isPublished?: boolean,
  ): Promise<Result<ICategory[]>> {
    try {
      const qs = isPublished !== undefined ? `?isPublished=${isPublished}` : "";
      const res = await fetch(`${API_URL}/certificates${qs}`, {
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching certificates:", err);
      return { data: null, error: toError(err, "Error fetching certificates") };
    }
  },

  /**
   * Get single certificate by ID
   * GET /certificates/:id
   */
  getCertificateById: async function (id: string): Promise<Result<ICategory>> {
    try {
      const res = await fetch(`${API_URL}/certificates/${id}`, {
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching certificate:", err);
      return { data: null, error: toError(err, "Error fetching certificate") };
    }
  },

  // ─── Admin only ────────────────────────────────────────────────

  /**
   * Create certificate with optional image upload
   * POST /certificates  (multipart/form-data)
   */
  createCertificate: async function (
    token: string,
    payload: ICategoryPayload,
    imageFile?: File,
  ): Promise<Result<ICategory>> {
    try {
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const res = await fetch(`${API_URL}/certificates`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error creating certificate:", err);
      return {
        data: null,
        error: toError(err, "Error creating certificate"),
      };
    }
  },

  /**
   * Update certificate
   * PUT /certificates/:id  (multipart/form-data)
   */
  updateCertificate: async function (
    token: string,
    id: string,
    payload: Partial<ICategoryPayload>,
    imageFile?: File,
  ): Promise<Result<ICategory>> {
    try {
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const res = await fetch(`${API_URL}/certificates/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating certificate:", err);
      return {
        data: null,
        error: toError(err, "Error updating certificate"),
      };
    }
  },

  /**
   * Delete certificate
   * DELETE /certificates/:id
   */
  deleteCertificate: async function (
    token: string,
    id: string,
  ): Promise<Result<null>> {
    try {
      const res = await fetch(`${API_URL}/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: null, error: null };
    } catch (err) {
      console.error("Error deleting certificate:", err);
      return {
        data: null,
        error: toError(err, "Error deleting certificate"),
      };
    }
  },
};
