"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import ShimmerText from "../../shared/ShimmerText";
import { IAward } from "@/types/awards.type";
import { awardService } from "@/services/award.service";

const INITIAL_COUNT = 4;

function ExpandableRows({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    setHeight(el.scrollHeight);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      style={{
        height: show ? height : 0,
        overflow: "hidden",
        transition: "height 500ms cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "height",
      }}
      aria-hidden={!show}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function AwardsSection() {
  const [awards, setAwards] = useState<IAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const { data } = await awardService.getAwards();
        if (data) {
          const published = data.filter((a) => a.isPublished);
          setAwards(published);
        }
      } catch {
        setAwards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  const initialRows = awards.slice(0, INITIAL_COUNT);
  const extraRows = awards.slice(INITIAL_COUNT);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderRow = (award: IAward) => {
    const isOpen = expandedRow === award.id;

    return (
      <motion.div
        key={award.id}
        layout="position"
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="border-b border-zinc-200 dark:border-zinc-800 group"
        onClick={() => toggleRow(award.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center justify-between py-4 gap-6">
          <div className="flex flex-col">
            <h4 className="text-base font-medium text-secondary">
              {award.title}
            </h4>
            <span className="text-xs leading-5 font-normal text-text-primary">
              {award.subTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm leading-5 font-normal tracking-widest text-text-primary whitespace-nowrap uppercase">
              {award.date}
            </span>

            <span
              className="text-text-primary"
              style={{
                display: "inline-block",
                transition: "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden sm:block"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-6 pl-2 pr-4">
            <ul className="list-disc list-outside space-y-2 text-sm text-text-primary marker:text-text-primary">
              {award.details.map((detail, idx) => (
                <li key={idx} className="leading-relaxed inline-block w-full">
                  <span className="text-text-primary mr-2">•</span> {detail}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="container-custom py-16 sm:py-22">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
        <div
          className={[
            "lg:col-span-5",
            "transition-all duration-700 ease-out delay-300",
            showAll ? "lg:sticky lg:top-24" : "relative",
          ].join(" ")}
        >
          <ShimmerText className="mb-3.5">Awards</ShimmerText>

          <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight mb-6">
            Awards & <br /> Recognition
          </h2>
          <p className="text-text-primary font-normal leading-normal text-base max-w-sm">
            A collection of milestones and recognition earned across
            competitions, communities, and companies — each one a marker of
            growth.
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col w-full">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : awards.length === 0 ? null : (
            <>
              <div className="flex flex-col">
                {initialRows.map(renderRow)}

                <ExpandableRows show={showAll}>
                  {extraRows.map(renderRow)}
                </ExpandableRows>
              </div>

              {extraRows.length > 0 && (
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={() => {
                      if (showAll) {
                        setExpandedRow(null);
                      }
                      setShowAll((prev) => !prev);
                    }}
                    className={[
                      "group inline-flex items-center gap-2 cursor-pointer",
                      "px-5 py-2.5 rounded-full text-sm font-medium",
                      "border border-zinc-300 dark:border-zinc-700",
                      "bg-white dark:bg-zinc-900",
                      "text-zinc-700 dark:text-zinc-300",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      "hover:border-zinc-400 dark:hover:border-zinc-600",
                      "transition-transform duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                    ].join(" ")}
                    aria-expanded={showAll}
                  >
                    <span>{showAll ? "Show Less" : "Show More"}</span>

                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        transition:
                          "transform 400ms cubic-bezier(0.25, 1, 0.5, 1)",
                        transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
