// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";

// import { HiSun, HiMoon } from "react-icons/hi";
// import { useTheme } from "next-themes";
// import { useAuth } from "@/hooks/useAuth";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export const NAV_LINKS = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Projects", href: "/projects" },
//   // { name: "Blogs", href: "/blogs" },
//   { name: "Contact", href: "/contact" },
// ];

// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const { user } = useAuth();
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // const getDashboardUrl = () => {
//   //   if (user?.role === "ADMIN") return "/admin-dashboard";
//   //   return "/user-dashboard";
//   // };

//   return (
//     <>
//       <motion.header
//         className={`fixed hidden sm:block top-3.5 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent`}
//         // initial={{ y: -100 }}
//         // animate={{ y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         <nav
//           className={`${
//             scrolled
//               ? "max-w-2xl mx-auto bg-white/65 dark:bg-[#0a0a0a]/75 backdrop-blur-xl px-1.5 border rounded-full"
//               : "container-custom bg-transparent border border-transparent"
//           } duration-700 transition-all flex items-center justify-between py-1`}
//         >
//           {/* Logo */}
//           <Link href="/">
//             <motion.div
//               // ${scrolled ? "px-2.5" : "px-0"}
//               className={`
//                 text-2xl px-2 font-bold font-clash italic text-secondary transition-all duration-300 cursor-pointer`}
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.99 }}
//             >
//               IR
//             </motion.div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {NAV_LINKS.map((link) => {
//               // Check if the link href matches the current pathname
//               const isActive = pathname === link.href;

//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   // flex and items-center are used to align the indicator and text on both sides
//                   className={`group relative flex items-center gap-2 px-2 text-sm font-normal leading-5 rounded-lg transition-colors duration-200 ${
//                     // isActive ? "text-primary" : "text-secondary"
//                     isActive ? "text-secondary" : "text-secondary"
//                   }`}
//                 >
//                   {/* Active indicator (text on the left side) */}
//                   {isActive ? (
//                     <motion.div
//                       className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
//                       layoutId="activeNav"
//                       layoutDependency={pathname} // ← এইটা যোগ করতে হবে
//                       transition={{
//                         type: "spring",
//                         stiffness: 380,
//                         damping: 30,
//                       }}
//                     />
//                   ) : (
//                     //  Inactive indicator (text on the right side)
//                     <div className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
//                   )}

//                   {/* Text Reveal Rolling Effect Container */}
//                   <div className="relative block h-5 overflow-hidden">
//                     {/* 1st Text: It will go up when hovered */}
//                     <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
//                       {link.name}
//                     </span>

//                     {/* 2nd Text: It will go down when hovered */}
//                     <span
//                       className={`absolute top-0 left-0 block transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 ${
//                         isActive
//                           ? "text-primary"
//                           : "text-gray-900 dark:text-white"
//                       }`}
//                     >
//                       {link.name}
//                     </span>
//                   </div>
//                 </Link>
//               );
//             })}

//             {/* Dashboard Button - ADMIN only */}
//             {user?.role === "ADMIN" && (
//               <Link
//                 href="/admin-dashboard"
//                 className={`group relative flex items-center gap-2 px-2 text-sm font-normal leading-5 rounded-lg transition-colors duration-200 ${
//                   pathname === "/admin-dashboard"
//                     ? "text-secondary"
//                     : "text-secondary"
//                 }`}
//               >
//                 {pathname === "/admin-dashboard" ? (
//                   <motion.div
//                     className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
//                     layoutId="activeNav"
//                     layoutDependency={pathname} // ← এইটা যোগ করতে হবে
//                     transition={{
//                       type: "spring",
//                       stiffness: 380,
//                       damping: 30,
//                     }}
//                   />
//                 ) : (
//                   <div className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
//                 )}

//                 <div className="relative block h-5 overflow-hidden">
//                   <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
//                     Dashboard
//                   </span>
//                   <span className="absolute top-0 left-0 block transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 text-gray-900 dark:text-white">
//                     Dashboard
//                   </span>
//                 </div>
//               </Link>
//             )}
//           </div>

//           {/* Right side */}
//           <div className="items-center gap-3">
//             {/* Theme toggle */}
//             <motion.button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2.5 rounded-full bg-gray-100/75 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-white/10 cursor-pointer"
//               aria-label="Toggle theme"
//             >
//               <AnimatePresence mode="wait">
//                 {theme === "dark" ? (
//                   <motion.div
//                     key="sun"
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <HiSun className="text-lg" />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="moon"
//                     initial={{ rotate: 90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -90, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <HiMoon className="text-lg" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </nav>
//       </motion.header>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [prevScrolled, setPrevScrolled] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── scrolled বদলানোর সাথে সাথেই (render phase এ) isResizing true করা হচ্ছে,
  // যাতে nav resize শুরু হওয়ার আগেই Framer এর layoutId বন্ধ থাকে।
  // prevScrolled কে state (ref না) দিয়ে track করা হচ্ছে, কারণ render এর সময়
  // ref.current read/write করা React এ নিষিদ্ধ।
  if (scrolled !== prevScrolled) {
    setPrevScrolled(scrolled);
    setIsResizing(true);
  }

  // ─── nav এর CSS resize (duration-700) শেষ হওয়ার পর isResizing false করা,
  // যাতে motion.div + layoutId ফিরে আসে এবং route change এ normal spring
  // animation কাজ করে।
  useEffect(() => {
    if (!isResizing) return;

    const timeout = setTimeout(() => {
      setIsResizing(false);
    }, 750); // nav এর duration-700 (700ms) + সামান্য buffer

    return () => clearTimeout(timeout);
  }, [isResizing]);

  // const getDashboardUrl = () => {
  //   if (user?.role === "ADMIN") return "/admin-dashboard";
  //   return "/user-dashboard";
  // };

  return (
    <>
      <motion.header
        className={`fixed hidden sm:block top-3.5 left-0 right-0 z-50 transition-all duration-300 bg-transparent dark:bg-dark/80 md:dark:bg-transparent`}
        transition={{ duration: 0.7 }}
      >
        <nav
          className={`${
            scrolled
              ? "max-w-2xl mx-auto bg-white/65 dark:bg-[#0a0a0a]/75 backdrop-blur-xl px-1.5 border rounded-full"
              : "container-custom bg-transparent border border-transparent"
          } duration-700 transition-all flex items-center justify-between py-1`}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={`
                text-2xl px-2 font-bold font-clash italic text-secondary transition-all duration-300 cursor-pointer`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              IR
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-2 px-2 text-sm font-normal leading-5 rounded-lg transition-colors duration-200 ${
                    isActive ? "text-secondary" : "text-secondary"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive ? (
                    isResizing ? (
                      // resize চলাকালীন plain div — কোনো Framer projection নেই,
                      // তাই কোনো ভুল path এ move করবে না, CSS flow এর সাথেই থাকবে
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    ) : (
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                  )}

                  <div className="relative block h-5 overflow-hidden">
                    <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      {link.name}
                    </span>
                    <span
                      className={`absolute top-0 left-0 block transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 ${
                        isActive
                          ? "text-primary"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Dashboard Button - ADMIN only */}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin-dashboard"
                className={`group relative flex items-center gap-2 px-2 text-sm font-normal leading-5 rounded-lg transition-colors duration-200 ${
                  pathname === "/admin-dashboard"
                    ? "text-secondary"
                    : "text-secondary"
                }`}
              >
                {pathname === "/admin-dashboard" ? (
                  isResizing ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  ) : (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                      layoutId="activeNav"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                )}

                <div className="relative block h-5 overflow-hidden">
                  <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                    Dashboard
                  </span>
                  <span className="absolute top-0 left-0 block transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 text-gray-900 dark:text-white">
                    Dashboard
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full bg-gray-100/75 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 border border-gray-200 dark:border-white/10 cursor-pointer"
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
          </div>
        </nav>
      </motion.header>
    </>
  );
}
