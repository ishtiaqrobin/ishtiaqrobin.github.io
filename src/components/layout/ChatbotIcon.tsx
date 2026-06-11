"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ChatbotIcon() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftEyeRef.current || !rightEyeRef.current) return;

      const leftRect = leftEyeRef.current.getBoundingClientRect();
      const leftCenterX = leftRect.left + leftRect.width / 2;
      const leftCenterY = leftRect.top + leftRect.height / 2;

      const angle = Math.atan2(
        e.clientY - leftCenterY,
        e.clientX - leftCenterX,
      );
      const maxDistance = 4;
      const moveX = Math.cos(angle) * maxDistance;
      const moveY = Math.sin(angle) * maxDistance;

      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      // whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-14 sm:w-16 h-14 sm:h-16 bg-[#18181B] hover:bg-[#2E2E31] dark:bg-[#FAFAFA] hover:dark:bg-[#E2E2E2] rounded-full flex items-center justify-center relative cursor-pointer"
    >
      {/* ─── EYES & PUPIL ─── */}
      <div className="flex items-center gap-0.5">
        {/* LEFT EYE */}
        <div
          ref={leftEyeRef}
          className="w-5 bg-white rounded-full border-2 border-black flex items-center justify-center relative overflow-hidden transition-all duration-100"
          style={{ height: isBlinking ? "1px" : "22px" }}
        >
          <div
            className="w-2.5 h-2.5 bg-zinc-950 rounded-full absolute transition-transform duration-75 ease-out flex items-start justify-start p-0.5"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <div className="w-0.5 h-0.5 bg-white rounded-full ml-0.5" />
          </div>
        </div>

        {/* RIGHT EYE */}
        <div
          ref={rightEyeRef}
          className="w-5 bg-white rounded-full border-2 border-black flex items-center justify-center relative overflow-hidden transition-all duration-100"
          style={{ height: isBlinking ? "1px" : "22px" }}
        >
          <div
            className="w-2.5 h-2.5 bg-zinc-950 rounded-full absolute transition-transform duration-75 ease-out flex items-start justify-start p-0.5"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <div className="w-0.5 h-0.5 bg-white rounded-full ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
