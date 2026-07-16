"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import { projectService } from "@/services/project.service";
import { IProject } from "@/types";

export default function SelectedProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await projectService.getProjects(undefined, true);
      if (data) setProjects(data);
    };
    fetchData();
  }, []);

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
          {projects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className={`flex flex-col w-full group cursor-pointer ${
                  idx % 2 === 1 ? "md:mt-16" : ""
                }`}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div
                    className="w-full p-8 sm:p-12 aspect-6/4 rounded-4xl flex items-center justify-center border border-transparent dark:border-zinc-900 overflow-hidden relative shadow-2xs bg-zinc-100 dark:bg-zinc-900"
                    style={
                      project.bgColor
                        ? { backgroundColor: project.bgColor }
                        : undefined
                    }
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-4 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          // width={500}
                          // height={500}
                          sizes="(max-w-7xl) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                          <span className="text-lg font-medium">No Image</span>
                        </div>
                      )}
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
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 bg-white dark:bg-[#191920] border border-zinc-200/60 dark:border-zinc-800/60 text-sm font-normal leading-5 text-text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-sm leading-5 font-normal text-text-primary">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Project Year */}
                      {project.year && (
                        <span className="text-sm leading-5 font-normal text-text-primary tracking-wider">
                          {project.year}
                        </span>
                      )}
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
