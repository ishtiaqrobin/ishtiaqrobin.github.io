"use client";

import React from "react";
import Image from "next/image";
import { Pin } from "lucide-react";
import { IReview } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

// const SLIDE_DURATION_S = 0.42;

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

export default function TestimonialCard({
  item,
  ringKey,
  isExpanded,
  previewCharLimit,
  onExpand,
  onCollapse,
}: {
  item: IReview;
  ringKey: number;
  isExpanded: boolean;
  previewCharLimit: number;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  const needsTruncation = item.comment.length > previewCharLimit;
  const previewText = needsTruncation
    ? item.comment.slice(0, previewCharLimit).trimEnd()
    : item.comment;

  return (
    <div className="w-full bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-10 flex flex-col gap-5 shadow-2xs">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Avatar + Ring */}
          <div className="relative w-20 h-20 shrink-0">
            <CircularProgress animKey={ringKey} size={80} strokeWidth={2.5} />
            <div className="absolute inset-[5px] rounded-full overflow-hidden bg-white dark:bg-zinc-900">
              <Image
                // src={item?.user?.image || PERSONAL_INFO?.profileImage}
                src={item.user?.image || ""}
                alt={item.user?.name || "Reviewer"}
                width={70}
                height={70}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-md font-medium text-secondary tracking-tight">
              {item.user?.name}
            </h3>
            <span className="text-sm text-text-primary font-normal">
              {item.position}
              {item.companyName && item.companyName !== "Personal"
                ? ` @${item.companyName}`
                : ""}
            </span>
          </div>
        </div>

        {/* Featured Review */}
        {/* When Admin Pinned a review, then show the pin icon on the review card*/}
        {item.isPinned && (
          <div>
            <Pin className="w-5 h-5 text-primary" />
          </div>
        )}
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
          {isExpanded ? item.comment : previewText}
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
