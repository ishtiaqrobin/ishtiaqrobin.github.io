import type { Metadata } from "next";
import { ContactSection } from "@/components/modules/home/contact/ContactSection";
import FaqSection from "@/components/modules/home/faq/FaqSection";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch with Ishtiaq Robin — an AI-Driven Software Engineer. Whether you have a project idea, collaboration opportunity, or just want to say hello, I'd love to hear from you.",
  keywords: [
    "Contact Ishtiaq Robin",
    "Hire AI-Driven Software Engineer",
    "Full Stack Developer Contact",
    "Web Development Inquiry",
    "AI Automation",
    "Collaboration",
    "Get in Touch",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  creator: "Ishtiaq Robin",
  publisher: "Ishtiaq Robin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/contact",
    title: "Contact Me — Ishtiaq Robin",
    description:
      "Get in touch with Ishtiaq Robin — an AI-Driven Software Engineer. I'd love to hear about your project or idea.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me — Ishtiaq Robin",
    description:
      "Get in touch with Ishtiaq Robin — an AI-Driven Software Engineer. I'd love to hear about your project or idea.",
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
    canonical: "https://ishtiaqrobin.vercel.app/contact",
  },
};

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactSection />
      <FaqSection />
    </div>
  );
}
