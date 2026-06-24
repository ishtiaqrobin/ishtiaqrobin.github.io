"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { PERSONAL_INFO } from "@/utils/constants";
import Image from "next/image";
import { aboutService } from "@/services/about.service";
import { settingService } from "@/services/setting.service";
import { ISettings } from "@/types";
import CircularButton from "../shared/CircularButton";
import HoverButton from "../shared/HoverButton";
import Link from "next/link";

export function AboutSection() {
  const [aboutMeImg, setAboutMeImg] = useState<string | null>(null);
  const [settings, setSettings] = useState<ISettings | null>(null);

  const { ref } = useInView({
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

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-28 relative bg-[#F7F8FA] dark:bg-transparent overflow-hidden select-none"
    >
      {/* Decorative Background Color */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Relative position is given by making the width of the parent container equal to the image (w-[390px]) */}
            <div className="relative w-auto md:w-[390px] mx-auto">
              <div className="absolute inset-0" />

              {/* My Image */}
              <div className="relative rounded-b-full overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none ">
                <Image
                  src={aboutMeImg || PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  width={390}
                  height={520}
                  className="w-full h-full aspect-3/4 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/15 dark:from-[#0a0a0a]/30 to-transparent" />
              </div>

              {/* ─── Circular Button Badge ─── */}
              <div className="absolute bottom-0 -right-1 z-20">
                <CircularButton />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-5 mb-6">
              <h1 className="text-secondary font-clash text-5xl sm:text-7xl font-medium leading-none">
                A <span className="text-primary">creative developer</span> &
                digital designer
              </h1>
              <p className="text-text-primary font-normal text-base leading-5.5">
                I collaborate with brands globally to design impactful, mission-
                <br className="hidden sm:block" />
                focused websites that <br className="sm:hidden block" /> drive
                results and achieve business goals.
              </p>
            </div>

            {/* Resume Button */}
            <div>
              <Link href={resumeUrl} target="_blank" download>
                <HoverButton onClick={() => ""}>My Resume</HoverButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
