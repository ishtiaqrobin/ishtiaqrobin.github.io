"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { IProject } from "@/types";

interface ProjectGridCardProps {
  project: IProject;
  index: number;
  showYear?: boolean;
}

export default function ProjectGridCard({
  project,
  index,
  showYear = false,
}: ProjectGridCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={`flex flex-col w-full group cursor-pointer ${
        index % 2 === 1 ? "md:mt-16" : ""
      }`}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="w-full p-8 sm:p-12 aspect-6/4 rounded-4xl flex items-center justify-center border border-transparent dark:border-zinc-900 overflow-hidden relative shadow-2xs bg-zinc-100 dark:bg-zinc-900"
          style={
            project.bgColor ? { backgroundColor: project.bgColor } : undefined
          }
        >
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
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

        <div className="flex flex-col mt-4 mb-2 px-2">
          <h3 className="text-xl leading-7 font-medium tracking-tight text-text-primary mb-3">
            {project.title}
          </h3>

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

            {showYear
              ? project.year && (
                  <span className="text-sm leading-5 font-normal text-text-primary tracking-wider">
                    {project.year}
                  </span>
                )
              : project.category && (
                  <span className="text-sm leading-5 font-normal text-text-primary tracking-wider">
                    {project.category.name}
                  </span>
                )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
