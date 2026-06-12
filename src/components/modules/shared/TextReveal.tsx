"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  // stagger speed কাস্টমাইজ করতে চাইলে (optional)
  staggerDelay?: number;
  // প্রতিটি character এর animation duration (optional)
  duration?: number;
}

export default function TextReveal({
  children,
  className,
  staggerDelay = 0.03, // character থেকে character এর delay
  duration = 0.55,
}: TextRevealProps) {
  // ─── টেক্সট কে word এ ভাগ করো ───
  const words = children.split(" ");

  // ─── Parent container — stagger orchestrator ───
  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // container নিজে hide হবে না
    visible: {
      opacity: 1,
      transition: {
        // প্রতিটি character এর মাঝে stagger
        // word এর মাঝে একটু বেশি gap দেওয়া হবে character level এ
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  // ─── প্রতিটি character এর animation ───
  const charVariants: Variants = {
    hidden: {
      y: "105%", // নিচে লুকানো — overflow-hidden এ দেখা যাবে না
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1], // spring-like cubic bezier
      },
    },
  };

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex flex-wrap text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight ${className ?? ""}`}
      // stagger টা flat character level এ কাজ করার জন্য
      // প্রতিটি word কে আলাদা span এ রাখা হচ্ছে (space সহ)
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          // word এর মাঝে space — mr দিয়ে
          className="inline-flex mr-[0.27em]"
          aria-hidden="true"
        >
          {word.split("").map((char, charIdx) => (
            /*
              প্রতিটি character এর জন্য একটি clip container।
              overflow-hidden থাকায় y: "105%" থেকে y: 0 পর্যন্ত
              আসার পথটা দেখা যায় না — ইমেজের মতো clean cut effect।
            */
            <span
              key={charIdx}
              className="inline-block overflow-hidden leading-[1.15]"
            >
              <motion.span variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}

      {/* Screen reader এর জন্য আসল টেক্সট (hidden) */}
      <span className="sr-only">{children}</span>
    </motion.h2>
  );
}
