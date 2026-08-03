"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import SearchModal from "../../shared/SearchModal";
import ProjectGridCard from "../card/ProjectGridCard";
import type { IProject } from "@/types";

interface ProjectsPageProps {
  projects: IProject[];
  categories: { id: string; name: string }[];
}

export default function ProjectsPage({
  projects,
  categories,
}: ProjectsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categoryNames = ["All", ...categories.map((c) => c.name)];
  const categoryParam = searchParams.get("category");
  const selectedCategoryFromUrl =
    categoryParam && categoryNames.includes(categoryParam)
      ? categoryParam
      : "All";
  const [filters, setOptimisticFilters] = useOptimistic(
    {
      searchQuery: searchParams.get("q") || "",
      activeCategory: selectedCategoryFromUrl,
    },
    (_, nextFilters: { searchQuery: string; activeCategory: string }) =>
      nextFilters,
  );
  const { searchQuery, activeCategory } = filters;

  const updateUrlFilters = (nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextQuery.trim()) {
      params.set("q", nextQuery);
    } else {
      params.delete("q");
    }

    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    startTransition(() => {
      setOptimisticFilters({
        searchQuery: nextQuery,
        activeCategory: nextCategory,
      });
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleSearchChange = (nextQuery: string) => {
    updateUrlFilters(nextQuery, activeCategory);
  };

  const handleCategoryChange = (nextCategory: string) => {
    updateUrlFilters(searchQuery, nextCategory);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      (project.category && project.category.name === activeCategory);
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container-custom pt-28 sm:pt-40 pb-12 sm:pb-16 transition-colors duration-300  min-h-screen">
      <div className="mb-8 max-w-2xl">
        <ShimmerText className="mb-3.5">My Work</ShimmerText>
        <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight">
          Creating next level digital products
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative group cursor-pointer"
        >
          <FiSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-secondary w-4 h-4" />
          <div className="w-full pl-10 px-6 py-2 text-base leading-6 font-normal bg-zinc-100/70 hover:bg-[#E5E7EB] dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-700 rounded-full text-text-primary flex items-center transition-colors duration-300">
            {searchQuery || "Search"}
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
            />
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categoryNames.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
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

      <motion.div
        layout
        aria-busy={isPending}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-0 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectGridCard key={project.id} project={project} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-text-primary/60">No projects found.</p>
        </div>
      )}
    </section>
  );
}
