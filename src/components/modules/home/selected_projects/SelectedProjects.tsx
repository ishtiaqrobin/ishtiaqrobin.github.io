"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import { PROJECTS_DATA } from "@/utils/constants";

export default function SelectedProjects() {
  return (
    <section className="container-custom pt-10 sm:pt-24 pb-16 sm:pb-24 transition-colors duration-300 select-none min-h-screen">
      {/* ─── Header ─── */}
      <div className="max-w-2xl">
        <ShimmerText className="mb-3.5">My Work</ShimmerText>
        <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight mb-2">
          Selected Projects
        </h2>
        <p className="text-text-primary font-normal leading-normal text-base">
          Here&apos;s a curated selection showcasing my{" "}
          <br className="block sm:hidden" /> expertise and the achieved results.
        </p>
      </div>

      {/* ─── Projects Grid ─── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-0 items-start pt-16"
      >
        <AnimatePresence mode="popLayout">
          {PROJECTS_DATA.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                /*
                 The 2nd and even number cards have been pushed down slightly with `md:mt-16` to highlight the nice masonry look in the screenshot.
                */
                className={`flex flex-col w-full group cursor-pointer ${
                  idx % 2 === 1 ? "md:mt-16" : ""
                }`}
              >
                {/* <Link href={`/projects/${project.id}`}> */}
                <Link href={`/projects`}>
                  {/* Colorful card with image */}
                  <div
                    className={`w-full aspect-6/4 ${project.bgColor} rounded-4xl flex items-center justify-center border border-transparent dark:border-zinc-900 overflow-hidden relative shadow-2xs`}
                  >
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-w-7xl) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* ─── Card footer (title, category, year) ─── */}
                  <div className="flex flex-col mt-4 mb-2 px-2">
                    <h3 className="text-xl leading-7 font-medium tracking-tight text-text-primary mb-3">
                      {project.title}
                    </h3>

                    {/* Category Badge and Year */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.categories.map((cat, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-3 py-1 bg-white dark:bg-[#191920] border border-zinc-200/60 dark:border-zinc-800/60 text-sm font-normal leading-5 text-text-primary rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Project Year */}
                      <span className="text-sm leading-5 font-normal text-text-primary tracking-wider">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center pt-16">
        <Link href={"/projects"}>
          <HoverButton>View All Projects</HoverButton>
        </Link>
      </div>
    </section>
  );
}
