"use client";

import { PERSONAL_INFO } from "@/utils/constants";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

interface SocialLink {
  id: number;
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 1,
    icon: <FiLinkedin className="w-5 h-5" />,
    href: PERSONAL_INFO.linkedin,
    label: "LinkedIn",
  },
  {
    id: 2,
    icon: <FiGithub className="w-5 h-5" />,
    href: PERSONAL_INFO.github,
    label: "GitHub",
  },
  {
    id: 3,
    icon: <FiMail className="w-5 h-5" />,
    href: `mailto:${PERSONAL_INFO.email}`,
    label: "Email",
  },
  {
    id: 4,
    icon: <FiFacebook className="w-5 h-5" />,
    href: PERSONAL_INFO.facebook,
    label: "Facebook",
  },
  {
    id: 5,
    icon: <FaWhatsapp className="w-5 h-5" />,
    href: `https://wa.me/${PERSONAL_INFO.whatsapp}`,
    label: "Instagram",
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-6 group/icons">
      {/*
          ─── ডানপাশের সোশ্যাল আইকন গ্রুপ ───

          কৌশল:
          • Parent এ `group/icons` দেওয়া আছে।
          • Parent এ hover আসলে (`group-hover/icons:`) সব আইকনের
            opacity কমে 0.35 হয় — "dimmed" অবস্থা।
          • কিন্তু যে নির্দিষ্ট আইকনটিতে cursor আছে সে নিজে
            `hover:!opacity-100` এবং `hover:!text-zinc-900` দিয়ে
            parent এর dim কে override করে fully bright থাকে।

          Transition:
          • `transition-[opacity,color]` — শুধু দরকারি property দুটোই animate হয়।
          • `duration-200` dim হতে fast (snappy feel)।
          • `ease-out` — hover ছাড়লে স্বাভাবিক অবস্থায় ফেরা smooth।
        */}
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          // title={social.label}
          className={[
            "text-zinc-800 dark:text-zinc-300",
            // Transition — শুধু opacity ও color animate হবে
            "transition-[opacity,color] duration-300 ease-out",
            // Parent এ hover এলে এই আইকন dim হবে
            "group-hover/icons:opacity-35",
            // কিন্তু নিজে hover এ থাকলে আবার fully bright
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
