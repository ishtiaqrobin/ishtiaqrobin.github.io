"use client";

import { useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import type { IProjectSection } from "@/types";

interface OnThisPageMenuProps {
  sections: IProjectSection[];
  className?: string;
}

const labelToHash = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

export default function OnThisPageMenu({
  sections,
  className = "",
}: OnThisPageMenuProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!sections.length) return;

    const ids = sections.map((s) => labelToHash(s.label));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (ids.length > 0) {
        const firstEl = document.getElementById(ids[0]);
        if (firstEl && window.scrollY < firstEl.offsetTop) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!sections.length) return null;

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2 text-text-primary text-sm font-medium leading-5 tracking-wider">
        <RiMenu2Line className="w-4 h-4" />
        On this page
      </div>

      {/* Sidebar Navigation Links */}
      <div className="flex flex-col relative py-3">
        {sections.map((section) => {
          const isActive = activeSection === labelToHash(section.label);
          return (
            <a
              key={section.id}
              href={`#${labelToHash(section.label)}`}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionHash = labelToHash(section.label);
                  window.location.hash = sectionHash;
                  setActiveSection(sectionHash);
                }}
              className={`relative py-1.5 text-sm font-normal transition-all duration-300 border-l-2 ${
                section.label.length === 2 ? "pl-[30px]" : "pl-[14px]"
              } ${
                isActive
                  ? "text-primary border-primary font-normal"
                  : "text-text-primary border-zinc-300/60 dark:border-zinc-800 hover:text-secondary"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
