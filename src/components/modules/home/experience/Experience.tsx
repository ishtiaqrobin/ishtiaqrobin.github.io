"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiFigma,
  SiDocker,
  SiFirebase,
} from "react-icons/si";
import ShimmerText from "../../shared/ShimmerText";
import { ExperienceItem } from "@/types";

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    position: "Software Engineer",
    companyName: "OneShield Software",
    companyUrl: "https://oneshield.com",
    logo: <SiReact className="w-5 h-5 text-[#61DAFB]" />,
    duration: "Aug 2022 — Present",
    responsibilities: [
      "Led the frontend architecture development using Next.js and TypeScript.",
      "Optimized application performance, resulting in a 40% decrease in page load times.",
      "Collaborated with cross-functional teams to deliver scalable enterprise products.",
    ],
  },
  {
    id: 2,
    position: "Founder",
    companyName: "Design and Code",
    companyUrl: "https://designandcode.com",
    logo: <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />,
    duration: "Jan 2021 — Present",
    responsibilities: [
      "Built and scaled a tech community helping thousands of aspiring developers.",
      "Shipped multiple production-ready full-stack boilerplates and resources.",
      "Mentored junior engineers and designed educational curriculum.",
    ],
  },
  {
    id: 3,
    position: "Design Engineer",
    companyName: "BlackboxAI",
    companyUrl: "https://blackbox.ai",
    logo: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
    duration: "Feb 2025 — Mar 2025",
    responsibilities: [
      "Crafted high-fidelity interactive user interfaces and design systems.",
      "Bridged the gap between design and production code using advanced CSS.",
      "Implemented complex layout structures and micro-interactions.",
    ],
  },
  {
    id: 4,
    position: "UI/UX Designer",
    companyName: "Social3",
    companyUrl: "https://social3.in",
    logo: <SiFigma className="w-5 h-5 text-[#F24E1E]" />,
    duration: "Aug 2022 — Sep 2023",
    responsibilities: [
      "Designed web3 professional portfolio interfaces and branding materials.",
      "Conducted extensive user research to improve dashboard accessibility.",
      "Created motion prototypes to communicate feature mechanics seamlessly.",
    ],
  },
  {
    id: 5,
    position: "Full Stack Developer",
    companyName: "TechCorp",
    companyUrl: "#",
    logo: <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
    duration: "Mar 2022 — Jul 2022",
    responsibilities: [
      "Developed robust backend APIs with Node.js.",
      "Managed cloud infrastructure on AWS.",
    ],
  },
  {
    id: 6,
    position: "Backend Lead",
    companyName: "DevsInc",
    companyUrl: "#",
    logo: <SiNodedotjs className="w-5 h-5 text-[#339933]" />,
    duration: "Nov 2021 — Feb 2022",
    responsibilities: [
      "Optimized database queries in MongoDB.",
      "Structured real-time communication flows.",
    ],
  },
  {
    id: 7,
    position: "DevOps Engineer",
    companyName: "CloudScale",
    companyUrl: "#",
    logo: <SiDocker className="w-5 h-5 text-[#2496ED]" />,
    duration: "Jun 2021 — Oct 2021",
    responsibilities: [
      "Containerized microservices using Docker.",
      "Automated CI/CD workflows.",
    ],
  },
  {
    id: 8,
    position: "Mobile Developer",
    companyName: "AppStudio",
    companyUrl: "#",
    logo: <SiFirebase className="w-5 h-5 text-[#FFCA28]" />,
    duration: "Feb 2021 — May 2021",
    responsibilities: [
      "Built cross-platform apps with React Native.",
      "Integrated real-time database structures.",
    ],
  },
  {
    id: 9,
    position: "Junior Frontend Dev",
    companyName: "WebSolutions",
    companyUrl: "#",
    logo: <SiReact className="w-5 h-5 text-[#61DAFB]" />,
    duration: "Aug 2020 — Jan 2021",
    responsibilities: [
      "Translated Figma components into HTML/CSS.",
      "Maintained legacy web portals.",
    ],
  },
  {
    id: 10,
    position: "QA Engineer",
    companyName: "BetaTesting",
    companyUrl: "#",
    logo: <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />,
    duration: "May 2020 — Jul 2020",
    responsibilities: [
      "Wrote comprehensive end-to-end automated tests.",
      "Logged system performance benchmarks.",
    ],
  },
  {
    id: 11,
    position: "UI Developer",
    companyName: "PixelPerfect",
    companyUrl: "#",
    logo: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
    duration: "Jan 2020 — Apr 2020",
    responsibilities: [
      "Engineered reusable responsive component kits.",
      "Enhanced standard web vital metrics.",
    ],
  },
  {
    id: 12,
    position: "Product Designer",
    companyName: "InnoLabs",
    companyUrl: "#",
    logo: <SiFigma className="w-5 h-5 text-[#F24E1E]" />,
    duration: "Sep 2019 — Dec 2019",
    responsibilities: [
      "Created detailed wireframes and high-fidelity user journeys.",
      "Conducted extensive A/B feature user testing.",
    ],
  },
];

const INITIAL_COUNT = 4;

// ─── Extra rows এর smooth reveal wrapper ───
// এই কম্পোনেন্ট টি একটি div এর height কে 0 থেকে
// তার natural height পর্যন্ত CSS transition দিয়ে animate করে।
// Framer Motion এর "height: auto" animate করতে সমস্যা হয়,
// তাই এখানে ResizeObserver দিয়ে actual height মাপা হচ্ছে।
function ExpandableRows({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Inner content এর height track করা
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    // Initial measurement
    setHeight(el.scrollHeight);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      style={{
        height: show ? height : 0,
        // overflow hidden রাখলে collapsed অবস্থায় content লুকায়,
        // expanded হলে inner content এর border গুলো ঠিকমতো দেখায়
        overflow: "hidden",
        // Tailwind এর duration/ease class এর পরিবর্তে
        // raw CSS transition ব্যবহার করা হয়েছে — কারণ
        // inline style এর height value Tailwind জানে না।
        transition: "height 500ms cubic-bezier(0.25, 1, 0.5, 1)",
        // GPU layer promote করা — জাংকি reflow এড়াতে
        willChange: "height",
      }}
      aria-hidden={!show}
    >
      {/* এই inner div টিই আসল content ধরে রাখে */}
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function Experience() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialRows = EXPERIENCE_DATA.slice(0, INITIAL_COUNT);
  const extraRows = EXPERIENCE_DATA.slice(INITIAL_COUNT);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // ─── একটি single row এর markup ───
  const renderRow = (exp: ExperienceItem) => {
    const isOpen = expandedRow === exp.id;

    return (
      // layout="position" → রো expand/collapse হলে
      // নিচের রো গুলো jerk না করে smoothly reflow করে
      <motion.div
        key={exp.id}
        layout="position"
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="border-b border-zinc-200 dark:border-zinc-800 cursor-pointer group mb-4"
        onClick={() => toggleRow(exp.id)}
      >
        {/* মূল রো */}
        <div className="flex items-center justify-between pb-4 gap-4">
          <div className="flex items-center gap-4">
            {/* লোগো বক্স */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs shrink-0">
              {exp.logo}
            </div>

            {/* পজিশন + কোম্পানি */}
            <div className="flex flex-col">
              <h4 className="text-base font-medium text-secondary">
                {exp.position}
              </h4>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                // কোম্পানি লিংকে ক্লিক করলে যেন accordion toggle না হয়
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-text-primary font-medium hover:text-primary transition-colors duration-200 hover:underline inline-block mt-0.5"
              >
                @{exp.companyName}
              </a>
            </div>
          </div>

          {/* ডেট + expand আইকন */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-medium text-text-primary whitespace-nowrap">
              {exp.duration}
            </span>

            {/* Chevron আইকন — open হলে rotate হয় */}
            <span
              className="text-text-primary"
              style={{
                display: "inline-block",
                transition: "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden sm:block"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* ─── Accordion বডি ─── */}
        {/* Framer Motion এর height animate করা হচ্ছে।
            initial false দেওয়া আছে তাই page load এ animate হবে না। */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-6 pl-12 pr-4">
            <ul className="list-disc list-outside space-y-2 text-sm text-text-primary marker:text-text-primary">
              {exp.responsibilities.map((resp, idx) => (
                // <li key={idx} className="leading-5">
                //   {resp}
                // </li>
                <li key={idx} className="leading-relaxed inline-block w-full">
                  <span className="text-text-primary mr-2">•</span> {resp}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="w-full container-custom py-12 sm:py-22">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
        {/* ─── Left (Sidebar) ───
            showAll true হলেই sticky হবে, নাহলে normal flow এ থাকবে */}
        <div
          className={[
            "lg:col-span-5",
            // Tailwind এর transition utility — sticky ↔ relative swap কে smooth করে
            "transition-all duration-700 ease-out delay-300",
            showAll ? "lg:sticky lg:top-24" : "relative",
          ].join(" ")}
        >
          <ShimmerText className="mb-3.5">Work History</ShimmerText>

          <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight mb-6">
            Experience
          </h2>
          <p className="text-text-primary font-normal leading-normal text-base max-w-sm">
            I have worked with some of the most innovative industry leaders to
            help build their top-notch products.
          </p>
        </div>

        {/* ─── Right (Row List) ─── */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <div className="flex flex-col">
            {/* সবসময় দেখানো প্রথম ৪টি রো */}
            {initialRows.map(renderRow)}

            {/* ─── Extra rows (৫ থেকে ১২) ───
                ExpandableRows কম্পোনেন্ট height 0 → auto animate করে।
                Inner content এ AnimatePresence নেই — কারণ rows গুলো
                mount থাকে, শুধু parent wrapper টি collapse/expand হয়।
                এতে করে accordion খোলা থাকলেও show/hide তে জাংক হয় না। */}
            <ExpandableRows show={showAll}>
              {extraRows.map(renderRow)}
            </ExpandableRows>
          </div>

          {/* ─── Show More / Show Less বাটন ─── */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                // Show Less এ ক্লিক করলে extra rows এর accordion গুলো বন্ধ করে দাও
                // যাতে collapse animation এ কোনো extra height ঝামেলা না হয়
                if (showAll) {
                  setExpandedRow(null);
                }
                setShowAll((prev) => !prev);
              }}
              className={[
                // Base styles
                "group inline-flex items-center gap-2 cursor-pointer",
                "px-5 py-2.5 rounded-full text-sm font-medium",
                "border border-zinc-300 dark:border-zinc-700",
                "bg-white dark:bg-zinc-900",
                "text-zinc-700 dark:text-zinc-300",
                // Hover
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "hover:border-zinc-400 dark:hover:border-zinc-600",
                // Transition
                "transition-transform duration-300 ease-out",
                // Focus ring (a11y)
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
              ].join(" ")}
              aria-expanded={showAll}
            >
              <span>{showAll ? "Show Less" : "Show More"}</span>

              {/* বাটনের ছোট্ট chevron আইকন */}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transition: "transform 400ms cubic-bezier(0.25, 1, 0.5, 1)",
                  transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
