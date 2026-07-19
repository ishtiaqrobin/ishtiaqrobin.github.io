import type { Metadata } from "next";
import ProjectsPage from "@/components/modules/home/project/ProjectsPage";
import CtaSection from "@/components/modules/shared/CtaSection";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "My Projects",
  description:
    "Explore the portfolio of projects by Ishtiaq Robin — AI-driven modern web applications built with Next.js, React, Node.js, MongoDB, and other cutting-edge technologies.",
  keywords: [
    "Ishtiaq Robin Projects",
    "AI-Driven Software Engineer",
    "Web Development Projects",
    "Portfolio Projects",
    "Full Stack Projects",
    "Next.js Projects",
    "React Projects",
    "MERN Stack Projects",
    "PERN Stack Projects",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  creator: "Ishtiaq Robin",
  publisher: "Ishtiaq Robin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/projects",
    title: "My Projects — Ishtiaq Robin",
    description:
      "Explore the portfolio of projects by Ishtiaq Robin — AI-driven modern web applications built with Next.js, React, Node.js, MongoDB, and other cutting-edge technologies.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Projects by Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Projects — Ishtiaq Robin",
    description:
      "Explore the portfolio of projects by Ishtiaq Robin — AI-driven modern web applications built with Next.js, React, Node.js, MongoDB, and other cutting-edge technologies.",
    images: ["/twitter-image.jpg"],
    creator: "@ishtiaqrobin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ishtiaqrobin.vercel.app/projects",
  },
};

async function getProjectsAndCategories() {
  try {
    const [projRes, catRes] = await Promise.all([
      fetch(`${env.NEXT_PUBLIC_API_URL}/projects?isPublished=true`, {
        next: { tags: ["project"] },
        cache: "no-store",
      }),
      fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { tags: ["project"] },
        cache: "no-store",
      }),
    ]);

    const projects = projRes.ok ? (await projRes.json()).data || [] : [];
    const allCategories = catRes.ok ? (await catRes.json()).data || [] : [];
    const categories = allCategories.filter(
      (c: { isPublished: boolean }) => c.isPublished,
    );

    return { projects, categories };
  } catch {
    return { projects: [], categories: [] };
  }
}

export default async function ProjectPage() {
  const { projects, categories } = await getProjectsAndCategories();

  return (
    <div>
      <ProjectsPage projects={projects} categories={categories} />
      <CtaSection />
    </div>
  );
}
