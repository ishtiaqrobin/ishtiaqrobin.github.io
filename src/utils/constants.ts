// import profileImage from "../assets/images/hero_section.webp";

import { Project } from "@/types";

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

