"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote as QuoteIcon, Pencil, Pin } from "lucide-react";
import { IReview } from "@/types";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface TestimonialCardProps {
  review: IReview;
  index: number;
}

export function TestimonialCard({ review, index }: TestimonialCardProps) {
  const { user } = useAuth();

  return (
    <div className="h-full pt-8">
      <Card className="p-0 h-full relative overflow-visible border backdrop-blur-md shadow-lg hover:shadow-xl shadow-primary/20 hover:shadow-primary/35 transition-all duration-500 group rounded-3xl">
        <CardContent className="pt-14 pb-8 px-8 flex flex-col h-full">
          {/* ── Avatar ────────────────────────────────────────────── */}
          <div className="absolute -top-7 left-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
              <Avatar className="h-16 w-16 border-4 border-background dark:border-primary/50 shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                <AvatarImage
                  src={review.user.image || ""}
                  alt={review.user.name}
                />
                <AvatarFallback className="bg-primary text-white font-bold text-xl">
                  {review.user.name[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* ── Pinned indicator ──────────────────────────────────── */}
          {review.isPinned && (
            <div className="absolute top-4 right-8 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-500">
              <Pin className="h-3 w-3 fill-blue-500" />
              Featured
            </div>
          )}

          {/* ── Quote icon ────────────────────────────────────────── */}
          <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-all duration-500 group-hover:scale-110 z-10">
            <QuoteIcon className="h-12 w-12 fill-current" />
          </div>

          {/* ── Stars ─────────────────────────────────────────────── */}
          {/* <div className="flex gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 ${
                  i < review.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground/20"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div> */}

          {/* ── Comment ───────────────────────────────────────────── */}
          <div className="grow">
            <p className="text-foreground/90 italic leading-relaxed text-base font-medium">
              &quot;
              {review.comment ||
                "Collaborating on this project was an absolute pleasure. High quality work and great communication!"}
              &quot;
            </p>
          </div>

          {/* ── Footer ────────────────────────────────────────────── */}
          {/* pt-4 mt-6 */}
          <div className="pt-4 mt-6 border-t border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {review.user.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-semibold uppercase tracking-wider">
                  Verified Client
                </p>
              </div>

              {/* Edit shortcut for own review */}
              {user?.id === review.userId && (
                <Link
                  href="/user-dashboard/review"
                  className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="Edit your review"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            {/* Online pulse dot */}
            <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
