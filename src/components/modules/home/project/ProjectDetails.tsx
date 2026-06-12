"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFacebook, FiLinkedin, FiMail, FiShare2 } from "react-icons/fi";
import { Home } from "lucide-react";
import { RiArrowRightSLine, RiMenu2Line } from "react-icons/ri";
import HoverButton from "../../shared/HoverButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface SocialLink {
  id: number;
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 1,
    icon: <FiLinkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/abdulrahman-al-egabi/",
    label: "LinkedIn",
  },
  {
    id: 2,
    icon: <FiMail className="w-5 h-5" />,
    href: `mailto:ishtiaqrobin@gmail.com`,
    label: "Email",
  },
  {
    id: 3,
    icon: <FiFacebook className="w-5 h-5" />,
    href: "https://www.facebook.com/abdulrahman.al.egabi/",
    label: "Facebook",
  },
  {
    id: 4,
    icon: <FiShare2 className="w-5 h-5" />,
    href: "https://www.facebook.com/abdulrahman.al.egabi/",
    label: "Share",
  },
];

// Mock teach stack data
const ALL_TECH_STACK = [
  "ReactJS",
  "Zustand",
  "TailwindCSS",
  "TypeScript",
  "Next.js",
  "Framer Motion",
  "Shadcn UI",
];

export default function ProjectDetails() {
  const pathname = usePathname();
  const [showAllTech, setShowAllTech] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // স্ক্রল করার সময় ডানপাশের সাইডবারের সেকশন হাইলাইট করার রিয়েল-টাইম মেকানিজম
  useEffect(() => {
    const sections = ["features", "tech-used", "build-steps"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 text-zinc-900 dark:text-zinc-100 font-satoshi transition-colors duration-300">
      {/* ─── 1. BREADCRUMBS ─── */}
      <nav className="flex items-center gap-1 text-sm leading-5 text-text-primary font-normal mb-6">
        <Home className="w-4 h-4" />
        <RiArrowRightSLine className="w-5 h-5" />
        <Link href="/projects">Projects</Link>
        <RiArrowRightSLine className="w-5 h-5" />
        <span>Code Screenshot</span>
      </nav>

      {/* ─── 2. PROJECT THUMBNAIL (Aspect Video Ratio) ─── */}
      <div className="w-full aspect-7/2 mb-8 relative rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 shadow-xs">
        <Image
          src="https://res.cloudinary.com/dcfhqij0i/image/upload/v1781234828/7vb2vqt67mtyky8nwpvh_ngfhce.webp"
          alt="Code Screenshot Thumbnail"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* TITLE, DESCRIPTION, METADATA, TECH STACK */}
      <div className="space-y-6">
        {/* ─── ৩. HEADER INFO ROW (Title & Check it out) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <h1 className="text-[28px] leading-7 font-clash font-semibold tracking-normal text-secondary">
              Code Screenshot
            </h1>
          </div>

          {/* Check it out Outline CTA Button */}
          <Link href="https://github.com" target="_blank">
            <HoverButton>Check it out</HoverButton>
          </Link>
        </div>

        {/* ─── ৪. DESCRIPTION & METADATA GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-zinc-100 dark:border-zinc-900 items-start">
          {/* Description */}
          <div className="lg:col-span-8">
            <p className="text-lg leading-6 text-text-primary font-normal max-w-3xl">
              A powerful tool for sharing code snippets with additional
              features. Share beautiful screenshots of your code on your social
              media platforms. Supports multiple languages and themes seamlessly
              without setting up any local heavy compilers.
            </p>
          </div>

          {/* Roles & Client */}
          <div className="lg:col-span-4 flex flex-col gap-2 text-base text-text-primary">
            <div className="flex items-start gap-2">
              <span className="font-semibold leading-6 w-14 shrink-0">
                Roles:
              </span>
              <span className="leading-snug">Full-stack Developer.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold leading-6 w-14 shrink-0">
                Client:
              </span>
              <span className="leading-snug">Personal Project</span>
            </div>
          </div>
        </div>

        {/* ─── ৫. TECH STACK ─── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* First 3 or All */}
          {(showAllTech ? ALL_TECH_STACK : ALL_TECH_STACK.slice(0, 3)).map(
            (tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full text-sm leading-5 font-normal text-text-primary"
              >
                {tech}
              </span>
            ),
          )}

          {/* Dynamic loop controller */}
          {!showAllTech ? (
            <button
              onClick={() => setShowAllTech(true)}
              className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full text-sm leading-5 font-normal text-text-primary transition-all duration-200"
            >
              +{ALL_TECH_STACK.length - 3}
            </button>
          ) : (
            <button
              onClick={() => setShowAllTech(false)}
              className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full text-sm leading-5 font-normal text-text-primary transition-all duration-300"
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* 6.2 Column Layout (Left Column: Content, Right Column: Better-Auth Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pt-12 items-start relative">
        {/* Left Column (Sections and Documentation Content) */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          {/* Features Section */}
          <section id="features" className="scroll-mt-24">
            <h3 className="text-2xl font-clash font-medium tracking-tight text-secondary mb-6">
              Features
            </h3>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
            <ul className="list-disc list-outside space-y-2 text-base text-zinc-500 dark:text-zinc-400 marker:text-zinc-300 dark:marker:text-zinc-700 pl-4">
              <li className="leading-relaxed">
                10+ elegant themes (light + dark theme included).
              </li>
              <li className="leading-relaxed">
                12+ font styles (popular whitespace monospace fonts optimized
                for IDE layouts).
              </li>
              <li className="leading-relaxed">
                Interactive scaling, multi-padding options and live code format
                highlights.
              </li>
            </ul>
          </section>

          {/* Technologies Used Section */}
          <section id="tech-used" className="scroll-mt-24">
            <h3 className="text-2xl font-clash font-medium tracking-tight text-secondary mb-4">
              Technologies used
            </h3>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal">
              This system utilizes advanced hybrid hydration architectures
              provided by Next.js App router. State tracking and immediate
              screen layout caching layers are powered securely with client-side
              Zustand stores.
            </p>
            {/* Quote Element (Quote Display Block) */}
            <blockquote className="border-l-2 border-primary pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 text-sm bg-zinc-50/50 dark:bg-zinc-900/30 py-2 pr-2 rounded-r-lg">
              Zustand allows managing lightning-fast user configuration
              parameters securely without triggers forcing heavy rendering
              cycles.
            </blockquote>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal">
              This system utilizes advanced hybrid hydration architectures
              provided by Next.js App router. State tracking and immediate
              screen layout caching layers are powered securely with client-side
              Zustand stores.
            </p>
            {/* Quote Element (Quote Display Block) */}
            <blockquote className="border-l-2 border-primary pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 text-sm bg-zinc-50/50 dark:bg-zinc-900/30 py-2 pr-2 rounded-r-lg">
              Zustand allows managing lightning-fast user configuration
              parameters securely without triggers forcing heavy rendering
              cycles.
            </blockquote>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal">
              This system utilizes advanced hybrid hydration architectures
              provided by Next.js App router. State tracking and immediate
              screen layout caching layers are powered securely with client-side
              Zustand stores.
            </p>
            {/* Quote Element (Quote Display Block) */}
            <blockquote className="border-l-2 border-primary pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 text-sm bg-zinc-50/50 dark:bg-zinc-900/30 py-2 pr-2 rounded-r-lg">
              Zustand allows managing lightning-fast user configuration
              parameters securely without triggers forcing heavy rendering
              cycles.
            </blockquote>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal">
              This system utilizes advanced hybrid hydration architectures
              provided by Next.js App router. State tracking and immediate
              screen layout caching layers are powered securely with client-side
              Zustand stores.
            </p>
            {/* Quote Element (Quote Display Block) */}
            <blockquote className="border-l-2 border-primary pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 text-sm bg-zinc-50/50 dark:bg-zinc-900/30 py-2 pr-2 rounded-r-lg">
              Zustand allows managing lightning-fast user configuration
              parameters securely without triggers forcing heavy rendering
              cycles.
            </blockquote>
          </section>

          {/* Build Steps Section */}
          <section id="build-steps" className="scroll-mt-24">
            <h3 className="text-2xl font-clash font-medium tracking-tight text-secondary mb-4">
              Build steps
            </h3>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal mb-4">
              Follow these simple configurations to replicate the staging
              workspace parameters:
            </p>
            {/* Fake Code Block */}
            <pre className="bg-zinc-950 p-4 rounded-xl text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 leading-relaxed">
              <code>{`npm install\nnpm run dev\n# Output target: http://localhost:3000`}</code>
            </pre>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal mb-4">
              Follow these simple configurations to replicate the staging
              workspace parameters:
            </p>
            {/* Fake Code Block */}
            <pre className="bg-zinc-950 p-4 rounded-xl text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 leading-relaxed">
              <code>{`npm install\nnpm run dev\n# Output target: http://localhost:3000`}</code>
            </pre>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal mb-4">
              Follow these simple configurations to replicate the staging
              workspace parameters:
            </p>
            {/* Fake Code Block */}
            <pre className="bg-zinc-950 p-4 rounded-xl text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 leading-relaxed">
              <code>{`npm install\nnpm run dev\n# Output target: http://localhost:3000`}</code>
            </pre>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal mb-4">
              Follow these simple configurations to replicate the staging
              workspace parameters:
            </p>
            {/* Fake Code Block */}
            <pre className="bg-zinc-950 p-4 rounded-xl text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 leading-relaxed">
              <code>{`npm install\nnpm run dev\n# Output target: http://localhost:3000`}</code>
            </pre>
            <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal mb-4">
              Follow these simple configurations to replicate the staging
              workspace parameters:
            </p>
            {/* Fake Code Block */}
            <pre className="bg-zinc-950 p-4 rounded-xl text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 leading-relaxed">
              <code>{`npm install\nnpm run dev\n# Output target: http://localhost:3000`}</code>
            </pre>
          </section>

          {/* ─── Bottom Navigation Button (Previous & Next Page) ─── */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Previous Button */}
            <Link
              href="/projects/previous-project"
              className="w-full sm:w-1/2 group flex flex-col gap-1.5 items-start text-left p-4 border border-zinc-300 dark:border-zinc-800 rounded-xl"
            >
              <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                <MdKeyboardArrowLeft className="w-5 h-5" /> Previous Page
              </span>
              <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                Portfolio Design
              </span>
            </Link>

            {/* Next Button */}
            <Link
              href="/projects/next-project"
              className="w-full sm:w-1/2 group flex flex-col gap-1.5 items-end text-right p-4 border border-zinc-300 dark:border-zinc-800 rounded-xl"
            >
              <span className="text-sm leading-5 font-medium text-text-primary tracking-widest inline-flex items-center transition-transform duration-300">
                Next Page <MdKeyboardArrowRight className="w-5 h-5" />
              </span>
              <span className="text-base leading-snug font-normal text-secondary mt-0.5">
                Fitness Tracker App
              </span>
            </Link>
          </div>
        </div>

        {/* ─── Right Side Column (Position: Sticky) ─── */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:flex flex-col gap-8 self-start transition-all duration-300">
          {/* On this page menu*/}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-text-primary text-sm font-medium leading-5 tracking-wider">
              <RiMenu2Line className="w-4 h-4" />
              On this page
            </div>

            {/* Sidebar Navigation Links */}
            <div className="flex flex-col relative py-3">
              {[
                { id: "features", label: "Features" },
                { id: "tech-used", label: "Technologies used" },
                { id: "build-steps", label: "Build steps" },
              ].map((item) => {
                const isSelected = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`${pathname}#${item.id}`}
                    className={`relative pl-[14px] py-1.5 text-sm font-normal transition-all duration-300 border-l-[1.5px] ${
                      isSelected
                        ? "text-primary border-primary font-normal"
                        : "text-text-primary border-zinc-300/60 dark:border-zinc-800"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Share This Project Zone */}
          <div className="flex flex-col">
            <div className="text-text-primary text-base leading-snug font-normal tracking-normal mb-3.5 inline-flex items-center gap-2">
              Share this project
            </div>
            <div className="flex items-center gap-4 text-text-primary group/socials">
              {SOCIAL_LINKS.map((social) => (
                <button
                  key={social.id}
                  className="transition-all duration-300 hover:text-text-primary hover:!opacity-100 group-hover/socials:opacity-40 text-base cursor-pointer"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
