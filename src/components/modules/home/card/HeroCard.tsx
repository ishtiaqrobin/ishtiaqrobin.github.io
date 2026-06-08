"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiFramer,
  SiPostgresql,
  SiNextdotjs,
  SiGo,
  SiDocker,
} from "react-icons/si";

import { PERSONAL_INFO } from "@/utils/constants";

interface HeroCardProps {
  heroImg: string | null;
  isApiLoading: boolean;
  isImageLoading: boolean;
  setIsImageLoading: (loading: boolean) => void;
}

export const HeroCard = ({
  heroImg,
  isApiLoading,
  isImageLoading,
  setIsImageLoading,
}: HeroCardProps) => {
  return (
    <motion.div
      // before
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      // after
      // initial={{ opacity: 0, scale: 0.9, x: 30 }}
      // animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
      // transition={{ duration: 1, ease: "easeOut" }}
      className="hero-image-container relative flex items-center justify-center"
    >
      {/* Glow effect */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />

      {/* Image container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* Dynamic border ring */}
        <div
          className="absolute inset-0 rounded-full bg-linear-to-r from-primary-500 via-violet-500 to-primary-500 p-1 animate-spin-slow"
          style={{ backgroundSize: "200% 200%" }}
        >
          <div className="w-full h-full rounded-full bg-gray-50 dark:bg-[#0a0a0a]" />
        </div>

        {/* Profile Image */}
        <div className="absolute inset-2 rounded-full overflow-hidden z-10 bg-gray-100 dark:bg-[#0a0a0a]">
          <AnimatePresence>
            {(isApiLoading || isImageLoading) && (
              <motion.div
                key="image-loader"
                className="absolute inset-0 flex items-center justify-center z-20 bg-gray-100 dark:bg-[#0a0a0a]"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Outer pulsing ring */}
                <motion.div
                  className="absolute w-28 h-28 rounded-full border border-primary/20"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Middle pulsing ring */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full border border-primary/30"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
                {/* Slow outer arc */}
                <motion.div
                  className="absolute w-24 h-24 rounded-full"
                  style={{
                    border: "2px solid transparent",
                    borderTopColor: "#8b5cf6",
                    borderRightColor: "#6366f1",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                {/* Fast inner arc (counter-clockwise) */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full"
                  style={{
                    border: "2px solid transparent",
                    borderBottomColor: "#a78bfa",
                    borderLeftColor: "#818cf8",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Center glowing dot */}
                <motion.div
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7],
                    boxShadow: [
                      "0 0 6px 2px rgba(139,92,246,0.4)",
                      "0 0 14px 5px rgba(139,92,246,0.7)",
                      "0 0 6px 2px rgba(139,92,246,0.4)",
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {!isApiLoading && (
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={
                !isImageLoading
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.04 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={heroImg || PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </motion.div>
          )}
        </div>

        {/* Orbiting tech icons */}
        <div className="tech-icons-orbit absolute inset-0 z-20 pointer-events-none animate-orbit">
          {[
            { Icon: FaReact, color: "text-[#61DAFB]" },
            { Icon: SiNextdotjs, color: "text-black dark:text-white" },
            { Icon: FaNodeJs, color: "text-[#339933]" },
            // { Icon: SiJavascript, color: "text-[#F7DF1E]" },
            { Icon: SiTypescript, color: "text-[#3178C6]" },
            { Icon: SiGo, color: "text-[#00ADD8]" },
            { Icon: SiTailwindcss, color: "text-[#06B6D4]" },
            { Icon: SiDocker, color: "text-[#2496ED]" },
            {
              Icon: SiPostgresql,
              color: "text-[#31648c] dark:text-[#336791]",
            },
            { Icon: SiMongodb, color: "text-[#47A248]" },
            {
              Icon: SiExpress,
              color: "text-gray-900 dark:text-gray-300",
            },
          ].map((item, i, arr) => {
            const radius = 58;
            const angle = (i * (360 / arr.length) * Math.PI) / 180;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return (
              <div
                key={i}
                className="tech-icon absolute w-10 h-10 md:w-12 md:h-12 -ml-5 -mt-5 md:-ml-6 md:-mt-6 rounded-xl bg-white/30 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/20 flex items-center justify-center text-xl md:text-2xl shadow-lg pointer-events-auto transition-transform hover:scale-110 animate-orbit-reverse"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <item.Icon className={item.color} />
              </div>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-orbit {
          animation: orbit 25s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 25s linear infinite;
        }
      `,
        }}
      />
    </motion.div>
  );
};
