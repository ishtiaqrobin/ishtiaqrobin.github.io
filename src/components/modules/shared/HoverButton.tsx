import React from "react";
import { Loader2 } from "lucide-react";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function HoverButton({
  children,
  loading = false,
  disabled,
  className,
  ...props
}: HoverButtonProps) {
  const isDisabled = disabled || loading;

  // Loading state এ hover effect না দেখিয়ে simple spinner দেখাবে
  if (loading) {
    return (
      <button
        {...props}
        disabled
        className={`group relative px-8 py-3 font-medium rounded-full border border-secondary bg-white/60 dark:bg-zinc-900/60 opacity-70 cursor-not-allowed ${className}`}
      >
        <span className="flex items-center justify-center gap-2 text-sm text-secondary h-5">
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`group relative px-8 py-3 font-medium cursor-pointer rounded-full overflow-hidden border border-secondary bg-white/60 dark:bg-zinc-900/60 transition-colors duration-500 z-10 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {/* ─── LIQUID WAVE FILL EFFECT ─── */}
      <span className="absolute inset-0 w-full h-full bg-secondary rounded-[50%] translate-y-[110%] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none z-0" />

      {/* ─── TEXT REVEAL & COLOR BLEND CONTAINER ─── */}
      <span className="relative z-10 block h-5 overflow-hidden pointer-events-none">
        {/* 1st text — default, rises and disappears on hover */}
        <span className="block text-sm text-secondary transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>

        {/* 2nd text — hidden below, rises with the wave on hover */}
        <span className="absolute top-0 left-0 block w-full text-sm text-secondary-foreground transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </button>
  );
}
