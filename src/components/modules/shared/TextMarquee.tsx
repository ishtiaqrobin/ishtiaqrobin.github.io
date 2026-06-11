"use client";

import React from "react";

// Custom text data set
const MARQUEE_TEXTS = [
  "Web Development",
  "Security",
  "Community",
  "Development",
  "Mentoring",
  "Design Systems",
];

export default function TextMarquee() {
  //   Infinite loop trick: duplicate the array to make it infinite
  const doubledTexts = [...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS];

  return (
    <div className="w-full py-8 bg-[#f9f9f9] dark:bg-zinc-950 overflow-hidden select-none border border-zinc-200 dark:border-zinc-900">
      {/* ─── FADE OVERLAY MASK ─── */}
      <div className="relative w-full flex overflow-hidden mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        {/* Animation container (moves from right to left) */}
        <div className="animate-text-marquee flex flex-row items-center gap-4 whitespace-nowrap pr-8 will-change-transform">
          {doubledTexts.map((text, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* ─── Icon Layer ─── */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5.5 h-5.5 text-[#cbd5e1] dark:text-[#2c2c35]"
              >
                <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
              </svg>

              {/* ─── Text Layer ─── */}
              <span className="text-4xl sm:text-5xl font-clash font-medium tracking-wide text-[#cbd5e1] dark:text-[#2c2c35]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
