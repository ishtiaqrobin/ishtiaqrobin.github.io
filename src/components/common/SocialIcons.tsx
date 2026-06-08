/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { motion } from "motion/react";

import { useTheme } from "next-themes";

import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

import { settingService } from "@/services/setting.service";
import { ISettings } from "@/types";
import { PERSONAL_INFO } from "@/utils/constants";
import { HiMail } from "react-icons/hi";

interface SocialIconsProps {
  className?: string;
  itemClassName?: string;
  fadeInUp?: any;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export function SocialIcons({
  className = "",
  itemClassName = "",
  fadeInUp = {},
  showOnMobile = true,
  showOnDesktop = true,
}: SocialIconsProps) {
  const { theme } = useTheme();
  const [settings, setSettings] = useState<ISettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await settingService.getSettings();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  // const socialLinks = [
  //     {
  //         icon: FaBehance,
  //         iconColor: "#1773ea",
  //         href: settings?.behanceUrl,
  //         label: "Behance",
  //     },
  //     {
  //         icon: FaDribbble,
  //         iconColor: "#EA4C89",
  //         href: settings?.dribbbleUrl,
  //         label: "Dribble"
  //     },
  //     {
  //         icon: FaLinkedinIn,
  //         iconColor: "#0077B5",
  //         href: settings?.linkedinUrl,
  //         label: "LinkedIn",
  //     },
  //     {
  //         icon: FaFacebookF,
  //         iconColor: "#1877F2",
  //         href: settings?.facebookUrl,
  //         label: "Facebook",
  //     },
  //     {
  //         icon: FaInstagram,
  //         iconColor: "#e1306c",
  //         href: settings?.instagramUrl,
  //         label: "Instagram",
  //     },
  //     {
  //         icon: FaWhatsapp,
  //         iconColor: "#25D366",
  //         href: settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}` : "",
  //         label: "WhatsApp",
  //     },
  // ].filter(link => link.href);

  const socialLinks = [
    {
      icon: FaGithub,
      iconColor: "#000000",
      href: PERSONAL_INFO.github,
      label: "GitHub",
    },
    {
      icon: FaLinkedinIn,
      iconColor: "#0077B5",
      href: PERSONAL_INFO.linkedin,
      label: "LinkedIn",
    },
    {
      icon: FaFacebookF,
      iconColor: "#1877F2",
      href: PERSONAL_INFO.facebook,
      label: "Facebook",
    },
    {
      icon: FaWhatsapp,
      iconColor: "#25D366",
      href: `https://wa.me/${PERSONAL_INFO.whatsapp.replace("+", "")}`,
      label: "WhatsApp",
    },
    {
      icon: HiMail,
      iconColor: "#EA4335",
      href: `mailto:${PERSONAL_INFO.email}`,
      label: "Email",
    },
  ];

  const displayClass = `flex gap-3 ${className} ${!showOnMobile ? "hidden md:flex" : ""} ${!showOnDesktop ? "md:hidden flex" : ""}`;

  if (socialLinks.length === 0) return null;

  return (
    <motion.div variants={fadeInUp} className={displayClass}>
      {socialLinks.map((social) => {
        const isBlack = social.iconColor === "#000000";
        const safeColor =
          isBlack && theme === "dark" ? "#ffffff" : social.iconColor;

        return (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors inline-block ${itemClassName}`}
            style={{ color: safeColor }}
            aria-label={social.label}
            whileHover={{
              scale: 1.15,
              y: -3,
              borderColor: safeColor,
              backgroundColor: `${safeColor}1A`,
              boxShadow: `0 0 15px ${safeColor}40`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon className="text-xl" />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
