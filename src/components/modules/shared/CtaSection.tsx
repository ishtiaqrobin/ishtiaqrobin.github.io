"use client";

import React from "react";
import HoverButton from "./HoverButton";
import Link from "next/link";
import SocialIcons from "./SocialIcons";

export default function CtaSection() {
  return (
    <div className="container-custom pt-16 sm:pt-22 select-none">
      <div className="bg-white dark:bg-[#111116] border border-zinc-100 dark:border-zinc-800/50 rounded-3xl py-16 sm:py-14 flex flex-col items-center justify-center text-center shadow-xs">
        {/* ─── AVAILABLE FOR WORK BADGE ─── */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-[7.5px] bg-[#F7FFF0] dark:bg-[#21291F] border border-emerald-100/50 dark:border-emerald-900/20 rounded-full mb-3.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>

          {/* Badge Text */}
          <span className="text-xs leading-4 font-normal text-text-primary tracking-wide">
            Available for work
          </span>
        </div>

        {/* ─── MAIN HEADING ─── */}
        <h2 className="text-5xl text-secondary font-clash font-medium leading-tight tracking-wide mb-6">
          Let&apos;s create <br className="inline sm:hidden" /> your{" "}
          <br className="hidden sm:inline" /> next{" "}
          <br className="inline sm:hidden" /> big idea.
        </h2>

        {/* ─── CONTACT ME BUTTON ─── */}
        <div>
          <Link href={"/contact"}>
            <HoverButton onClick={() => ""}>Contact Me</HoverButton>
          </Link>
        </div>

        <div className="block sm:hidden mt-8">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}
