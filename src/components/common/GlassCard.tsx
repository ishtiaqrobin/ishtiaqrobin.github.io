import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, glowColor = "accent", hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass-card p-8 relative overflow-hidden group",
        className
      )}
    >
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 border border-white/20 pointer-events-none" />
      
      {children}
    </motion.div>
  );
}
