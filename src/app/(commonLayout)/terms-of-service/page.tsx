import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  UserPlus,
  CreditCard,
  Scale,
  AlertCircle,
  RefreshCcw,
  Handshake,
  Zap,
  Shield,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
  keywords: [
    "Ishtiaq Robin",
    "Terms of Service",
    "Terms and Conditions",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/terms-of-service",
    title: "Terms of Service — Ishtiaq Robin",
    description:
      "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Service — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Ishtiaq Robin",
    description:
      "Comprehensive terms and conditions for using Ishtiaq Robin's software engineering services.",
    images: ["/twitter-image.jpg"],
  },
};

const TermsOfServicePage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-16 lg:py-24">
        <div className="absolute right-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-primary/20 blur-[120px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-clash tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Please read these terms carefully before engaging with our software
            engineering services. They outline your rights and obligations as a
            client of Ishtiaq Robin.
          </p>
          <p className="mt-8 text-sm font-medium text-primary">
            Effective Date: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12 lg:gap-16">
            {/* 1. Acceptance of Terms */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    1. Acceptance of Terms
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    By accessing this portfolio or engaging Ishtiaq Robin for
                    software engineering services, you agree to be bound by
                    these Terms of Service. If you are representing a company,
                    you warrant that you have the authority to bind that company
                    to these terms. If you do not agree, you must not use our
                    services.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 2. User Accounts */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    2. Account Registration & Security
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    To access certain features, you must create an account. You
                    agree to provide accurate, current, and complete information
                    and to keep your login credentials confidential. You are
                    responsible for all activity under your account.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        Clients must provide accurate project requirements and
                        feedback.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        Source code ownership is transferred only upon full
                        payment.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        We reserve the right to showcase completed work in our
                        portfolio unless a non-disclosure agreement is in place.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        You may delete your account at any time; associated data
                        will be handled per our Privacy Policy.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 3. Platform Conduct */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    3. Conduct & Safety
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Ishtiaq Robin maintains a professional environment. Users
                    are prohibited from:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Harassing or abusing other users",
                      "Sharing inappropriate or illegal content",
                      "Attempting to bypass platform payments",
                      "Spamming or automated scraping",
                      "Impersonating another person",
                      "Violating intellectual property rights",
                      "Submitting false or defamatory reviews",
                      "Attempting to compromise site security",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-medium"
                      >
                        <div className="h-1 w-1 rounded-full bg-destructive" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. Intellectual Property */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    4. Intellectual Property
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    All source code, designs, and deliverables created by
                    Ishtiaq Robin remain the property of Ishtiaq Robin until
                    full payment is received. Upon full payment, the client
                    receives full ownership of the final deliverables.
                  </p>
                  <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                      <RefreshCcw className="h-4 w-4" />
                      License & Ownership
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ishtiaq Robin retains the right to reuse generalized
                      code, libraries, and frameworks developed prior to or
                      outside of the engagement. Confidential business logic and
                      proprietary client code are not reused. Portfolio
                      showcase rights are retained unless a separate NDA
                      prohibits it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 5. Payments & Refunds */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    5. Financial Terms
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        Payments
                      </h3>
                      <p className="text-muted-foreground">
                        All payments for software engineering services are
                        processed securely. Clients agree to pay the agreed
                        project rate plus any applicable taxes at the time of
                        booking or milestone completion. Payment terms are
                        specified in the individual project agreement.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                        <RefreshCcw className="h-4 w-4" />
                        Refund & Cancellation Policy
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Cancellations made before work commences are eligible
                        for a full refund of any deposit. Once development work
                        has started, deposits are non-refundable to compensate
                        for time and resources spent. Partial refunds may be
                        considered on a case-by-case basis for incomplete
                        milestone deliverables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 6. Limitation of Liability */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    6. Disclaimers & Liability
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    Ishtiaq Robin provides software engineering and development
                    services. While we strive for excellence, we do not
                    guarantee specific business results, revenue, or ROI from
                    our work. All services are provided on an &quot;as is&quot;
                    and &quot;as available&quot; basis.
                  </p>
                  <p className="text-sm font-medium text-muted-foreground italic">
                    &quot;In no event shall Ishtiaq Robin be liable for any
                    indirect, incidental, special, consequential, or punitive
                    damages, including but not limited to loss of profits, data,
                    or business opportunity, arising out of or related to the
                    use of our services.&quot;
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 7. Confidentiality */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    7. Confidentiality
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Ishtiaq Robin agrees to keep confidential all proprietary
                    information shared by the client for the purpose of project
                    delivery. This includes business logic, trade secrets,
                    source code, and strategic plans. Confidential information
                    will not be disclosed to third parties without prior
                    consent, except as required by law. A separate
                    non-disclosure agreement (NDA) can be signed upon request.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 8. AI & Chatbot Services */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    8. AI Chatbot & Automated Services
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Our platform includes an AI-powered chatbot for informational
                    and support purposes. Conversations with the chatbot are not
                    logged or stored. The chatbot may provide inaccurate or
                    incomplete information and should not be relied upon for
                    critical decisions. Ishtiaq Robin disclaims all liability
                    arising from the use of AI-generated responses.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 9. Governing Law */}
            <div className="bg-muted/50 rounded-3xl p-8 text-center border border-border">
              <h2 className="mb-2 text-2xl font-clash text-foreground">
                Questions About These Terms?
              </h2>
              <p className="mb-6 text-muted-foreground">
                These terms are governed by the laws of Bangladesh. Any disputes
                shall be resolved through negotiation in good faith, and if
                unresolved, through the courts of Dhaka, Bangladesh.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:ishtiaqrobin.me@gmail.com"
                  className="font-bold text-primary hover:underline"
                >
                  ishtiaqrobin.me@gmail.com
                </a>
                <span className="text-muted-foreground hidden sm:inline">
                  •
                </span>
                <span className="text-muted-foreground">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
