"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiMenu, HiSun, HiMoon } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS, PERSONAL_INFO } from "@/utils/constants";
import { scrollToSection } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const activeSection = useActiveSection();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const handleNavClick = (href: string) => {
        if (pathname === "/") {
            scrollToSection(href);
        }
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                    <HiMenu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/5">
                <SheetHeader className="p-6 border-b border-gray-100 dark:border-white/5">
                    <SheetTitle className="text-left">
                        <Link href="/" onClick={() => setOpen(false)}>
                            <div className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                                <span className="text-primary">&lt;</span>
                                {PERSONAL_INFO.name.split(" ")[0]}
                                <span className="text-primary"> /&gt;</span>
                            </div>
                        </Link>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-6 h-[calc(100vh-80px)]">
                    <nav className="flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={`text-left text-lg font-semibold py-3 px-4 rounded-lg transition-all ${activeSection === link.href && pathname === "/"
                                    ? "text-primary bg-primary/5"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
                        {/* Theme Toggle in Mobile Nav */}
                        <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-white/5 rounded-lg">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg bg-white dark:bg-white/10 shadow-sm border border-gray-200 dark:border-white/10 text-yellow-500"
                            >
                                {theme === "dark" ? <HiSun /> : <HiMoon />}
                            </button>
                        </div>

                        {!isAuthenticated ? (
                            <Link href="/login" onClick={() => setOpen(false)} className="block">
                                <Button
                                    variant="default"
                                    className="w-full h-12 text-lg font-bold rounded-lg shadow-lg shadow-primary/20"
                                >
                                    Hire Me
                                </Button>
                            </Link>
                        ) : (
                            <div className="space-y-3">
                                <LogoutButton
                                    variant="ghost"
                                    className="w-full h-12 justify-start gap-3 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-4"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
