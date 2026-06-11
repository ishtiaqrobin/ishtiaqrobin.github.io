"use client";

import { motion, AnimatePresence } from "motion/react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiCalendarCheckFill } from "react-icons/pi";

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed sm:hidden block top-2 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent`}
        // initial={{ y: -100 }}
        // animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <nav
          className={`${
            scrolled
              ? "max-w-xs mx-auto bg-white/65 dark:bg-[#0a0a0a]/75 backdrop-blur-xl px-1.5 border rounded-full"
              : "container-custom bg-transparent border border-transparent"
          } duration-700 transition-all flex items-center justify-between py-1`}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={`
                ${scrolled ? "text-xl px-1.5" : "text-2xl px-1.5"} 
                 font-bold font-clash italic text-gray-900 dark:text-white hover:text-primary transition-all duration-300 cursor-pointer `}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              IR
            </motion.div>
          </Link>

          {/* Book a call button  */}
          <Link href="https://cal.com/ishtiaqrobin">
            <div
              className={`
              ${scrolled ? "flex items-center" : "hidden"}
               gap-1.5 border px-2 py-1 rounded-full bg-accent dark:bg-white/5 text-gray-900 dark:text-white duration-700 transition-all shrink-0`}
            >
              <PiCalendarCheckFill className="text-2xl" />
              <span>Book a call</span>
            </div>
          </Link>

          {/* Color mode toggle button  */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`
                ${scrolled ? "p-2" : "p-2.5"}
                rounded-full bg-white/80 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-white/10`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiSun className="text-lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiMoon className="text-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>
    </>
  );
}
