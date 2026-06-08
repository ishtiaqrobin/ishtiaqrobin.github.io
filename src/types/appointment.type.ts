/**
 * Appointment domain types — mirrors the backend Prisma `Appointment`
 * and `AppointmentSlot` models and the Zod validation contract under
 * `Backend/src/app/modules/appointment`.
 */

/** Mirrors Prisma `AppointmentStatus` enum. */
export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
];

/** Day of week values used by `AppointmentSlot.dayOfWeek`. */
export const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export interface IAppointmentSlot {
  id: string;
  dayOfWeek: number; // 0 = Sunday … 6 = Saturday
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAppointment {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  topic: string;
  message?: string | null;
  date: string; // ISO datetime
  status: AppointmentStatus;
  meetLink?: string | null;
  adminNote?: string | null;
  slotId: string;
  slot?: IAppointmentSlot;
  createdAt: string;
  updatedAt: string;
}

// ─── DTO inputs ────────────────────────────────────────────────────────────

export interface ICreateAppointmentInput {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message?: string;
  date: string; // ISO string
  slotId: string;
}

export interface IUpdateAppointmentInput {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  date?: string;
  slotId?: string;
}

export interface IUpdateAppointmentStatusInput {
  status: AppointmentStatus;
  meetLink?: string;
  adminNote?: string;
}

export interface ICreateAppointmentSlotInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface IUpdateAppointmentSlotInput {
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
}
