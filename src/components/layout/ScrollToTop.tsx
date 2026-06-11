"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-22 right-6 z-50 transition-all duration-500 transform",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none",
      )}
    >
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className="h-12 w-12 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all bg-primary text-primary-foreground border border-primary-500/20 backdrop-blur-sm group"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
      </Button>
    </div>
  );
}
