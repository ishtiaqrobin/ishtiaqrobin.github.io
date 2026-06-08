import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/layout/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ishtiaq Robin | Professional Full Stack Web Developer",
    template: "%s | Ishtiaq Robin",
  },
  description:
    "Professional portfolio of Ishtiaq Robin, a creative Full Stack Web Developer specializing in modern web technologies.",
  keywords: [
    "Ishtiaq Robin",
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "Next.js Expert",
    "Backend Engineer",
    "Problem Solver",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  creator: "Ishtiaq Robin",
  publisher: "Ishtiaq Robin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.com",
    title: "Ishtiaq Robin | Professional Full Stack Web Developer",
    description:
      "Explore the creative works of Ishtiaq Robin. specializing in high-end branding and visual design.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ishtiaq Robin Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishtiaq Robin | Professional Full Stack Web Developer",
    description:
      "Explore the creative works of Ishtiaq Robin. specializing in high-end branding and visual design.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Chatbot />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
