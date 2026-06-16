"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import { IReview } from "@/types";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/hooks/useAuth";
import TestimonialModal from "./TestimonialModal";
import TestimonialCard from "./TestimonialCard";

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Testimonials() {
  const router = useRouter();
  const { user, session, isAuthenticated } = useAuth();
  const userToken = session?.token || "";

  // ── Reviews state ─────────────────────────────────────────────────────────
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myReview, setMyReview] = useState<IReview | null>(null);

  // ── Modal state ───────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Slider state ──────────────────────────────────────────────────────────
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

  // ── Refetch counter — increment to re-trigger both fetch effects ─────────
  const [refetchCount, setRefetchCount] = useState(0);

  // ── Fetch public reviews ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsLoading(true);
      const { data } = await reviewService.getAllReviews();
      if (cancelled) return;
      if (data) {
        // Pinned first (backend already orders this, but reinforce client-side)
        setReviews(
          [...data].sort((a, b) => Number(b.isPinned) - Number(a.isPinned)),
        );
      }
      setIsLoading(false);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [refetchCount]);

  // ── Fetch user's own review (if logged in) ────────────────────────────────
  useEffect(() => {
    if (!userToken) return;
    let cancelled = false;
    const run = async () => {
      const { data } = await reviewService.getMyReview(userToken);
      if (cancelled) return;
      setMyReview(data && data.length > 0 ? data[0] : null);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [userToken, refetchCount]);

  // ── After modal submit — bump counter to refetch both lists ──────────────
  const handleModalSuccess = useCallback(() => {
    setRefetchCount((c) => c + 1);
  }, []);

  // ── Feedback button click — auth check → modal or redirect to login ──────
  const handleFeedbackClick = useCallback(() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // ── Touch refs ────────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = reviews.length;

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
    // Modal open থাকলে auto-play pause — নইলে slide হলে modal form reset হয়
    if (total === 0 || isModalOpen) {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      return;
    }
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [resetAutoPlay, total, isModalOpen]);

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

  // ── Loading / empty guard ─────────────────────────────────────────────────
  if (!isLoading && reviews.length === 0) return null;

  const currentTestimonial = reviews[currentIndex];

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section className="container-custom pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
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
          {isLoading ? (
            /* Skeleton placeholder — keeps layout stable while loading */
            <div className="w-full bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-10 flex flex-col gap-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-48" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-4/6" />
              </div>
            </div>
          ) : (
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
                  {currentTestimonial && (
                    <TestimonialCard
                      item={currentTestimonial}
                      ringKey={ringKey}
                      isExpanded={isExpanded}
                      previewCharLimit={previewCharLimit}
                      onExpand={() => setIsExpanded(true)}
                      onCollapse={() => setIsExpanded(false)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* ── Control bar ── */}
          <div className="w-full flex items-center justify-between pt-2 px-1">
            {/* <Link
              href={currentTestimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal leading-5 tracking-wide text-secondary hover:text-primary flex items-center gap-2 hover:underline transition-colors duration-200"
            >
              Give feedback <FiArrowUpRight />
            </Link> */}

            {/* Everyone (non-user, user, admin) can see the button. Authenticated → modal, non-authenticated → /login */}
            <HoverButton onClick={handleFeedbackClick}>
              {myReview ? "Update Feedback" : "Give Feedback"}
            </HoverButton>

            {/* Navigation */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={onPrev}
                disabled={isSliding || total === 0}
                className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/60 text-secondary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <FiArrowLeft className="w-4 h-4" />
              </button>

              <span className="text-sm font-normal leading-3.5 tracking-widest text-text-primary w-[58px] text-center">
                {total > 0 ? String(currentIndex + 1).padStart(2, "0") : "00"} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <button
                onClick={onNext}
                disabled={isSliding || total === 0}
                className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/60 text-secondary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── TestimonialModal — only render when user is authenticated */}
      {isAuthenticated && (
        <TestimonialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={userToken}
          existingReview={myReview}
          onSuccess={handleModalSuccess}
        />
      )}
    </section>
  );
}
