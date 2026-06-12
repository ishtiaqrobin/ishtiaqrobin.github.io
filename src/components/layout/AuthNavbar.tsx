"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RiHome8Fill } from "react-icons/ri";

export function AuthNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

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
        className={`fixed top-2 sm:top-3.5 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent`}
        transition={{ duration: 0.7 }}
      >
        <nav
          className={`${
            scrolled
              ? "bg-transparent sm:bg-white/65 max-w-xs sm:max-w-2xl mx-auto px-1.5"
              : "bg-transparent border border-transparent container-custom"
          } dark:bg-[#0a0a0a]/75 backdrop-blur-xl border rounded-full duration-700 transition-all flex items-center justify-between py-1`}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={`
                ${scrolled ? "text-xl sm:text-2xl" : "text-2xl"}
                font-bold font-clash italic px-1.5 sm:px-2 text-gray-900 dark:text-white hover:text-primary transition-all duration-300 cursor-pointer`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              IR
            </motion.div>
          </Link>

          {/* Back to Home button */}
          <Link href="/">
            <div
              className={`
               flex items-center gap-1.5 border px-2 py-1 rounded-full bg-accent dark:bg-white/5 text-gray-900 dark:text-white duration-700 transition-all shrink-0`}
            >
              {/* <TiHome className="text-2xl" /> */}
              <RiHome8Fill className="text-2xl" />
              <span>Back to Home</span>
            </div>
          </Link>

          {/* Theme toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`
                ${scrolled ? "p-2 sm:p-2.5" : "p-2.5"}
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
