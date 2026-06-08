import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Cookie,
  Settings,
  Info,
  ShieldCheck,
  MousePointer2,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Ishtiaq Robin",
  description:
    "Learn how Ishtiaq Robin uses cookies and similar technologies to improve your experience on our portfolio.",
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
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    2. Why Do We Use Cookies?
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    We use cookies for several reasons. Some cookies are
                    required for technical reasons for our Website to operate,
                    and we refer to these as &quot;essential&quot; or
                    &quot;strictly necessary&quot; cookies.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Required for core features like secure login, payment
                        processing, and account management. The platform cannot
                        function correctly without them.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Analytical Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how users interact with our platform
                        by collecting information anonymously. This allows us to
                        improve the site layout and features.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Functional Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Used to remember your preferences, such as language
                        settings or theme choices, providing a more personalized
                        experience.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border p-5 hover:border-primary/20 transition-colors">
                      <h3 className="mb-2 font-bold text-foreground">
                        Marketing Cookies
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Used to track visitors across websites. The intention is
                        to display ads that are relevant and engaging for the
                        individual user.
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MousePointer2 className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    3. Specific Cookies We Use
                  </h2>
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted text-foreground">
                        <tr>
                          <th className="px-4 py-3 font-semibold">
                            Cookie Name
                          </th>
                          <th className="px-4 py-3 font-semibold">Provider</th>
                          <th className="px-4 py-3 font-semibold">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted-foreground">
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">
                            portfolio-session
                          </td>
                          <td className="px-4 py-3">Ishtiaq Robin</td>
                          <td className="px-4 py-3">Session</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">
                            __stripe_mid
                          </td>
                          <td className="px-4 py-3">Stripe (Payment)</td>
                          <td className="px-4 py-3">1 Year</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">
                            _ga
                          </td>
                          <td className="px-4 py-3">Google Analytics</td>
                          <td className="px-4 py-3">2 Years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. How to control cookies */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    4. How to Manage Cookies?
                  </h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Most web browsers allow you to control cookies through their
                    settings. However, if you limit the ability of websites to
                    set cookies, you may worsen your overall user experience.
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

            {/* 5. Help */}
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center border border-primary/10">
              <HelpCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Need More Clarity?
              </h2>
              <p className="mb-6 text-muted-foreground">
                If you have any questions about our use of cookies or other
                technologies, please email us.
              </p>
              <a
                href="mailto:contact@ishtiaqrobin.me@gmail.com"
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
