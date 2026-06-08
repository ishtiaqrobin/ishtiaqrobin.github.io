"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = "",
  duration = 2,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      const timeoutId = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
