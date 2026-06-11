"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ShimmerText from "./ShimmerText";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

// ─── Word Component ───────────────────────────────────────────────────────────
// Hook (useTransform) কে map() এর বাইরে আলাদা component এ নিয়ে আসা হয়েছে।
// এটাই React Rules of Hooks এর সঠিক pattern।

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
  // ✅ Hook এখন একটি valid React function component এর ভেতরে
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);

  // blur: 8px (hidden) → 0px (clear) — opacity এর সাথে sync
  const filter = useTransform(
    scrollYProgress,
    [start, end],
    ["blur(0px)", "blur(0px)"],
  );

  return (
    <span className="relative inline-block">
      {/* স্থায়ী আবছা base layer — যাতে text layout shift না হয় */}
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

// ─── Main Component ───────────────────────────────────────────────────────────

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
          // প্রতিটি word এর জন্য scroll range এর একটা slice
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
