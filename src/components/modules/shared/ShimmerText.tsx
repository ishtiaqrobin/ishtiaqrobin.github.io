import React from "react";

interface ShimmerTextProps {
  children: string;
  className?: string;
}

export default function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* ─── Left side sparkle or glare icon ─── */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-primary"
      >
        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
      </svg>

      {/* 
        ─── SHIMMER / GLARE TEXT EFFECT ───
        Here, the white color stop is given between 30% and 70%. As a result, the white light line will become very thin and glossy and move from left to right.
      */}
      <span className="text-sm leading-4 font-clash font-normal tracking-wider uppercase bg-[linear-gradient(120deg,var(--color-primary)_30%,#ffffff_50%,var(--color-primary)_70%)] bg-clip-text text-transparent animate-text-shine">
        {children}
      </span>
    </div>
  );
}
