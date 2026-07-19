"use client";

import React from "react";
import Link from "next/link";
import SocialIcons from "../modules/shared/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-6 sm:pt-8 pb-24 sm:pb-8 ">
      <div className="container-custom flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm leading-5 font-normal tracking-wide text-text-primary">
            © {currentYear} Ishtiaq Robin. All rights reserved.
          </p>

          <div className="hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link
              href="/cookie-policy"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          <div className="hidden sm:block">
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
