"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ShimmerText from "./ShimmerText";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

// ─── Word Component ───
// Hook (useTransform) has been moved outside of map() into a separate component.
// This is the correct pattern for React Rules of Hooks.

function Word({
  word,
  scrollYProgress,
  start,
  end,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // ✅ Hook is now inside a valid React function component
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);

  // blur: 8px (hidden) → 0px (clear) — sync with opacity
  const filter = useTransform(
    scrollYProgress,
    [start, end],
    ["blur(0px)", "blur(0px)"],
  );

  return (
    <span className="relative inline-block">
      {/* Permanently blurred base layer — so that the text layout does not shift */}
      <span className="absolute opacity-[0.12] text-zinc-900 dark:text-white font-medium select-none">
        {word}
      </span>

      {/* Scroll-driven animated layer */}
      <motion.span
        style={{ opacity, filter }}
        className="relative text-secondary font-medium"
      >
        {word}
      </motion.span>
    </span>
  );
}

// ─── Main Component ───

export default function ScrollRevealText({
  text,
  className,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start 0.85" → element এর top, viewport এর 85% এ পৌঁছালে শুরু
    // "end 0.4"   → element এর bottom, viewport এর 40% এ পৌঁছালে শেষ
    // বড় range = ধীরে ধীরে reveal = smoother feel
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div className="w-full flex flex-col items-center text-center justify-center py-20 bg-accent select-none px-4">
      {/* Top badge */}
      <ShimmerText className="mb-6">About Me</ShimmerText>

      {/* Main text container */}
      <p
        ref={containerRef}
        className={`text-2xl sm:text-[32px] font-normal text-zinc-300 dark:text-zinc-800 max-w-6xl flex flex-wrap justify-center gap-x-2 gap-y-3 ${className}`}
      >
        {words.map((word, i) => {
          // A slice of the scroll range for each word
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word
              key={i}
              word={word}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </p>
    </div>
  );
}
