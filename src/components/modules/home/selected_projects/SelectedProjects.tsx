"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import ProjectGridCard from "../card/ProjectGridCard";
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
    <section className="container-custom pt-10 sm:pt-24 pb-16 sm:pb-24 transition-colors duration-300  min-h-screen">
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-0 items-start pt-16 group/projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => (
            <ProjectGridCard
              key={project.id}
              project={project}
              index={idx}
              showYear
            />
          ))}
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
