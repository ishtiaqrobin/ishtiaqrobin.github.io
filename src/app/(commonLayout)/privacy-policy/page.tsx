import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Eye,
  Lock,
  Share2,
  UserCheck,
  Mail,
  Clock,
  Globe,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
  keywords: [
    "Ishtiaq Robin",
    "Privacy Policy",
    "Data Protection",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/privacy-policy",
    title: "Privacy Policy — Ishtiaq Robin",
    description:
      "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Ishtiaq Robin",
    description:
      "Privacy policy for Ishtiaq Robin's portfolio, detailing how we protect and manage your data.",
    images: ["/twitter-image.jpg"],
  },
};

const PrivacyPolicyPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-16 lg:py-24">
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-primary/10 blur-[120px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-clash tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            At Ishtiaq Robin Portfolio, we value your privacy. This policy
            explains how we handle your personal data when you interact with our
            platform.
          </p>
          <p className="mt-8 text-sm font-medium text-primary">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12 lg:gap-16">
            {/* 1. Overview */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    1. Introduction & Scope
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Ishtiaq Robin (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;) is an AI-Driven Software Engineer. This
                    Privacy Policy outlines our commitment to protecting the
                    personal information of our clients, users, and website
                    visitors (&quot;you&quot;). By using our services or
                    browsing our portfolio, you consent to the data practices
                    described in this statement.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 2. Information Collection */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        A. Information Provided by You
                      </h3>
                      <p className="mb-3 text-muted-foreground">
                        We collect information you provide directly to us when
                        creating an account, submitting a contact form, leaving
                        a review, or communicating with us:
                      </p>
                      <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <li className="flex items-center gap-2">
                          • Full name and email address
                        </li>
                        <li className="flex items-center gap-2">
                          • Account credentials (email, password)
                        </li>
                        <li className="flex items-center gap-2">
                          • Project requirements and messages
                        </li>
                        <li className="flex items-center gap-2">
                          • Testimonials and review submissions
                        </li>
                        <li className="flex items-center gap-2">
                          • Profile information and preferences
                        </li>
                        <li className="flex items-center gap-2">
                          • Communication history via contact form
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        B. Automatically Collected Information
                      </h3>
                      <p className="text-muted-foreground">
                        When you access our platform, we automatically collect
                        certain technical information, including your IP
                        address, browser type, device information, referring
                        URLs, and usage patterns through cookies and similar
                        tracking technologies. We use Vercel Analytics and
                        Vercel Speed Insights for anonymous performance and
                        usage monitoring.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        C. Resume Download Tracking
                      </h3>
                      <p className="text-muted-foreground">
                        When you download our resume, we log your IP address,
                        country of origin, and user agent for analytics
                        purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 3. Use of Information */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    3. How We Use Your Data
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Your information allows us to provide a safe and effective
                    experience. Specifically, we use it to:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Respond to your inquiries and project requests",
                      "Deliver software development services",
                      "Manage user accounts and authentication",
                      "Improve our portfolio and user experience",
                      "Analyze site traffic and performance",
                      "Provide dedicated client support",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl border border-primary/5 bg-primary/5 p-3 text-sm font-medium text-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. Data Sharing */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    4. Information Sharing
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    We do not sell your personal data. We share your information
                    only with your consent or as necessary to provide our
                    services. This includes sharing data with trusted
                    third-party service providers:
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      • Vercel (hosting and analytics)
                    </li>
                    <li className="flex items-center gap-2">
                      • Cloudinary (image storage)
                    </li>
                    <li className="flex items-center gap-2">
                      • Better Auth (authentication)
                    </li>
                    <li className="flex items-center gap-2">
                      • PostgreSQL database (data storage)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 5. Data Security */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    5. Data Security & Retention
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    We implement industry-standard security measures, including
                    SSL encryption, secure server protocols, and password
                    hashing (bcrypt), to protect your data. We retain your
                    personal information only as long as necessary to fulfill
                    the purposes outlined in this policy or as required by law.
                  </p>
                  <div className="rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Retention Policy
                    </p>
                    <p className="mt-2 italic">
                      Active account data is kept as long as the account is
                      active. Deleted account data is anonymized or purged
                      within 30 days, except where legal obligations require
                      longer retention. Contact form submissions are retained
                      for service history and may be deleted upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 6. Your Rights */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    6. Your Data Rights
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Depending on your jurisdiction (e.g., GDPR in the EU, CCPA
                    in California), you may have the following rights regarding
                    your personal data:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Right to access your personal data",
                      "Right to rectification of inaccurate data",
                      "Right to erasure (right to be forgotten)",
                      "Right to restrict processing",
                      "Right to data portability",
                      "Right to object to processing",
                      "Right to withdraw consent at any time",
                      "Right to lodge a complaint with a supervisory authority",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-medium"
                      >
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    To exercise any of these rights, please contact us using the
                    information below.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 7. Contact */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    7. Contact Our Privacy Team
                  </h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    If you have any questions about this Privacy Policy or wish
                    to exercise your data rights (access, correction, or
                    deletion), please reach out to us:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 to-transparent p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Email Support
                      </p>
                      <a
                        href="mailto:ishtiaqrobin.me@gmail.com"
                        className="mt-1 font-bold text-primary"
                      >
                        ishtiaqrobin.me@gmail.com
                      </a>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 to-transparent p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Location
                      </p>
                      <p className="mt-1 font-bold text-foreground">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
