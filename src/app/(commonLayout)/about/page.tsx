import type { Metadata } from "next";
import { AboutSection } from "@/components/modules/home/AboutSection";
import AwardsSection from "@/components/modules/home/awards/AwardsSection";
import CommunitySection from "@/components/modules/home/community/CommunitySection";
import CtaSection from "@/components/modules/shared/CtaSection";
import Experience from "@/components/modules/home/experience/Experience";
import TechMarquee from "@/components/modules/shared/TechMarquee";
import DesignProcess from "@/components/modules/home/design_process/DesignProcess";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Ishtiaq Robin — an AI-Driven Software Engineer with 3+ years of experience building modern, scalable web applications using Next.js, React, Node.js, and MongoDB.",
  keywords: [
    "Ishtiaq Robin",
    "About Ishtiaq Robin",
    "AI-Driven Software Engineer",
    "AI Automation",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Expert",
    "Backend Engineer",
    "Problem Solver",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  creator: "Ishtiaq Robin",
  publisher: "Ishtiaq Robin",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/about",
    title: "About Me — Ishtiaq Robin",
    description:
      "Learn more about Ishtiaq Robin — an AI-Driven Software Engineer with 3+ years of experience building modern, scalable web applications.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Ishtiaq Robin — AI-Driven Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me — Ishtiaq Robin",
    description:
      "Learn more about Ishtiaq Robin — an AI-Driven Software Engineer with 3+ years of experience building modern, scalable web applications.",
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
    canonical: "https://ishtiaqrobin.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutSection />
      <div className="border-y bg-[#F7F8FA] dark:bg-[#0b0b0d]">
        <TechMarquee />
      </div>

      <Experience />
      <DesignProcess />
      <AwardsSection />
      <CommunitySection />

      <CtaSection />
    </div>
  );
}
