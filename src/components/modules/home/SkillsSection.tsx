"use client";

import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "motion/react";

import SectionTitle from "@/components/common/SectionTitle";
import SkillBar from "@/components/common/SkillBar";
import { skillService } from "@/services/skill.service";
import { ISkill } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";

interface GroupedSkills {
  category: string;
  skills: ISkill[];
}

export function SkillsSection() {
  const [groupedSkills, setGroupedSkills] = useState<GroupedSkills[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await skillService.getSkills();

        if (error) {
          throw new Error(error.message);
        }

        const skills = data || [];

        // Group skills by category name
        const groups: Record<string, ISkill[]> = {};
        skills.forEach((skill: ISkill) => {
          const catName = skill.category?.name || "Other";
          if (!groups[catName]) {
            groups[catName] = [];
          }
          groups[catName].push(skill);
        });

        const formattedGroups = Object.keys(groups).map((key) => ({
          category: key,
          skills: groups[key],
        }));

        setGroupedSkills(formattedGroups);
        if (formattedGroups.length > 0) {
          setActiveCategory(formattedGroups[0].category);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (!isLoading && groupedSkills.length === 0) return null;

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative bg-gray-50/50 dark:bg-transparent overflow-hidden"
    >
      {/* Seamless Top & Bottom Color Fade */}
      {/* <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" /> */}

      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />

      {/* Stylish Diagonal Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.08] opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' stroke='%234f46e5' stroke-width='1.5' fill='none' fill-rule='evenodd' opacity='0.8'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/10 dark:via-primary-500/15 to-transparent opacity-60" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle="My Expertise"
          title="Technologies I Work With"
          description="A comprehensive toolkit of creative and technical tools used to bring digital visions to life."
        />

        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-xl" />
            ))}
          </div>
        ) : (
          /* Category Tabs */
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {groupedSkills.map((cat) => (
              <motion.button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat.category
                  ? "bg-linear-to-r from-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/25 border border-primary-500"
                  : "bg-white/10 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10 border border-dark/10 dark:border-white/10 hover:border-primary-500 dark:hover:border-primary-500"
                  }`}
              >
                {cat.category}
              </motion.button>
            ))}
          </div>
        )}

        {/* Skills Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {groupedSkills.find(
                  (cat) => cat.category === activeCategory
                )?.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.id}
                    skill={skill}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
