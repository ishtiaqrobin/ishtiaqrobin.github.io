"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiLayers, FiFeather } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import TechMarquee from "../../shared/TechMarquee";

interface ExpertiseItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    id: 1,
    title: "Development",
    icon: <FiCode className="w-4 h-4" />,
    description:
      "Building fast, secure, and production-ready applications utilizing Next.js, TypeScript, and robust backend engineering with optimized web vitals.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106429/10002_akgngb.jpg",
  },
  {
    id: 2,
    title: "UI/UX Design",
    icon: <FiLayers className="w-4 h-4" />,
    description:
      "Designing user-centric, modern interfaces that shapes how the audience interacts with the product. Bridging pure visuals with clean product architecture.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106429/10001_rgweal.avif",
  },
  {
    id: 3,
    title: "Branding",
    icon: <FiFeather className="w-4 h-4" />,
    description:
      "Crafting memorable brand identities, high-end design systems, and typography Guidelines that help your product pop out globally across every device.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106210/branding_isulht.webp",
  },
];

export default function ExpertiseSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  //   Default state is the first object (Development)
  const [currentImage, setCurrentImage] = useState<string>(
    EXPERTISE_DATA[0].image,
  );

  const handleRowClick = (item: ExpertiseItem) => {
    if (expandedId === item.id) {
      //   If the same item is clicked again, the text will be closed, but the image will not change
      setExpandedId(null);
    } else {
      //   New item will be expanded and its image will be dynamically changed
      setExpandedId(item.id);
      setCurrentImage(item.image);
    }
  };

  return (
    <section className="container-custom py-16 sm:py-24 select-none">
      {/* ─── Top Layer ─── */}
      <div className="mb-8">
        <ShimmerText className="mb-3.5">Speciality</ShimmerText>
        <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight">
          Areas of Expertise
        </h2>
      </div>

      {/* ─── 2nd Column ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* ─── Left Side ─── */}
        <div className="lg:col-span-6 flex flex-col w-full gap-4 order-first lg:order-first">
          {EXPERTISE_DATA.map((item) => {
            const isOpen = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleRowClick(item)}
                className="w-full bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-3xs"
              >
                {/* Item, Title, Icon */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-secondary">
                    <span className="text-text-primary shrink-0">
                      {item.icon}
                    </span>
                    <h3 className="text-base leading-6 font-medium tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Chevron Icon */}
                  <span
                    className="text-text-primary shrink-0"
                    style={{
                      display: "inline-block",
                      transition:
                        "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)",
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
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>

                {/* Expanded Description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-base leading-6 text-text-primary font-normal">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ─── Right Side ─── */}
        <div className="lg:col-span-6 w-full order-last lg:order-last">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 shadow-xs bg-zinc-100 dark:bg-zinc-900">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt="Expertise showcase"
                  fill
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover hover:scale-[102%] transition-transform duration-700"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── Tech Marquee ─── */}
      <TechMarquee />
    </section>
  );
}
