"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  FiPenTool,
  FiLayers,
  FiCode,
  FiCheckCircle,
  FiCompass,
  FiUploadCloud,
  FiFileText,
} from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";

interface ProcessCard {
  id: number;
  number: string;
  icon: React.ReactNode;
  description: string;
}

const WEB_PROCESS_DATA: ProcessCard[] = [
  {
    id: 1,
    number: "01. Discover",
    icon: <FiCompass />,
    description:
      "Understanding the client's goals, target audience, and project scope before writing a single line of code.",
  },
  {
    id: 2,
    number: "02. Plan",
    icon: <FiFileText />,
    description:
      "Defining the tech stack, architecture, and project timeline to keep everything on track 1st day.",
  },
  {
    id: 3,
    number: "03. Design",
    icon: <FiPenTool />,
    description:
      "Crafting clean, responsive UI with a focus on user experience, consistency, and visual hierarchy.",
  },
  {
    id: 4,
    number: "04. Develop",
    icon: <FiCode />,
    description:
      "Building scalable, maintainable full-stack applications using modern frameworks and best practices.",
  },
  {
    id: 5,
    number: "05. Test & Optimize",
    icon: <FiCheckCircle />,
    description:
      "Ensuring performance, security, and cross-browser compatibility before any code goes to prod.",
  },
  {
    id: 6,
    number: "06. Deploy",
    icon: <FiUploadCloud />,
    description:
      "Shipping to production with CI/CD pipelines, and proper hosting setup in place.",
  },
];

export default function DesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  //   1. Global scroll progress
  const { scrollYProgress } = useScroll();

  // 2. Measuring the speed or velocity of scrolling
  const scrollVelocity = useVelocity(scrollYProgress);

  // 3. Using spring physics to reduce jerks (which makes the motion super smooth)
  const velocityFactor = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // 4. X-axis motion value to keep the loop uninterrupted
  const baseX = useMotionValue(0);

  // 5. Transformation Mapping (Range to move left or right based on speed)
  // Scroll down will go left (-) if velocity is positive, scroll up will go right (+) if velocity is negative
  const x = useTransform(baseX, (v) => `${v}%`);

  //   Default base speed (The cards move slowly even if you don't scroll.)
  //   const baseVelocity = -0.5;
  const baseVelocity = -0.5;

  useAnimationFrame((time, delta) => {
    // Scroll speed depends on the scroll momentum
    let moveBy = baseVelocity + velocityFactor.get() * 30;

    // User scrolling down? Positive velocity. User scrolling up? Negative velocity.
    if (moveBy > 0) {
      moveBy = Math.min(moveBy, 5); // Max 5px per frame
    } else {
      moveBy = Math.max(moveBy, -5);
    }

    // Each frame, update the position and set the loop boundaries (-50% to 0%)
    let newX = baseX.get() + moveBy * (delta / 1000);
    if (newX <= -50) {
      newX = 0;
    } else if (newX > 0) {
      newX = -50;
    }
    baseX.set(newX);
  });

  //   Infinite loop trick: duplicate the array to make it infinite
  const doubledCards = [...WEB_PROCESS_DATA, ...WEB_PROCESS_DATA];

  return (
    <section
      ref={containerRef}
      className="w-full py-20 overflow-hidden select-none"
    >
      {/* ─── HEADING ─── */}
      <div className="container-custom mb-8 flex flex-col items-start">
        <ShimmerText className="mb-3.5">Steps I Follow</ShimmerText>

        <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight mb-6">
          My Design Process
        </h2>
        <p className="text-text-primary font-normal leading-normal text-base">
          I have worked with some of the most innovative industry leaders to
          help build their top-notch products.
        </p>
      </div>

      {/* ─── VELOCITY SCROLL CONTAINER ─── */}
      {/* mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] */}
      <div className="container-custom relative w-full flex overflow-hidden mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        {/* Use framer motion for animation of horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex flex-row items-stretch gap-5 whitespace-nowrap will-change-transform pr-5"
        >
          {doubledCards.map((card, index) => (
            /* ─── Single card ─── */
            <div
              key={index}
              className="w-[280px] sm:w-[300px] h-full bg-accent border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-6 flex flex-col items-start gap-4 shadow-3xs shrink-0"
            >
              <div className="p-3.5 flex items-center justify-center rounded-full text-primary text-xl bg-[#E5E7EB] dark:bg-[#191920] border border-zinc-300 dark:border-zinc-800 shrink-0">
                {card.icon}
              </div>

              {/* Card info */}
              <div className="flex flex-col gap-1.5 whitespace-normal flex-1">
                <span className="text-xl leading-7 font-medium tracking-normal text-text-primary">
                  {card.number}
                </span>
                <p className="text-base leading-snug text-text-primary font-normal">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
