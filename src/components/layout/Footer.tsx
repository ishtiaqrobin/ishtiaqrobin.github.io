"use client";

import React from "react";
import SocialIcons from "../modules/shared/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-6 sm:pt-8 pb-24 sm:pb-8 select-none">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* ─── Left side copyright ─── */}
        <p className="text-sm leading-5 font-normal tracking-wide text-text-primary">
          © {currentYear} Ishtiaq Robin. All rights reserved.
        </p>

        <div className="hidden sm:block">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
