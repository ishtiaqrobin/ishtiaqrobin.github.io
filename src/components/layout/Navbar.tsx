"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS, PERSONAL_INFO } from "@/utils/constants";
import { scrollToSection, getInitials } from "@/utils/helpers";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const activeSection = useActiveSection();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (pathname === "/") {
      scrollToSection(href);
    }
  };

  const getDashboardUrl = () => {
    if (user?.role === "ADMIN") return "/admin-dashboard";
    return "/user-dashboard";
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent ${
          scrolled
            ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/10"
            : "bg-transparent"
        }`}
        // initial={{ y: -100 }}
        // animate={{ y: 0 }}
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === link.href && pathname === "/"
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.href && pathname === "/" && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all border border-gray-200 dark:border-white/10 hidden md:flex"
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

            {/* Auth section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button className="flex items-center gap-2 h-10 p-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name}
                      />
                      <AvatarFallback className="rounded-lg bg-linear-to-br from-primary to-violet-500 text-white text-xs font-bold">
                        {user?.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 pr-1">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl overflow-hidden"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardUrl()} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton
                      variant="ghost"
                      className="w-full justify-start px-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 cursor-pointer"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant={"default"}
                  size={"sm"}
                  className="hidden lg:inline-flex cursor-pointer"
                >
                  Hire Me
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <MobileNav />
          </div>
        </nav>
      </motion.header>
    </>
  );
}
