"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { GoogleAuthButton } from "@/components/modules/auth/GoogleAuthButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackURL?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  callbackURL,
}: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[33vh] px-4 bg-zinc-950/20 dark:bg-black/40 backdrop-blur-xs transition-all duration-300">
      {/* Click outside → close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ─── Main Modal ─── */}
      <motion.div
        // initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-3 border-b border-zinc-200 dark:border-zinc-800/60">
          {/* <LogIn className="text-text-primary w-5 h-5 shrink-0" /> */}
          <span className="w-full font-normal tracking-wide text-zinc-900 dark:text-zinc-100">
            Login to Share Feedback
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-xs font-medium leading-4 font-mono text-text-primary border border-zinc-200 dark:border-zinc-700 p-1.5 rounded-sm bg-white hover:bg-[#E5E7EB] dark:bg-zinc-800 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
            Please login to share your experience and feedback.
          </p>
          <GoogleAuthButton mode="login" callbackURL={callbackURL} />
        </div>
      </motion.div>
    </div>
  );
}
