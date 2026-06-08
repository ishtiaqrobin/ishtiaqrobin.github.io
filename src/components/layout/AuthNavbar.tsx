"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import { PERSONAL_INFO } from "@/utils/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent ${scrolled
                    ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/10"
                    : "bg-transparent"
                    }`}
                transition={{ duration: 0.5 }}
            >
                <nav className="container-custom flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            className="text-2xl font-bold font-mono text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <span className="text-primary">&lt;</span>
                            {PERSONAL_INFO.name.split(" ")[0]}
                            <span className="text-primary"> /&gt;</span>
                        </motion.div>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all border border-gray-200 dark:border-white/10"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {theme === "dark" ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <HiSun className="text-lg" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <HiMoon className="text-lg" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        <Link href="/">
                            <Button
                                variant={"outline"}
                                size={"sm"}
                                className="inline-flex cursor-pointer"
                            >
                                <span className="hidden sm:inline">Back to Home</span>
                                <span className="sm:hidden">Home</span>
                            </Button>
                        </Link>
                    </div>
                </nav>
            </motion.header>
        </>
    );
}
