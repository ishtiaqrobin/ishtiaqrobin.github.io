import profileImage from "../assets/images/hero_section.webp";

import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaLinux } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiExpress,
  SiFastify,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiPrisma,
  SiVercel,
  SiRender,
  SiZod,
  SiReacthookform,
  SiHtml5,
  SiCss,
  SiApifox,
} from "react-icons/si";
import {
  HiCode,
  HiColorSwatch,
  HiServer,
  HiDatabase,
  HiLightningBolt,
} from "react-icons/hi";

export const PERSONAL_INFO = {
  name: "Ishtiaq Robin",
  linkedin: "https://linkedin.com/in/ishtiaq-robin",
  facebook: "https://facebook.com/ishtiaqrobins",
  instagram: "https://instagram.com/ishtiaqrobins",
  whatsapp: "+8801762627422",
  email: "ishtiaqrobin.me@gmail.com",
  github: "https://github.com/ishtiaqrobin",
  resumeUrl: "/resume.pdf",
  profileImage: profileImage, // Fallback to the existing image
};

export const TYPEWRITER_WORDS = [
  "Full Stack Web Developer",
  "MERN Stack Developer",
  "Next.js Expert",
  "Backend Engineer",
  "Problem Solver",
];

export const STATS_DATA = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Technologies Mastered", value: 15, suffix: "+" },
];

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  // { name: "Stats", href: "stats" },
  { name: "About", href: "/about" },
  // { name: "Education", href: "education" },
  // { name: "Experience", href: "experience" },
  // { name: "Skills", href: "skills" },
  // { name: "Services", href: "services" },
  // { name: "Gallery", href: "gallery" },
  { name: "Projects", href: "/projects" },
  // { name: "Blogs", href: "/blogs" },
  // { name: "Videos", href: "videos" },
  // { name: "Testimonials", href: "testimonials" },
  { name: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  // { name: 'Home', href: 'home' },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Services", href: "services" },
  // { name: 'Reviews', href: 'reviews' },
  // { name: 'Contact', href: 'contact' },
];

export const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export const ABOUT_TEXT = {
  paragraph1:
    "I'm Ishtiaq Robin, a passionate Full Stack Web Developer based in Bangladesh with over 2 years of professional experience. I specialize in building modern, scalable web applications that solve real-world problems.",
  paragraph2:
    "I believe in writing clean, maintainable code and creating seamless user experiences. From crafting pixel-perfect frontend's to designing robust backend architectures, I handle the complete development lifecycle with precision and care.",
  paragraph3:
    "I'm constantly learning and exploring new technologies. Currently diving deeper into Golang and system design while continuing to master the JavaScript/TypeScript ecosystem.",
};

export const ABOUT_INFO = [
  { icon: "📍", label: "Location", value: "Faridpur, Bangladesh" },
  { icon: "📧", label: "Email", value: "ishtiaqrobin.me@gmail.com" },
  { icon: "💼", label: "Experience", value: "2+ Years" },
  { icon: "📅", label: "Availability", value: "Full-time" },
];

export const SKILLS_DATA = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-black dark:text-white",
      },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript (ES6+)", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
      {
        name: "ShadcnUI",
        icon: SiShadcnui,
        color: "text-black dark:text-white",
      },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-gray-900 dark:text-gray-300",
      },
      {
        name: "Fastify",
        icon: SiFastify,
        color: "text-gray-900 dark:text-gray-300",
      },
      { name: "Golang (Go)", icon: SiGo, color: "#00ADD8" },
      { name: "REST API", icon: SiApifox, color: "#6366f1" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Git & GitHub", icon: FaGitAlt, color: "#F05032" },
      { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "VPS / Linux", icon: FaLinux, color: "#FCC624" },
    ],
  },
  {
    category: "Validation & Forms",
    skills: [
      { name: "Zod", icon: SiZod, color: "#3E67B1" },
      { name: "React Hook Form", icon: SiReacthookform, color: "#EC5990" },
      { name: "TanStack Form", icon: SiReacthookform, color: "#FF8646" },
    ],
  },
];
