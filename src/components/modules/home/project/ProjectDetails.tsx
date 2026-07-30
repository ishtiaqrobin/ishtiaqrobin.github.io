"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiLinkedin,
  FiMail,
  FiShare2,
  FiTwitter,
  FiLink,
} from "react-icons/fi";
import { Home } from "lucide-react";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import OnThisPageMenu from "./OnThisPageMenu";
import type { IProject } from "@/types";
import HoverButton from "../../shared/HoverButton";
import { cn } from "@/lib/utils";

interface ProjectDetailsProps {
  project: IProject;
  previousProject?: { slug: string; title: string } | null;
  nextProject?: { slug: string; title: string } | null;
}

const labelToHash = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

export default function ProjectDetails({
  project,
  previousProject,
  nextProject,
}: ProjectDetailsProps) {
  const [showAllTech, setShowAllTech] = useState(false);

  const techStack = project.techStack || [];
  const sections = project.sections || [];

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  //   const handleShare = async () => {
  //   const url = window.location.href;
  //   if (typeof navigator !== "undefined" && navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: project.title,
  //         text: project.description,
  //         url,
  //       });
  //     } catch {
  //       // user cancelled or error — silent
  //     }
  //   } else {
  //     try {
  //       await navigator.clipboard.writeText(url);
  //     } catch {
  //       // clipboard unavailable — silent
  //     }
  //   }
  // };

  const handleShare = () => {
    const url = window.location.href;

    const shareText = [project.title, project.description, "", url].join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          // title: project.title,
          text: shareText,
          // url,
        })
        .catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
  };

  const renderRichContent = (html: string) => {
    if (!html) return null;
    return (
      <div
        className="prose prose-sm dark:prose-invert max-w-none
          [&_pre]:bg-[#1e1e2e]! [&_pre]:text-[#cdd6f4]! [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:overflow-x-auto [&_pre]:my-4
          [&_code:not(pre_code)]:bg-zinc-100 [&_code:not(pre_code)]:dark:bg-zinc-800 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono
          [&_blockquote]:border-l-[3px] [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-600 [&_blockquote]:dark:text-zinc-400 [&_blockquote]:my-4 [&_blockquote]:bg-zinc-50/50 [&_blockquote]:dark:bg-zinc-900/30 [&_blockquote]:py-2 [&_blockquote]:pr-2 [&_blockquote]:rounded-r-lg
          [&_ul]:list-disc [&_ul]:list-outside [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_ul]:text-zinc-600 [&_ul]:dark:text-zinc-400
          [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:space-y-1.5 [&_ol]:pl-4 [&_ol]:text-zinc-600 [&_ol]:dark:text-zinc-400
          [&_li]:leading-relaxed
          [&_h1]:text-2xl [&_h1]:font-clash [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-secondary [&_h1]:mb-4
          [&_h2]:text-xl [&_h2]:font-clash [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-secondary [&_h2]:mb-3
          [&_h3]:text-lg [&_h3]:font-clash [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-secondary [&_h3]:mb-2
          [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-zinc-600 [&_p]:dark:text-zinc-400 [&_p]:mb-3
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
          [&_img]:rounded-xl [&_img]:my-4 [&_img]:max-w-full
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
          [&_td]:border [&_td]:border-zinc-200 [&_td]:dark:border-zinc-800 [&_td]:p-2
          [&_th]:border [&_th]:border-zinc-200 [&_th]:dark:border-zinc-800 [&_th]:p-2 [&_th]:bg-zinc-100 [&_th]:dark:bg-zinc-800 [&_th]:font-semibold
          [&_hr]:my-6 [&_hr]:border-zinc-200 [&_hr]:dark:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-0 text-zinc-900 dark:text-zinc-100 font-satoshi transition-colors duration-300">
        {/* BREADCRUMBS */}
        <div className="flex justify-between items-center mb-4">
          <nav className="flex items-center gap-1 text-sm leading-5 text-text-primary font-normal">
            <Link href="/">
              <Home className="w-4 h-4" />
            </Link>
            <RiArrowRightSLine className="w-5 h-5" />
            <Link href="/projects">Projects</Link>
            <RiArrowRightSLine className="w-5 h-5" />
            <span>{project.title}</span>
          </nav>

          {/* PROJECT YEAR */}
          {project.year && (
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-zinc-50 dark:bg-zinc-900 text-sm font-normal text-text-primary border border-gray-300 dark:border-zinc-800/60">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* BANNER IMAGE */}
        {(project.bannerImage || project.thumbnail) && (
          <div className="w-full aspect-7/2 mb-8 relative rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 shadow-xs">
            <Image
              src={project.bannerImage || project.thumbnail!}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* TITLE, DESCRIPTION, METADATA, TECH STACK */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <h1 className="text-[28px] leading-7 font-clash font-semibold tracking-normal text-secondary">
                {project.title}
              </h1>
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex justify-between sm:justify-center items-center gap-3">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank">
                    <HoverButton>Live Preview</HoverButton>
                  </Link>
                )}

                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank">
                    <HoverButton>Visit Github</HoverButton>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* DESCRIPTION & METADATA GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-zinc-100 dark:border-zinc-900 items-start">
            <div className="lg:col-span-8">
              <p className="text-lg leading-6 text-text-primary font-normal max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2 text-base text-text-primary">
              {(project.roles || project.client) && (
                <>
                  {project.roles && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold leading-6 w-14 shrink-0">
                        Roles:
                      </span>
                      <span className="leading-snug">{project.roles}</span>
                    </div>
                  )}
                  {project.client && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold leading-6 w-14 shrink-0">
                        Client:
                      </span>
                      <span className="leading-snug">{project.client}</span>
                    </div>
                  )}
                </>
              )}
              {/* {project.category && (
              <div className="flex items-start gap-8">
                <span className="font-semibold leading-6 w-14 shrink-0">
                  Category:
                </span>
                <span className="leading-snug">{project.category.name}</span>
              </div>
            )} */}
            </div>
          </div>

          {/* TECH STACK */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {(showAllTech ? techStack : techStack.slice(0, 3)).map(
                (tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full text-sm leading-5 font-normal text-text-primary"
                  >
                    {tech}
                  </span>
                ),
              )}
              {techStack.length > 3 && (
                <button
                  onClick={() => setShowAllTech(!showAllTech)}
                  className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full text-sm leading-5 font-normal text-text-primary transition-all duration-200"
                >
                  {showAllTech ? "Show Less" : `+${techStack.length - 3}`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pt-12 items-start relative">
          {/* LEFT COLUMN - Section Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {sections.length > 0 ? (
              sections.map((section) => {
                const sectionHash = labelToHash(section.label);
                return (
                  <section
                    key={section.id}
                    id={sectionHash}
                    className="scroll-mt-24"
                  >
                    <h3 className="text-2xl font-clash font-medium tracking-tight text-secondary mb-4">
                      <a
                        href={`#${sectionHash}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.hash = sectionHash;
                        }}
                        className="inline-flex items-center gap-2 group"
                      >
                        {section.label}
                        <FiLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary" />
                      </a>
                    </h3>
                    {renderRichContent(section.content)}
                  </section>
                );
              })
            ) : (
              <div className="text-center py-16 text-text-primary/60">
                <p className="text-lg">
                  No detailed sections available for this project.
                </p>
              </div>
            )}

            {/* SOCIALS SHARE FOR MOBILE */}
            <div className="md:hidden flex justify-between items-center ">
              <div className="text-text-primary text-base leading-snug font-normal tracking-normal inline-flex items-center gap-2">
                Share this project
              </div>
              <div className="flex items-center gap-4 text-text-primary group/socials">
                <a
                  href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(project.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                >
                  <FiMail className="w-5 h-5" />
                </a>
                <button
                  onClick={handleShare}
                  className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PREVIOUS / NEXT NAVIGATION */}
            {/* {(previousProject || nextProject) && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                {previousProject ? (
                  <Link
                    href={`/projects/${previousProject.slug}`}
                    className="w-full sm:w-1/2 group flex flex-col gap-1.5 items-start text-left p-4 border border-zinc-300 dark:border-zinc-800 bg-accent hover:bg-[#E8EBEE]/60 dark:hover:bg-zinc-900 rounded-xl"
                  >
                    <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                      <MdKeyboardArrowLeft className="w-5 h-5" /> Previous
                    </span>
                    <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                      {previousProject.title}
                    </span>
                  </Link>
                ) : (
                  <div className="w-full sm:w-1/2" />
                )}

                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="w-full sm:w-1/2 group flex flex-col gap-1.5 items-end text-right p-4 border border-zinc-300 dark:border-zinc-800 bg-accent hover:bg-[#E8EBEE]/60 dark:hover:bg-zinc-900 rounded-xl"
                  >
                    <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                      Next <MdKeyboardArrowRight className="w-5 h-5" />
                    </span>
                    <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                      {nextProject.title}
                    </span>
                  </Link>
                ) : (
                  <div className="w-full sm:w-1/2" />
                )}
              </div>
            )} */}

            {/* PREVIOUS / NEXT NAVIGATION */}
            {(previousProject || nextProject) && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                {previousProject && (
                  <Link
                    href={`/projects/${previousProject.slug}`}
                    className={cn(
                      "group flex flex-col gap-1.5 items-start text-left p-4 border border-zinc-300 dark:border-zinc-800 bg-accent hover:bg-[#E8EBEE]/60 dark:hover:bg-zinc-900 rounded-xl",
                      nextProject ? "w-full sm:w-1/2" : "w-full",
                    )}
                  >
                    <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                      <MdKeyboardArrowLeft className="w-5 h-5" /> Previous
                    </span>
                    <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                      {previousProject.title}
                    </span>
                  </Link>
                )}

                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className={cn(
                      "group flex flex-col gap-1.5 items-end text-right p-4 border border-zinc-300 dark:border-zinc-800 bg-accent hover:bg-[#E8EBEE]/60 dark:hover:bg-zinc-900 rounded-xl",
                      previousProject ? "w-full sm:w-1/2" : "w-full",
                    )}
                  >
                    <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                      Next <MdKeyboardArrowRight className="w-5 h-5" />
                    </span>
                    <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                      {nextProject.title}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          {sections.length > 0 && (
            <aside className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:flex flex-col gap-8 self-start transition-all duration-300">
              <OnThisPageMenu sections={sections} />

              {/* SOCIALS SHARE */}
              <div className="flex flex-col">
                <div className="text-text-primary text-base leading-snug font-normal tracking-normal mb-3.5 inline-flex items-center gap-2">
                  Share this project
                </div>
                <div className="flex items-center gap-4 text-text-primary group/socials">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(project.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                  >
                    <FiMail className="w-5 h-5" />
                  </a>

                  {/* WEB SHARE */}
                  <button
                    onClick={handleShare}
                    className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
