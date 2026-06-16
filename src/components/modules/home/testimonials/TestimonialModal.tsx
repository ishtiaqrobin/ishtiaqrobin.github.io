"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, X } from "lucide-react";
import { IReview, IReviewForm } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  existingReview?: IReview | null;
  onSuccess?: () => void;
}

// ─── Validation helper ────────────────────────────────────────────────────────

function validate(form: IReviewForm): Partial<IReviewForm> {
  const errors: Partial<IReviewForm> = {};
  if (!form.position.trim()) errors.position = "Position is required.";
  else if (form.position.trim().length < 2)
    errors.position = "Position must be at least 2 characters.";

  if (!form.companyName.trim())
    errors.companyName = "Company name is required.";
  else if (form.companyName.trim().length < 2)
    errors.companyName = "Company name must be at least 2 characters.";

  if (!form.comment.trim()) errors.comment = "Comment is required.";
  else if (form.comment.trim().length < 20)
    errors.comment = "Comment must be at least 20 characters.";
  else if (form.comment.trim().length > 500)
    errors.comment = "Comment must be under 500 characters.";

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestimonialModal({
  isOpen,
  onClose,
  token,
  existingReview,
  onSuccess,
}: TestimonialModalProps) {
  const isUpdate = !!existingReview;

  const [form, setForm] = useState<IReviewForm>({
    position: "",
    companyName: "Personal",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<IReviewForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);

  // ── Pre-fill on edit ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setForm({
          position: existingReview.position,
          companyName: existingReview.companyName,
          comment: existingReview.comment,
        });
      } else {
        setForm({ position: "", companyName: "Personal", comment: "" });
      }
      setErrors({});
      setServerError(null);

      // Focus first field and lock body scroll — same pattern as SearchModal
      setTimeout(() => firstInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, existingReview, onClose]);

  if (!isOpen) return null;

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on edit
    if (errors[name as keyof IReviewForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const { createOrUpdateReviewAction } =
        await import("@/actions/review.action");
      const result = await createOrUpdateReviewAction(
        form,
        token,
        existingReview?.id,
      );

      if (result.success) {
        onSuccess?.();
        onClose();
      } else {
        setServerError(result.message || "Something went wrong.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    /* ─── Background Backdrop ─── */
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-zinc-950/20 dark:bg-black/40 backdrop-blur-xs transition-all duration-300">
      {/* Click outside → close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ─── Main Modal ─── */}
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col will-change-transform z-10"
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 p-3 text-lg leading-7 font-normal border-b border-zinc-200 dark:border-zinc-800/60">
          <MessageSquareQuote className="text-text-primary w-5 h-5 shrink-0" />
          <span className="w-full font-normal tracking-wide text-zinc-900 dark:text-zinc-100">
            {isUpdate ? "Update Feedback" : "Write a Review"}
          </span>
          {/* Close Badge — mirrors ESC badge in SearchModal */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-xs font-medium leading-4 font-mono text-text-primary border border-zinc-200 dark:border-zinc-700 p-1.5 rounded-sm bg-white hover:bg-[#E5E7EB] dark:bg-zinc-800 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── Form Body ── */}
        <div className="flex flex-col gap-4 p-5">
          {/* Server error */}
          {serverError && (
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          {/* Position */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium leading-5 text-zinc-700 dark:text-zinc-300">
              Position
            </label>
            <Input
              ref={firstInputRef}
              name="position"
              type="text"
              value={form.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={`w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus-visible:ring-2 transition-colors duration-200 ${
                errors.position
                  ? "border-red-400 dark:border-red-600"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            />
            {errors.position && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.position}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium leading-5 text-zinc-700 dark:text-zinc-300">
              Company Name{" "}
              <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                (use &quot;Personal&quot; if none)
              </span>
            </label>
            <Input
              name="companyName"
              type="text"
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g. TechCorp or Personal"
              className={`w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus-visible:ring-2 transition-colors duration-200 ${
                errors.companyName
                  ? "border-red-400 dark:border-red-600"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            />
            {errors.companyName && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium leading-5 text-zinc-700 dark:text-zinc-300">
              Comment
            </label>
            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Share your experience working with me..."
              rows={4}
              className={`w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus-visible:ring-2 resize-none transition-colors duration-200 ${
                errors.comment
                  ? "border-red-400 dark:border-red-600"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            />
            <div className="flex items-center justify-between">
              {errors.comment ? (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.comment}
                </p>
              ) : (
                <span />
              )}
              <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">
                {form.comment.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium leading-5 text-text-primary border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 hover:bg-[#E5E7EB] dark:hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium leading-5 text-white dark:text-accent bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? isUpdate
                ? "Updating..."
                : "Submitting..."
              : isUpdate
                ? "Update Feedback"
                : "Submit Review"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
