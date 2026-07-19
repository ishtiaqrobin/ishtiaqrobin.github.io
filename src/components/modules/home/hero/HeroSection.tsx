"use client";

import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import HoverButton from "../../shared/HoverButton";
import { PERSONAL_INFO } from "@/utils/constants";
import { HiOutlineHand } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { settingService } from "@/services/setting.service";
import type { ISettings } from "@/types";

export default function HeroSection() {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    settingService.getSettings().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const linkedinUrl = settings?.linkedinUrl || PERSONAL_INFO.linkedin;
  const githubUrl = settings?.githubUrl || PERSONAL_INFO.github;
  const facebookUrl = settings?.facebookUrl || PERSONAL_INFO.facebook;
  const contactEmail = settings?.contactEmail || PERSONAL_INFO.email;

  return (
    <section
      ref={ref}
      className="pt-32 sm:pt-44 pb-16 sm:pb-24 bg-[#f9f9f9] dark:bg-transparent overflow-hidden relative"
    >
      {/* Decorative Background Color */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 flex flex-col justify-between">
        {/* Top Part: Greeting and Main Title */}
        <div className="flex flex-col items-start w-full">
          {/* Small greeting */}
          <div className="inline-flex items-center gap-1 mb-8 ">
            <span className="text-2xl text-primary animate-wave-tilted inline-block">
              <HiOutlineHand />
            </span>
            <span className="text-base font-normal leading-snug text-text-primary">
              Hey! It&apos;s me Ishtiaq,
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-clash font-medium tracking-tight sm:tracking-wide text-secondary leading-12 sm:leading-[72px] max-w-5xl">
            Crafting <br className="block sm:hidden" />{" "}
            <span className="text-primary">
              purpose driven <br className="hidden sm:block" /> experiences{" "}
              <br className="block sm:hidden" />
            </span>{" "}
            that inspire <br className="hidden sm:block" /> & engage.
          </h1>
        </div>

        {/* ─── Middle Part: Description ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mt-8">
          <div className="border-b border-zinc-300 dark:border-zinc-800/75" />
          <p className="text-text-primary font-normal leading-snug text-base max-w-xl">
            I work with brands globally to build pixel-perfect, engaging, and
            accessible digital experiences that drive results and achieve
            business goals.
          </p>
        </div>

        {/* ─── Bottom Part: Social Links and Resume Button (Flex Between) ─── */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-none border-zinc-200/50 dark:border-zinc-800/40">
          {/* Social Links */}
          <div className="hidden sm:flex flex-wrap items-center gap-4 group/socials">
            {[
              { name: "LINKEDIN", href: linkedinUrl },
              { name: "GITHUB", href: githubUrl },
              { name: "GMAIL", href: `mailto:${contactEmail}` },
              { name: "FACEBOOK", href: facebookUrl },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-normal leading-5 tracking-wider text-text-primary transition-all duration-300 ease-out hover:!opacity-100 hover:text-text-primary group-hover/socials:opacity-40"
              >
                {social.name}
                <FiArrowUpRight className="w-3.5 h-3.5 text-text-primary transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* ──── Resume Button ─── */}
          <div className="shrink-0">
            <Link href="/about">
              <HoverButton>Know me better</HoverButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
