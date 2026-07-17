"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceService } from "@/services/experience.service";
import { IExperience } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { ExperienceCard } from "./card/ExperienceCard";
import { useInView } from "react-intersection-observer";
import ShimmerText from "../shared/ShimmerText";

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    experienceService.getExperiences().then(({ data }) => {
      if (data) {
        const published = data.filter((e: IExperience) => e.isPublished);

        // Sort: first by sortOrder (asc), then by startDate (desc) as tiebreaker
        const sorted = [...published].sort((a, b) => {
          const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
          if (orderDiff !== 0) return orderDiff;
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        });

        setExperiences(sorted);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading && lineRef.current && containerRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }
  }, [isLoading, experiences]);

  if (!isLoading && experiences.length === 0) return null;

  return (
    <section
      id="experience"
      ref={viewRef}
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />

      {/* Engineering Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.1] opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="My Experience"
          title="Professional Experience"
          description="A timeline of my career journey and the companies I've grown with"
        />

        <div>
          <ShimmerText>Work History</ShimmerText>
        </div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-12 mt-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="space-y-4 w-full">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-24 w-full rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="max-w-4xl mx-auto mt-16 relative">
            {/* Static background line */}
            <div className="absolute left-6 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-primary/10 hidden sm:block" />

            {/* Dynamic animated line */}
            <div
              ref={lineRef}
              className="absolute left-6 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary via-violet-500 to-transparent hidden sm:block origin-top"
            />

            <div className="space-y-12">
              {experiences.map((item, index) => (
                <ExperienceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
