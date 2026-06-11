"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import Link from "next/link";
import { PERSONAL_INFO } from "@/utils/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  linkedinUrl: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: "Krupashri Koli",
    role: "Campus Hero @Girlscript Goa",
    avatar: "https://unsplash.com",
    text: "Ishtiaq is an enthusiast. He is very creative and dedicated towards his work. He has grown very well in the field of designing and web dev as per my observation. Even while working in a group, he is well aware of how he needs to keep all the members together and work efficiently. I certainly recommend him for any project that requires both creativity and technical excellence. His commitment to delivering quality work on time is commendable.",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Arjun Sharma",
    role: "Lead Developer @TechNexus",
    avatar: "https://unsplash.com",
    text: "Working with Ishtiaq was an absolute pleasure. His ability to translate complex design layouts into pixel-perfect Next.js applications is outstanding. He brings great energy to the team and naturally solves bottleneck technical challenges with ease. I would not hesitate to work with him again on future projects.",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Product Manager @CreativeFlow",
    avatar: "https://unsplash.com",
    text: "Ishtiaq possesses a rare combination of pure visual aesthetic design sense and robust backend architecture knowledge. He developed our core SaaS dashboard on schedule and significantly enhanced standard web vitals user metrics. His attention to detail and proactive communication made the entire process seamless.",
    linkedinUrl: "https://linkedin.com",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTO_PLAY_DURATION = 8000;
// const SLIDE_DURATION_S = 0.42;
const SLIDE_DURATION_S = 0.75;

// ── Responsive char limit helper ─────────────────────────────────────────────
// mobile (<640px) → 90, tablet (640–1023px) → 130, desktop (≥1024px) → 200
function getCharLimit(): number {
  if (typeof window === "undefined") return 160; // SSR fallback
  if (window.innerWidth < 640) return 90;
  if (window.innerWidth < 1024) return 130;
  return 200;
}

// ─── Circular Progress Ring ───────────────────────────────────────────────────

function CircularProgress({
  animKey,
  size = 80,
  strokeWidth = 2.5,
}: {
  animKey: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 -rotate-90"
      aria-hidden="true"
    >
      {/* Track ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-zinc-200 dark:text-zinc-700"
      />
      {/* Animated progress ring — re-keyed on each card change to restart */}
      <circle
        key={animKey}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        className="text-primary testimonial-ring-progress"
        style={{ "--ring-circumference": circumference } as React.CSSProperties}
      />
    </svg>
  );
}

// ─── Card Component ───────────────────────────────────────────────────────────

function TestimonialCard({
  item,
  ringKey,
  isExpanded,
  previewCharLimit,
  onExpand,
  onCollapse,
}: {
  item: TestimonialItem;
  ringKey: number;
  isExpanded: boolean;
  previewCharLimit: number;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  const needsTruncation = item.text.length > previewCharLimit;
  const previewText = needsTruncation
    ? item.text.slice(0, previewCharLimit).trimEnd()
    : item.text;

  return (
    <div className="w-full bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-10 flex flex-col gap-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar + Ring */}
        <div className="relative w-20 h-20 shrink-0">
          <CircularProgress animKey={ringKey} size={80} strokeWidth={2.5} />
          <div className="absolute inset-[5px] rounded-full overflow-hidden bg-white dark:bg-zinc-900">
            <Image
              src={PERSONAL_INFO?.profileImage}
              alt={item.name}
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Name & Role */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-md font-medium text-secondary tracking-tight">
            {item.name}
          </h3>
          <span className="text-sm text-text-primary font-normal">
            {item.role}
          </span>
        </div>
      </div>

      {/* Review text — smooth height expand/collapse via CSS max-height */}
      <div
        className="testimonial-text-wrapper"
        style={
          {
            "--expanded-height": isExpanded ? "600px" : "5.5rem",
          } as React.CSSProperties
        }
      >
        <p className="text-base leading-relaxed text-text-primary font-normal">
          {isExpanded ? item.text : previewText}
          {needsTruncation && !isExpanded && (
            <>
              {"... "}
              <button
                onClick={onExpand}
                className="text-secondary font-medium hover:underline focus:outline-none transition-colors duration-200 cursor-pointer"
              >
                see more
              </button>
            </>
          )}
          {isExpanded && (
            <>
              {" "}
              <button
                onClick={onCollapse}
                className="text-secondary font-medium hover:underline focus:outline-none transition-colors duration-200 cursor-pointer"
              >
                show less
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isSliding, setIsSliding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ringKey, setRingKey] = useState(0);

  // ── Responsive char limit ─────────────────────────────────────────────────
  const [previewCharLimit, setPreviewCharLimit] = useState<number>(160);

  useEffect(() => {
    const update = () => setPreviewCharLimit(getCharLimit());
    update(); // set correct value on mount (client-side)
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Touch refs ────────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = TESTIMONIALS_DATA.length;

  // ── Framer Motion slide variants ──────────────────────────────────────────
  // mode="sync" → old card exits & new card enters simultaneously.
  // Pure X-axis translation — no opacity / fade at all.
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: "0%" },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  const slideTransition = {
    duration: SLIDE_DURATION_S,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  // ── Navigation ────────────────────────────────────────────────────────────

  const slideTo = useCallback(
    (nextIndex: number, dir: 1 | -1) => {
      if (isSliding) return;
      setIsSliding(true);
      setDirection(dir);
      setIsExpanded(false);
      setCurrentIndex(nextIndex);
      setRingKey((k) => k + 1);
      setTimeout(() => setIsSliding(false), SLIDE_DURATION_S * 1000 + 50);
    },
    [isSliding],
  );

  const handleNext = useCallback(
    () => slideTo((currentIndex + 1) % total, 1),
    [currentIndex, total, slideTo],
  );

  const handlePrev = useCallback(
    () => slideTo((currentIndex - 1 + total) % total, -1),
    [currentIndex, total, slideTo],
  );

  // ── Auto-play ─────────────────────────────────────────────────────────────

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(handleNext, AUTO_PLAY_DURATION);
  }, [handleNext]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [resetAutoPlay]);

  // ── Touch / Swipe ─────────────────────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      delta > 0 ? handleNext() : handlePrev();
      resetAutoPlay();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const onNext = () => {
    handleNext();
    resetAutoPlay();
  };
  const onPrev = () => {
    handlePrev();
    resetAutoPlay();
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section className="container-custom py-16 sm:py-24 overflow-hidden">
      {/* items-start → left side top-aligned, never shifts when right side expands */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* ── Left side ── */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <ShimmerText className="mb-3.5">Testimonials</ShimmerText>

          <h2 className="text-4xl sm:text-5xl font-clash font-medium tracking-tight text-secondary leading-12 mb-6">
            What others <br /> say
          </h2>

          <p className="text-text-primary font-normal leading-snug text-base">
            I&apos;ve worked with some amazing people over the years, here is
            what they have to say about me.
          </p>
        </div>

        {/* ── Right side ── */}
        <div className="lg:col-span-8 w-full flex flex-col gap-6">
          {/* Slider window — overflow-hidden clips off-screen cards */}
          <div
            className="relative w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* mode="sync" → both cards live in DOM during transition */}
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                // gap-8 px
                className="relative w-full px-1"
              >
                <TestimonialCard
                  item={currentTestimonial}
                  ringKey={ringKey}
                  isExpanded={isExpanded}
                  previewCharLimit={previewCharLimit}
                  onExpand={() => setIsExpanded(true)}
                  onCollapse={() => setIsExpanded(false)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Control bar ── */}
          <div className="w-full flex items-center justify-between pt-2 px-1">
            <Link
              href={currentTestimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal leading-5 tracking-wide text-secondary hover:text-primary flex items-center gap-2 hover:underline transition-colors duration-200"
            >
              Check it out on Linkedin <FiArrowUpRight />
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={isSliding}
                className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/60 text-secondary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <FiArrowLeft className="w-4 h-4" />
              </button>

              <span className="text-sm font-normal leading-3.5 tracking-widest text-text-primary w-[58px] text-center">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <button
                onClick={onNext}
                disabled={isSliding}
                className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/60 text-secondary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
