"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  //   1. When Model open then focus on input field and close on ESC
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden"; // Background scroll disable
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* ─── Background Backdrop ─── */
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-zinc-950/20 dark:bg-black/40 backdrop-blur-xs transition-all duration-300">
      {/* When click outside then close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ─── Main Search Modal and Content ─── */}
      <motion.div
        // initial={{ opacity: 0, y: -20, scale: 0.98 }}
        // exit={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col will-change-transform z-10"
      >
        {/* Top part: Input field */}
        <div className="flex items-center gap-3 p-3 text-lg leading-7 font-normal border-b border-zinc-200 dark:border-zinc-800/60">
          <FiSearch className="text-text-primary w-5 h-5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full placeholder:text-text-primary placeholder:text-lg bg-transparent font-normal tracking-wide text-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 focus:outline-none"
          />
          {/* ESC Badge */}
          <span
            onClick={onClose}
            className="text-xs font-medium leading-4 font-mono text-text-primary border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded-sm bg-white hover:bg-[#E5E7EB] dark:bg-zinc-800 cursor-pointer shrink-0"
          >
            ESC
          </span>
        </div>

        {/* Bottom part: Category filters and navigation guidelines */}
        <div className="flex items-center justify-between p-3 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
          <div className="flex items-center gap-2 text-sm leading-5 font-medium text-text-primary">
            <span className="px-3 py-1 bg-[#E5E7EB] dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 rounded-md shadow-3xs cursor-pointer">
              All
            </span>
            <span className="px-3 py-1 bg-transparent dark:hover:bg-zinc-800 border-zinc-300 dark:border-zinc-700 border rounded-md transition-colors cursor-pointer">
              Projects
            </span>
          </div>

          {/* Right part: Navigation guidelines */}
          <div className="flex items-center gap-1.5 font-normal text-sm leading-5 text-text-primary tracking-wide">
            <span className="text-base">
              <HiArrowsUpDown />
            </span>{" "}
            navigate
          </div>
        </div>
      </motion.div>
    </div>
  );
}
