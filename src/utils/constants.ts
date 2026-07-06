// import profileImage from "../assets/images/hero_section.webp";

import { Project } from "@/types";
import { AwardItem } from "@/types/awards.type";

export const PERSONAL_INFO = {
  name: "Ishtiaq Robin",
  linkedin: "https://linkedin.com/in/ishtiaqrobin",
  facebook: "https://www.facebook.com/ishtiaqrobin.me",
  instagram: "https://instagram.com/ishtiaqrobins",
  whatsapp: "+8801762627422",
  email: "ishtiaqrobin.me@gmail.com",
  github: "https://github.com/ishtiaqrobin",

  resumeUrl:
    "https://drive.google.com/file/d/1pdQ7AtGZetje83iAOXZS5qTJVZIEXwmz/view?usp=drive_link",
  profileImage:
    "https://res.cloudinary.com/dcfhqij0i/image/upload/q_auto/f_auto/v1780581746/ishtiaq-robin/about/je9zx4yk8ud-1780581744939-black-shirt.webp", // Fallback to the existing image
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/admin-dashboard" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "aora",
    title: "Aora",
    categories: ["Development"],
    year: "2024",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/q_auto/f_auto/v1781194103/aora_ftkx9s.webp",
    bgColor: "bg-[#fef08a]/70 dark:bg-[#fef08a]/20", // Light Yellow Background
  },
  {
    id: "code-screenshot",
    title: "Code Screenshot",
    categories: ["Development", "Design"],
    year: "2024",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/q_auto/f_auto/v1781194103/codescreenshot_v4h3gm.webp",
    bgColor: "bg-[#fbcfe8]/70 dark:bg-[#fbcfe8]/20", // Light Pink Background
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracker App",
    categories: ["Design"],
    year: "2025",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/q_auto/f_auto/v1781194103/iphone_tnhh1h.webp",
    bgColor: "bg-[#bbf7d0]/60 dark:bg-[#bbf7d0]/10", // Light Green Background
  },
  {
    id: "portfolio-design",
    title: "Portfolio Design",
    categories: ["Design"],
    year: "2023",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/q_auto/f_auto/v1781194102/ochidesign_qcujbg.webp",
    bgColor: "bg-[#bfdbfe]/70 dark:bg-[#bfdbfe]/20", // Light Blue Background
  },
];

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 1,
    title: "AI-Driven Full Stack Web Engineering",
    subTitle: "Programming Hero",
    date: "AUG 2026",
    details: [
      "Building production-ready full-stack applications with Next.js, Node.js, and PostgreSQL.",
      "Integrating AI automation workflows and LLM-powered features into real client projects.",
      "Exploring advanced backend patterns including authentication, caching, and load testing.",
    ],
  },
  {
    id: 2,
    title: "Next Level Web Development",
    subTitle: "Programming Hero",
    date: "NOV 2025",
    details: [
      "Mastered TypeScript-first development with Next.js App Router and server actions.",
      "Implemented complex UI components with Framer Motion, GSAP, and Three.js animations.",
      "Built and deployed scalable REST APIs using Express.js and Fastify with Prisma ORM.",
    ],
  },
  {
    id: 3,
    title: "Complete End Game",
    subTitle: "Programming Hero",
    date: "FEB 2024",
    details: [
      "Developed full-stack projects integrating React frontend with Laravel and Node.js backends.",
      "Worked with relational databases including MySQL and PostgreSQL for production deployments.",
      "Deployed applications across Vercel, cPanel, Railway, and VPS environments.",
    ],
  },
  {
    id: 4,
    title: "Complete Web Development",
    subTitle: "Programming Hero",
    date: "MAY 2023",
    details: [
      "Built foundational skills in HTML, CSS, JavaScript, and React from the ground up.",
      "Created responsive, accessible UI layouts using Tailwind CSS and component-based design.",
      "Completed multiple hands-on projects covering both frontend and backend fundamentals.",
    ],
  },
  // {
  //   id: 5,
  //   title: "Top Open Source Contributor",
  //   subTitle: "Hacktoberfest",
  //   date: "OCT 2021",
  //   details: ["Merged 10+ core pull requests in global utility libraries."],
  // },
  // {
  //   id: 6,
  //   title: "UI/UX Speed Coding Winner",
  //   subTitle: "TechFest 2022",
  //   date: "JAN 2022",
  //   details: [
  //     "Built a complex dashboard UI inside a 2-hour competitive window.",
  //   ],
  // },
  // {
  //   id: 7,
  //   title: "Outstanding Team Player",
  //   subTitle: "OneShield Inc",
  //   date: "DEC 2022",
  //   details: ["Voted by peers for cross-team supportive engineering tasks."],
  // },
  // {
  //   id: 8,
  //   title: "Problem Solver Certificate",
  //   subTitle: "LeetCode Elite",
  //   date: "MAR 2023",
  //   details: [
  //     "Maintained a 200+ day streak solving complex algorithmic setups.",
  //   ],
  // },
  // {
  //   id: 9,
  //   title: "Next.js Pioneer Badge",
  //   subTitle: "Vercel Community",
  //   date: "JUN 2023",
  //   details: [
  //     "Shipped dynamic optimization models deployed within major scale apps.",
  //   ],
  // },
  // {
  //   id: 10,
  //   title: "Clean Code Evangelist",
  //   subTitle: "DevsUnited",
  //   date: "SEP 2023",
  //   details: ["Hosted architecture refinement sessions guiding junior squads."],
  // },
  // {
  //   id: 11,
  //   title: "Innovator Premium Award",
  //   subTitle: "Global Tech Summit",
  //   date: "FEB 2024",
  //   details: [
  //     "Showcased localized AI chatbot models managing client request arrays.",
  //   ],
  // },
  // {
  //   id: 12,
  //   title: "Master Architect Milestone",
  //   subTitle: "Fullstack Academy",
  //   date: "DEC 2024",
  //   details: [
  //     "Completed production deployment protocols of hybrid server structures.",
  //   ],
  // },
];
