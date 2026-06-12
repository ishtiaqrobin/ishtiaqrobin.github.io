"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import SearchModal from "../../shared/SearchModal";
import { PROJECTS_DATA } from "@/utils/constants";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  //   Category and search input filter logic
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.categories.includes(activeCategory);
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container-custom pt-28 sm:pt-40 pb-12 sm:pb-16 transition-colors duration-300 select-none min-h-screen">
      {/* ─── Header ─── */}
      <div className="mb-8 max-w-2xl">
        <ShimmerText className="mb-3.5">My Work</ShimmerText>
        <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight">
          Creating next level digital products
        </h2>
      </div>

      {/* ─── Top Filters ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        {/* Custom search bar button */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative group cursor-pointer"
        >
          <FiSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-secondary w-4 h-4" />
          <div className="w-full pl-10 px-6 py-2 text-base leading-6 font-normal bg-zinc-100/70 hover:bg-[#E5E7EB] dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-700 rounded-full text-text-primary flex items-center transition-colors duration-300">
            {searchQuery || "Search"}
          </div>
        </div>

        {/* ─── SEARCH MODAL INTEGRATION ─── */}
        <AnimatePresence>
          {isSearchOpen && (
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </AnimatePresence>

        {/* Category filters buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {["All", "Development", "Design"].map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-base leading-6 font-normal rounded-full transition-all duration-300 ${
                  isSelected
                    ? "bg-[#E5E7EB] dark:bg-[#27272A]"
                    : "text-text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Projects Grid ─── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-0 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
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
    </section>
  );
}
