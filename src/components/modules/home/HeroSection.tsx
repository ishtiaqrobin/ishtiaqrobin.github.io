"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

import { HiDownload } from "react-icons/hi";

import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, TYPEWRITER_WORDS } from "@/utils/constants";
import { scrollToSection } from "@/utils/helpers";

import { aboutService } from "@/services/about.service";
import { settingService } from "@/services/setting.service";
import { SocialIcons } from "@/components/common/SocialIcons";
import { HeroCard } from "./card/HeroCard";

export function HeroSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [heroImg, setHeroImg] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>(PERSONAL_INFO.resumeUrl);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    aboutService
      .getAbout()
      .then(({ data }) => {
        if (data?.heroImg) setHeroImg(data.heroImg);
        if (data?.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .finally(() => setIsApiLoading(false));

    settingService.getSettings().then(({ data }) => {
      if (data?.resumeLink) {
        setResumeUrl((current) => current || (data.resumeLink ?? current));
      }
    });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Engineering Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.1] opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" />
      </div>

      {/* Three.js Background Canvas */}
      {/* <div className="absolute inset-0 z-0 opacity-60">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <SceneBackground />
                </Canvas>
            </div> */}

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 z-0 mesh-gradient pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto pb-20 pt-24 md:pt-36 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            className="z-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Greeting */}
            <motion.div
              variants={fadeInUp}
              className="hero-greeting inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-4"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#8b5cf6",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Hello, I&apos;m
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-gray-900 dark:text-white font-mono">
                {PERSONAL_INFO.name}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="hero-typewriter text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 text-primary dark:text-primary-400 font-mono"
            >
              {inView && (
                <TypeAnimation
                  sequence={[
                    ...TYPEWRITER_WORDS.flatMap((word) => [word, 2000]),
                  ]}
                  wrapper="span"
                  speed={10}
                  repeat={Infinity}
                />
              )}
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="hero-desc text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed"
            >
              I specialize in brand promotion through creative graphic design
              solutions, along with professional video editing and motion
              graphics services.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="hero-buttons flex-wrap gap-4 mb-8 hidden md:flex"
            >
              <Button
                variant="default"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                href={resumeUrl}
                download
                icon={HiDownload}
                className="cursor-pointer"
                asChild
              >
                Resume
              </Button>
            </motion.div>

            {/* Social Links For Desktop */}
            <SocialIcons
              className="hero-socials"
              showOnMobile={false}
              fadeInUp={fadeInUp}
            />
          </motion.div>

          {/* Right - Profile Image */}
          <HeroCard
            heroImg={heroImg}
            isApiLoading={isApiLoading}
            isImageLoading={isImageLoading}
            setIsImageLoading={setIsImageLoading}
          />

          {/* Mobile Social Links */}
          <SocialIcons
            className="hero-socials md:mt-0 mt-12 justify-center"
            showOnDesktop={false}
          />
        </div>

        {/* Separator */}
        {/* <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent mt-24 md:mt-16" /> */}
      </div>
    </section>
  );
}
