import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cookie,
  Settings,
  Info,
  ShieldCheck,
  MousePointer2,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
  keywords: [
    "Ishtiaq Robin",
    "Cookie Policy",
    "Cookie Usage",
    "AI-Driven Software Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/cookie-policy",
    title: "Cookie Policy — Ishtiaq Robin",
    description:
      "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cookie Policy — Ishtiaq Robin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy — Ishtiaq Robin",
    description:
      "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
    images: ["/twitter-image.jpg"],
  },
};

const CookiePolicyPage = () => {
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
            <Cookie className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-clash tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            We use cookies to enhance your browsing experience, provide
            personalized content, and analyze our traffic.
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
            {/* 1. What are Cookies */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    1. What Are Cookies?
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Cookies are small data files that are placed on your
                    computer or mobile device when you visit a website. Cookies
                    are widely used by website owners in order to make their
                    websites work, or to work more efficiently, as well as to
                    provide reporting information.
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Cookies set by the website owner (in this case, Ishtiaq
                    Robin) are called &quot;first-party cookies.&quot; Cookies
                    set by parties other than the website owner are called
                    &quot;third-party cookies.&quot;
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 2. Why we use them */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    2. Why Do We Use Cookies?
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    We use only essential and analytical cookies. Some cookies
                    are required for technical reasons for our Website to
                    operate, and we refer to these as &quot;essential&quot; or
                    &quot;strictly necessary&quot; cookies. We do not use
                    marketing or advertising cookies.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Required for core features like secure login, session
                        management, and account security. The platform cannot
                        function correctly without them. No consent is needed
                        for these cookies.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Analytical Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how users interact with our platform
                        by collecting anonymous usage data. This allows us to
                        improve site performance and user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 3. Detailed Cookie List */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <MousePointer2 className="h-5 w-5" />
                </div>
                <div className="w-full min-w-0">
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    3. Specific Cookies We Use
                  </h2>
                  <div className="rounded-xl border bg-card">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cookie Name</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            better-auth.session_token
                          </TableCell>
                          <TableCell>Ishtiaq Robin</TableCell>
                          <TableCell>
                            Authentication session management
                          </TableCell>
                          <TableCell>Session</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            _vercel_analytics_*
                          </TableCell>
                          <TableCell>Vercel Analytics</TableCell>
                          <TableCell>
                            Anonymous page view and usage analytics
                          </TableCell>
                          <TableCell>Session</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    We do not use marketing, advertising, or third-party
                    tracking cookies. No personal data is sold or shared with
                    advertisers.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. How to control cookies */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-clash text-foreground">
                    4. How to Manage Cookies?
                  </h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Most web browsers allow you to control cookies through their
                    settings. However, if you limit the ability of websites to
                    set essential cookies, some features of our platform may not
                    function properly.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        name: "Google Chrome",
                        url: "https://support.google.com/chrome/answer/95647",
                      },
                      {
                        name: "Apple Safari",
                        url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471",
                      },
                      {
                        name: "Mozilla Firefox",
                        url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
                      },
                      {
                        name: "Microsoft Edge",
                        url: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd",
                      },
                    ].map((browser, index) => (
                      <a
                        key={index}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-border bg-muted/20 px-4 py-3 hover:bg-muted/40 transition-colors group"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {browser.name}
                        </span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 5. Contact */}
            <div className="rounded-3xl bg-linear-to-br from-primary/10 to-primary/5 p-8 text-center border border-primary/10">
              <HelpCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="mb-2 text-2xl font-clash text-foreground">
                Need More Clarity?
              </h2>
              <p className="mb-6 text-muted-foreground">
                If you have any questions about our use of cookies or other
                technologies, please email us.
              </p>
              <a
                href="mailto:ishtiaqrobin.me@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;
