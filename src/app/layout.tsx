import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./Providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/layout/Chatbot";

// ─── Satoshi (Root / Body Font) ───
const Satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// ─── Clash Display (Heading / Display Font) ───
const ClashDisplay = localFont({
  src: [
    {
      path: "../fonts/clashDisplay/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishtiaqrobin.vercel.app"),
  verification: {
    google: "JoRoerhjgvMvBmow_qIN0ZjJci5dsPRaAkv-sWoKbA0",
  },
  title: {
    default: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
    template: "%s — Ishtiaq Robin",
  },
  description:
    "Professional portfolio of Ishtiaq Robin — an AI-Driven Software Engineer specializing in modern web technologies and AI automation.",
  keywords: [
    "Ishtiaq Robin",
    "AI-Driven Software Engineer",
    "AI Automation",
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "PERN Stack Developer",
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
    url: "https://ishtiaqrobin.vercel.app",
    title: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
    description:
      "Explore the portfolio of Ishtiaq Robin — an AI-Driven Software Engineer building intelligent, high-impact digital solutions.",
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
    title: "Ishtiaq Robin — AI-Driven Software Engineer | AI Automation",
    description:
      "Explore the portfolio of Ishtiaq Robin — an AI-Driven Software Engineer building intelligent, high-impact digital solutions.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="C69ABF4F360DC1D3AEB1BA928A599428" />
      </head>
      <body
        className={`${Satoshi.variable} ${ClashDisplay.variable} antialiased relative min-h-screen`}
      >
        <Providers>
          {/* 
            ─── TOP FADE OVERLAY ───
            pointer-events-none is given so that it doesn't interfere with mouse clicks or scrolling.
            due to z-50 it will flash over all content.
          */}
          <div className="fixed top-0 left-0 right-0 h-6 bg-linear-to-b from-white/65 via-white/25 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent pointer-events-none z-50" />
          {/* before: via-white/40 */}

          {/* ─── CONTENT ─── */}
          {children}
          {/* <MobileBar /> */}

          <Chatbot />
          <Analytics />
          <SpeedInsights />

          {/* ─── BOTTOM FADE OVERLAY ─── */}
          <div className="fixed bottom-0 left-0 right-0 h-6.5 bg-linear-to-t from-white/65 via-white/25 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent pointer-events-none z-50" />
          {/* before: via-white/40 */}
        </Providers>
      </body>
    </html>
  );
}
