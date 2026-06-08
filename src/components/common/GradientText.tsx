"use client";

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export default function GradientText({
  children,
  className = "",
  from = "from-primary-400",
  via = "via-violet-400",
  to = "to-primary-500",
}: GradientTextProps) {
  return (
    <span
      className={`bg-linear-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

