import { env } from "@/env";
import type {
  IContact,
  IContactQueryInput,
  IContactStat,
  ICreateContactInput,
  IUpdateContactInput,
} from "@/types/contact.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

const buildQuery = (params: Record<string, string | undefined>): string => {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "",
  ) as [string, string][];
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries).toString()}`;
};

export const contactService = {
  // ─── Public ───────────────────────────────────────────────────────

  /**
   * Submit contact form (public)
   * POST /contacts
   */
  createContact: async function (
    payload: ICreateContactInput,
  ): Promise<Result<IContact>> {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error submitting contact:", err);
      return { data: null, error: toError(err, "Error submitting contact") };
    }
  },

  // ─── Admin ────────────────────────────────────────────────────────

  /**
   * Get all contacts with optional filters (admin)
   * GET /contacts?status=UNREAD&startDate=...&endDate=...
   */
  getAllContacts: async function (
    token: string,
    query: IContactQueryInput = {},
  ): Promise<Result<IContact[]>> {
    try {
      const qs = buildQuery({
        status: query.status,
        startDate: query.startDate,
        endDate: query.endDate,
      });

      const res = await fetch(`${API_URL}/contacts${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching contacts:", err);
      return { data: null, error: toError(err, "Error fetching contacts") };
    }
  },

  /**
   * Get a single contact by ID (admin)
   * GET /contacts/:id
   */
  getContactById: async function (
    token: string,
    id: string,
  ): Promise<Result<IContact>> {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching contact:", err);
      return { data: null, error: toError(err, "Error fetching contact") };
    }
  },

  /**
   * Get contact stats grouped by status (admin)
   * GET /contacts/stats
   */
  getContactStats: async function (
    token: string,
  ): Promise<Result<IContactStat[]>> {
    try {
      const res = await fetch(`${API_URL}/contacts/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching contact stats:", err);
      return {
        data: null,
        error: toError(err, "Error fetching contact stats"),
      };
    }
  },

  /**
   * Update contact status / admin note (admin)
   * PATCH /contacts/:id
   */
  updateContact: async function (
    token: string,
    id: string,
    payload: IUpdateContactInput,
  ): Promise<Result<IContact>> {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating contact:", err);
      return { data: null, error: toError(err, "Error updating contact") };
    }
  },

  /**
   * Delete a contact (admin)
   * DELETE /contacts/:id
   */
  deleteContact: async function (
    token: string,
    id: string,
  ): Promise<Result<IContact>> {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error deleting contact:", err);
      return { data: null, error: toError(err, "Error deleting contact") };
    }
  },
};
