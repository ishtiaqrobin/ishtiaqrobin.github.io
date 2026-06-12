import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./Providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/layout/Chatbot";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

// ─── Satoshi (Root / Body Font) ───────────────────────────────────────────────
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

// ─── Clash Display (Heading / Display Font) ───────────────────────────────────
const ClashDisplay = localFont({
  src: [
    {
      path: "../fonts/clashDisplay/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    // {
    //   path: "../fonts/clashDisplay/ClashDisplay-Bold.otf",
    //   weight: "800",
    //   style: "normal",
    // },
  ],
  variable: "--font-clash-display",
  display: "swap",
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
        className={`${Satoshi.variable} ${ClashDisplay.variable} antialiased relative min-h-screen`}
      >
        <Providers>
          {/* 
            ─── TOP FADE OVERLAY ───
            pointer-events-none is given so that it doesn't interfere with mouse clicks or scrolling.
            due to z-50 it will flash over all content.
          */}
          <div className="fixed top-0 left-0 right-0 h-6 bg-linear-to-b from-white/65 via-white/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent pointer-events-none z-50" />

          {/* ─── CONTENT ─── */}
          {children}
          <MobileBottomBar />
          {/* <MobileBar /> */}

          <Chatbot />
          <Analytics />
          <SpeedInsights />

          {/* ─── BOTTOM FADE OVERLAY ─── */}
          <div className="fixed bottom-0 left-0 right-0 h-6.5 bg-linear-to-t from-white/65 via-white/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent pointer-events-none z-50" />
        </Providers>
      </body>
    </html>
  );
}
