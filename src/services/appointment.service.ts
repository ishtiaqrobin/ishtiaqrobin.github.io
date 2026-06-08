import { env } from "@/env";
import type {
  IAppointment,
  IAppointmentSlot,
  ICreateAppointmentInput,
  ICreateAppointmentSlotInput,
  IUpdateAppointmentInput,
  IUpdateAppointmentStatusInput,
  IUpdateAppointmentSlotInput,
} from "@/types/appointment.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

type Result<T> = { data: T | null; error: ServiceError | null };

const toError = (err: unknown, fallback: string): ServiceError => ({
  message: err instanceof Error ? err.message : fallback,
});

export const appointmentService = {
  // ─── Appointment Slot (public) ─────────────────────────────────────

  /**
   * Get all appointment slots (public — for booking form)
   * GET /appointments/slots
   */
  getAppointmentSlots: async function (): Promise<Result<IAppointmentSlot[]>> {
    try {
      const res = await fetch(`${API_URL}/appointments/slots`, {
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching appointment slots:", err);
      return {
        data: null,
        error: toError(err, "Error fetching appointment slots"),
      };
    }
  },

  /**
   * Get only available appointment slots (public)
   * GET /appointments/slots/available
   */
  getAvailableSlots: async function (): Promise<Result<IAppointmentSlot[]>> {
    try {
      const res = await fetch(`${API_URL}/appointments/slots/available`, {
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching available slots:", err);
      return {
        data: null,
        error: toError(err, "Error fetching available slots"),
      };
    }
  },

  // ─── Appointment Slot (admin only) ─────────────────────────────────

  /**
   * Create appointment slot (admin only)
   * POST /appointments/slots
   */
  createAppointmentSlot: async function (
    token: string,
    payload: ICreateAppointmentSlotInput,
  ): Promise<Result<IAppointmentSlot>> {
    try {
      const res = await fetch(`${API_URL}/appointments/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error creating appointment slot:", err);
      return {
        data: null,
        error: toError(err, "Error creating appointment slot"),
      };
    }
  },

  /**
   * Update appointment slot (admin only)
   * PUT /appointments/slots/:slotId
   */
  updateAppointmentSlot: async function (
    token: string,
    slotId: string,
    payload: IUpdateAppointmentSlotInput,
  ): Promise<Result<IAppointmentSlot>> {
    try {
      const res = await fetch(`${API_URL}/appointments/slots/${slotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating appointment slot:", err);
      return {
        data: null,
        error: toError(err, "Error updating appointment slot"),
      };
    }
  },

  /**
   * Delete appointment slot (admin only)
   * DELETE /appointments/slots/:slotId
   */
  deleteAppointmentSlot: async function (
    token: string,
    slotId: string,
  ): Promise<Result<IAppointmentSlot>> {
    try {
      const res = await fetch(`${API_URL}/appointments/slots/${slotId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error deleting appointment slot:", err);
      return {
        data: null,
        error: toError(err, "Error deleting appointment slot"),
      };
    }
  },

  // ─── Appointment (public) ──────────────────────────────────────────

  /**
   * Book an appointment (public)
   * POST /appointments
   */
  bookAppointment: async function (
    payload: ICreateAppointmentInput,
  ): Promise<Result<IAppointment>> {
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error booking appointment:", err);
      return {
        data: null,
        error: toError(err, "Error booking appointment"),
      };
    }
  },

  // ─── Appointment (admin only) ──────────────────────────────────────

  /**
   * Get all appointments (admin only)
   * GET /appointments
   */
  getAppointments: async function (
    token: string,
  ): Promise<Result<IAppointment[]>> {
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return {
        data: null,
        error: toError(err, "Error fetching appointments"),
      };
    }
  },

  /**
   * Get a single appointment by ID (admin only)
   * GET /appointments/:appointmentId
   */
  getAppointmentById: async function (
    token: string,
    appointmentId: string,
  ): Promise<Result<IAppointment>> {
    try {
      const res = await fetch(`${API_URL}/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error fetching appointment:", err);
      return {
        data: null,
        error: toError(err, "Error fetching appointment"),
      };
    }
  },

  /**
   * Update appointment details (admin only)
   * PUT /appointments/:appointmentId
   */
  updateAppointment: async function (
    token: string,
    appointmentId: string,
    payload: IUpdateAppointmentInput,
  ): Promise<Result<IAppointment>> {
    try {
      const res = await fetch(`${API_URL}/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating appointment:", err);
      return {
        data: null,
        error: toError(err, "Error updating appointment"),
      };
    }
  },

  /**
   * Update appointment status — confirm / cancel / complete (admin only)
   * PATCH /appointments/:appointmentId/status
   */
  updateAppointmentStatus: async function (
    token: string,
    appointmentId: string,
    payload: IUpdateAppointmentStatusInput,
  ): Promise<Result<IAppointment>> {
    try {
      const res = await fetch(
        `${API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error updating appointment status:", err);
      return {
        data: null,
        error: toError(err, "Error updating appointment status"),
      };
    }
  },

  /**
   * Delete an appointment (admin only)
   * DELETE /appointments/:appointmentId
   */
  deleteAppointment: async function (
    token: string,
    appointmentId: string,
  ): Promise<Result<IAppointment>> {
    try {
      const res = await fetch(`${API_URL}/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      return { data: json.data, error: null };
    } catch (err) {
      console.error("Error deleting appointment:", err);
      return {
        data: null,
        error: toError(err, "Error deleting appointment"),
      };
    }
  },
};
