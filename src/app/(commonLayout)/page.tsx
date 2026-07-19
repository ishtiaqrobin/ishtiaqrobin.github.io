import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
  description:
    "Welcome to the portfolio of Ishtiaq Robin — an AI-Driven Software Engineer specializing in modern web technologies, AI automation, and scalable full-stack solutions.",
  keywords: [
    "Ishtiaq Robin",
    "AI-Driven Software Engineer",
    "AI Automation",
    "Full Stack Developer",
    "MERN Stack",
    "PERN Stack",
    "Next.js Developer",
    "React Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Problem Solver",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  creator: "Ishtiaq Robin",
  publisher: "Ishtiaq Robin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app",
    title: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
    description:
      "Welcome to the portfolio of Ishtiaq Robin — an AI-Driven Software Engineer crafting intelligent, high-impact digital solutions.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ishtiaq Robin — AI-Driven Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
    description:
      "Welcome to the portfolio of Ishtiaq Robin — an AI-Driven Software Engineer crafting intelligent, high-impact digital solutions.",
    images: ["/twitter-image.jpg"],
    creator: "@ishtiaq_robin",
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
};

export default function Home() {
  return <HomeContent />;
}
