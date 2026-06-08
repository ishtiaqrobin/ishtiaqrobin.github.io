"use client";
import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "motion/react";

interface TypewriterEffectProps {
  words: string[];
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gradient"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TypewriterEffect;
