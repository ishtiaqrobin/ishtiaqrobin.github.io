"use client";

import { PERSONAL_INFO } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { settingService } from "@/services/setting.service";
import type { ISettings } from "@/types";

interface SocialLink {
  id: number;
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function SocialIcons() {
  const [settings, setSettings] = useState<ISettings | null>(null);

  useEffect(() => {
    settingService.getSettings().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const linkedinUrl = settings?.linkedinUrl || PERSONAL_INFO.linkedin;
  const githubUrl = settings?.githubUrl || PERSONAL_INFO.github;
  const facebookUrl = settings?.facebookUrl || PERSONAL_INFO.facebook;
  const contactEmail = settings?.contactEmail || PERSONAL_INFO.email;
  const whatsappNumber = settings?.whatsappNumber || PERSONAL_INFO.whatsapp;

  const SOCIAL_LINKS: SocialLink[] = [
    {
      id: 1,
      icon: <FiLinkedin className="w-5 h-5" />,
      href: linkedinUrl,
      label: "LinkedIn",
    },
    {
      id: 2,
      icon: <FiGithub className="w-5 h-5" />,
      href: githubUrl,
      label: "GitHub",
    },
    {
      id: 3,
      icon: <FiMail className="w-5 h-5" />,
      href: `mailto:${contactEmail}`,
      label: "Email",
    },
    {
      id: 4,
      icon: <FiFacebook className="w-5 h-5" />,
      href: facebookUrl,
      label: "Facebook",
    },
    {
      id: 5,
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: `https://wa.me/${whatsappNumber}`,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex items-center gap-6 group/icons">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={[
            "text-zinc-800 dark:text-zinc-300",
            "transition-[opacity,color] duration-300 ease-out",
            "group-hover/icons:opacity-35",
            "hover:!opacity-100",
            "hover:!text-zinc-900 dark:hover:!text-white",
          ].join(" ")}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
