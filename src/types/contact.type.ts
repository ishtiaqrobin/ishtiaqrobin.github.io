/**
 * Contact domain types — mirrors the backend Prisma `Contact` model
 * and the Zod validation contract.
 */

export type ContactStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

export const CONTACT_STATUSES: ContactStatus[] = [
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
];

export interface IContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string | null;
  status: ContactStatus;
  adminNote: string | null;
  ipAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── DTO inputs ───────────────────────────────────────────

export interface ICreateContactInput {
  name: string;
  email: string;
  subject: string;
  message?: string;
  ipAddress?: string;
}

export interface IUpdateContactInput {
  status?: ContactStatus;
  adminNote?: string;
}

export interface IContactQueryInput {
  status?: ContactStatus;
  startDate?: string;
  endDate?: string;
}

// ─── Stats ────────────────────────────────────────────────

export interface IContactStat {
  status: ContactStatus;
  total: number;
}
