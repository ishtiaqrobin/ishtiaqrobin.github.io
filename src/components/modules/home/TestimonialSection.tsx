"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { TestimonialCard } from "./card/TestimonialCard";
import { IReview } from "@/types";
import { reviewService } from "@/services/review.service";
import SectionTitle from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";

export function TestimonialSection() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await reviewService.getAllReviews();
      if (data) {
        // Pinned first (backend already orders this, but reinforce client-side)
        setReviews(
          [...data].sort((a, b) => Number(b.isPinned) - Number(a.isPinned)),
        );
      }
      setIsLoading(false);
    };
    load();
  }, []);

  if (!isLoading && reviews.length === 0) return null;

  // Scroll duration: ~6s per card so it's readable
  const scrollDuration = Math.max(20, reviews.length * 6);

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* ── Background ────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.2] opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%234f46e5'/%3E%3Cpath d='M30 0 v60 M0 30 h60' stroke='%234f46e5' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      </div>

      {/* ── Title ─────────────────────────────────────────────────── */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Client Feedback"
          title="Client Testimonials"
          description="What people are saying about my work and professional collaborations"
        />
      </div>

      {/* ── Scrolling strip ───────────────────────────────────────── */}
      <div className="relative z-10 w-full overflow-hidden mt-8">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {isLoading ? (
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-3xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-10">
            <div
              className="flex animate-testimonial-scroll hover:[animation-play-state:paused]"
              style={
                {
                  "--scroll-duration": `${scrollDuration}s`,
                } as React.CSSProperties
              }
            >
              {/* Duplicate for seamless loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="shrink-0 w-[340px] md:w-[420px] px-4"
                >
                  <TestimonialCard review={review} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="container-custom mx-auto flex justify-center items-center mt-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {!isLoading && !user?.isReviewed && user?.role !== "ADMIN" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="default"
              className="shadow-lg shadow-primary/20 cursor-pointer"
              onClick={() => {
                router.push(
                  isAuthenticated ? "/user-dashboard/review" : "/login",
                );
              }}
            >
              <Plus className="mr-2 w-4 h-4" />
              Write a Review
            </Button>
          </motion.div>
        )}
      </div>

      {/* ── Scroll animation ──────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-testimonial-scroll {
          animation: testimonial-scroll var(--scroll-duration, 40s) linear
            infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
