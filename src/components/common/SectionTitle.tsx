"use client";

// import { motion } from "framer-motion";
import { motion } from "motion/react";

import GradientText from "@/components/common/GradientText";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  center = true,
}: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-16 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <motion.p
          className="text-primary font-mono text-sm md:text-base mb-3 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <GradientText>{title}</GradientText>
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={`mt-6 flex items-center gap-2 ${center ? "justify-center" : ""
          }`}
      >
        <div className="w-12 h-1 rounded-full bg-linear-to-r from-primary to-violet-500" />
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <div className="w-12 h-1 rounded-full bg-linear-to-r from-violet-500 to-primary" />
      </div>
    </motion.div>
  );
}
