"use client";

import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import { motion } from "motion/react";
import { HiDownload } from "react-icons/hi";
import {
  IconMapPin,
  IconMail,
  IconBriefcase,
  IconCalendar,
  IconUser,
} from "@tabler/icons-react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { ABOUT_TEXT, PERSONAL_INFO } from "@/utils/constants";
import Image from "next/image";
import { aboutService } from "@/services/about.service";
import { settingService } from "@/services/setting.service";
import { ISettings } from "@/types";

export function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutMeImg, setAboutMeImg] = useState<string | null>(null);
  const [settings, setSettings] = useState<ISettings | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [backendResumeUrl, setBackendResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    aboutService.getAbout().then(({ data }) => {
      const img = data?.aboutMeImg;
      if (img) setAboutMeImg(img);
      if (data?.resumeUrl) setBackendResumeUrl(data.resumeUrl);
    });

    settingService.getSettings().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const resumeUrl =
    backendResumeUrl || settings?.resumeLink || PERSONAL_INFO.resumeUrl;
  const contactEmail = settings?.contactEmail || PERSONAL_INFO.email;

  const dynamicInfo = [
    // { icon: "📍", label: "Location", value: settings?.address || "Faridpur, Bangladesh" },
    // { icon: "📧", label: "Email", value: contactEmail },
    // { icon: "💼", label: "Experience", value: settings?.experience || "3+ Years" },
    // { icon: "📅", label: "Availability", value: settings?.availability || "Full-time" },

    {
      icon: <IconMapPin size={24} className="text-primary" />,
      label: "Location",
      value: settings?.address || "Faridpur, Bangladesh",
    },
    {
      icon: <IconMail size={24} className="text-violet-500" />,
      label: "Email",
      value: contactEmail,
    },
    {
      icon: <IconBriefcase size={24} className="text-indigo-500" />,
      label: "Experience",
      value: settings?.experience || "3+ Years",
    },
    {
      icon: <IconCalendar size={24} className="text-blue-500" />,
      label: "Availability",
      value: settings?.availability || "Full-time",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 relative bg-gray-50/50 dark:bg-transparent overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-violet-500/20 dark:bg-violet-500/15 blur-[120px]" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 dark:opacity-20 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(156, 163, 175, 0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-custom mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Get To Know Me"
          title="About Me"
          description="Passionate designer crafting visually stunning digital experiences"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                <Image
                  src={aboutMeImg || PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  width={500}
                  height={625}
                  className="w-full aspect-[4/5] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/15 dark:from-black/60 to-transparent" />
              </div>

              {/* Status Badge */}
              <motion.div
                className="absolute -bottom-6 -right-2 md:-right-6 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl py-4 px-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl flex items-center gap-4 overflow-hidden group cursor-pointer"
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Glowing ring with pulsing green dot */}
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-500 opacity-50 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-none tracking-tight whitespace-nowrap">
                    Available for Work
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-dark-600 leading-relaxed">
                {ABOUT_TEXT.paragraph1}
                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="md:hidden ml-1 text-primary font-medium hover:underline cursor-pointer inline focus:outline-none"
                  >
                    ...More
                  </button>
                )}
              </p>
              <p
                className={`${isExpanded ? "block" : "hidden"} md:block text-gray-600 dark:text-gray-400 leading-relaxed`}
              >
                {ABOUT_TEXT.paragraph2}
              </p>
              <p
                className={`${isExpanded ? "block" : "hidden"} md:block text-gray-600 dark:text-gray-400 leading-relaxed`}
              >
                {ABOUT_TEXT.paragraph3}
                {isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="md:hidden ml-2 text-primary font-medium hover:underline cursor-pointer inline focus:outline-none"
                  >
                    Show Less
                  </button>
                )}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {dynamicInfo.map((info, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary-500/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>

                    {/* <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center">
                                            {info.icon}
                                        </div> */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-dark-600">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <Button
                variant={"default"}
                href={resumeUrl}
                download
                icon={HiDownload}
                asChild
              >
                Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
