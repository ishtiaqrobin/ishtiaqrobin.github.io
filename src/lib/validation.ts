import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export const feedbackSchema = z.object({
  position: z
    .string()
    .min(1, { message: "Position must be at least 1 characters." }),
  company: z
    .string()
    .min(1, { message: "Company must be at least 1 characters." }),
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters." }),
});

export const updateFeedbackSchema = z.object({
  position: z.string().optional(),
  company: z.string().optional(),
  feedback: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
export type UpdateFeedbackFormValues = z.infer<typeof updateFeedbackSchema>;
