"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

// ✅ Constant — প্রতি mousemove-এ re-create হবে না
const HOVER_SELECTORS = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  '[role="button"]',
  ".pointer-events-auto",
  ".hero-socials a",
  ".tech-icon",
].join(", ");

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // ✅ Dashboard-এ custom cursor দরকার নেই
  const isDashboard = pathname?.includes("dashboard");

  useEffect(() => {
    if (isDashboard) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Touch device-এ disable
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    gsap.set([cursor, follower], {
      xPercent: 0,
      yPercent: 0,
      force3D: true,
      opacity: 0,
    });

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const xTo = gsap.quickTo(follower, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(follower, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    let isVisible = false;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!isVisible) {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      xSetter(clientX);
      ySetter(clientY);
      xTo(clientX);
      yTo(clientY);

      const hoverTarget = (e.target as HTMLElement).closest(HOVER_SELECTORS);

      if (hoverTarget && !isHovering) {
        isHovering = true;
        gsap.to(cursor, { scale: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(follower, {
          scale: 1.5,
          borderColor: "rgba(139, 92, 246, 0.8)",
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (!hoverTarget && isHovering) {
        isHovering = false;
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(139, 92, 246, 0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // ✅ Click animation — visual feedback
    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.1, ease: "power2.out" });
      gsap.to(cursor, { scale: 0.6, duration: 0.1, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(follower, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: isHovering ? 0 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      // ✅ Memory leak fix — gsap tween kill
      xTo.tween?.kill();
      yTo.tween?.kill();
      gsap.killTweensOf([cursor, follower]);
    };
  }, [isDashboard]);

  // Dashboard-এ render-ই করো না
  if (isDashboard) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white dark:bg-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-primary-500/40 rounded-full pointer-events-none z-[9998] transition-colors duration-300 hidden md:block"
        style={{ willChange: "transform, opacity" }}
      />
    </>
  );
}
