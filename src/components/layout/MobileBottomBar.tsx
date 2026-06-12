"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiGrid, FiSend } from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BOTTOM_NAV_LINKS: NavItem[] = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "About", href: "/about", icon: FiUser },
  { name: "Projects", href: "/projects", icon: FiGrid },
  { name: "Contact", href: "/contact", icon: FiSend },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    /* 
     ─── Mobile Bottom Bar Container ───
     1. With 'lg:hidden' it will only show on mobile and tablet screens.
     2. 'rounded-t-[32px]' is given for smooth top-curve and pill body shape like in the screenshot.
     3. Because of 'fixed bottom-0' it will be perfectly locked at the bottom of the screen.
    */
    <div className="fixed sm:hidden bottom-0 left-0 right-0 z-50 bg-white/65 dark:bg-[#0a0a0a]/75 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 rounded-3xl rounded-b-none px-4 py-2.5 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {BOTTOM_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-1.5 flex-1 relative py-1"
            >
              {/* ─── আইকন লেয়ার ─── */}
              <div
                className={`transition-all duration-300 transform group-hover:scale-105 ${
                  isActive
                    ? "text-primary" // অ্যাক্টিভ থাকলে স্ক্রিনশটের মতো গ্রিন থিম কালার
                    : "text-text-primary"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>

              {/* ─── Text Reveal Rolling Effect Container ─── */}
              <div className="relative block h-4 overflow-hidden pointer-events-none">
                {/* ১ম টেক্সট: হভার করলে ওপরে উঠে যাবে */}
                <span
                  className={`block text-xs font-medium tracking-wide transition-transform duration-300 ease-in-out group-hover:-translate-y-full ${
                    isActive ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {link.name}
                </span>

                {/* ২য় টেক্সট: নিচ থেকে ওপরে উঠে আসবে */}
                <span
                  className={`absolute top-0 left-0 block text-xs font-medium tracking-wide text-center w-full transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 ${
                    isActive ? "text-primary" : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
