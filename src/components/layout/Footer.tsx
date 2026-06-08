"use client";

import React, { useEffect, useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";
import { scrollToSection } from "../../utils/helpers";
import {
  FOOTER_LINKS,
  LEGAL_LINKS,
  PERSONAL_INFO,
} from "../../utils/constants";
import { SiWhatsapp } from "react-icons/si";
import { SocialIcons } from "../common/SocialIcons";
import { settingService } from "@/services/setting.service";
import { ISettings } from "@/types";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<ISettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await settingService.getSettings();
        if (data) setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const email = settings?.contactEmail || PERSONAL_INFO.email;
  const phone = settings?.contactPhone || PERSONAL_INFO.whatsapp;
  const whatsapp = settings?.whatsappNumber || PERSONAL_INFO.whatsapp;

  return (
    <footer className="relative bg-transparent overflow-hidden pt-24">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />

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

      <div className="container-custom relative z-10">
        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <h4 className="text-sm font-semibold tracking-widest text-primary-500 transition-colors group-hover:text-violet-500 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary-500 dark:bg-primary-500" />{" "}
              About Me
            </h4>

            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              Full Stack Web Developer building scalable web applications with
              modern technologies. From concept to deployment — I bring ideas to
              life with a passion for robust architecture and beautiful
              interfaces.
            </p>
            <button
              onClick={() => scrollToSection("home")}
              className="text-3xl font-bold font-mono text-gray-900 dark:text-white group flex items-center"
            >
              <span className="text-primary-500 transition-colors group-hover:text-violet-500">
                &lt;
              </span>
              <span>{PERSONAL_INFO.name.split(" ")[0]}</span>
              <span className="text-primary-500 transition-colors group-hover:text-violet-500">
                /&gt;
              </span>
            </button>

            {/* Social Icon in contact section */}
            <div className="mt-8">
              <SocialIcons className="hero-socials" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest text-primary-500 transition-colors group-hover:text-violet-500 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary-500 dark:bg-primary-500" />{" "}
              Navigation
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-3 group cursor-pointer"
                  >
                    <span className="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest text-primary-500 transition-colors group-hover:text-violet-500 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary-500 dark:bg-primary-500" />{" "}
              Contact
            </h4>
            <ul className="space-y-5 text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 duration-300 transition-all shadow-sm">
                    <HiMail className="text-xl text-red-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-red-400 transition-colors">
                    {email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 duration-300 transition-all shadow-sm">
                    <HiPhone className="text-xl text-blue-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                    {phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 duration-300 transition-all shadow-sm">
                    <SiWhatsapp className="text-xl text-green-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium">WhatsApp Me</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="container-custom border border-primary-500/30 rounded-2xl  p-5 md:p-6 bg-accent/20 shadow-2xl shadow-primary-500/30 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
          {/* Copyright */}
          <div>
            <p>
              © {currentYear}{" "}
              <span className="text-gray-900 font-medium dark:text-white">
                {PERSONAL_INFO.name}
              </span>
              . All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="hidden sm:flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-primary-500 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Developed by */}
          <div>
            <p className="text-sm">Developed By: </p>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ishtiaq-robin"
              className="text-primary-500 transition-colors group-hover:text-violet-500 relative group/tooltip"
            >
              <span className="font-bold">Ishtiaq Robin</span>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-700">
                <div className="text-center">
                  <div className="font-bold text-primary-500 transition-colors group-hover:text-violet-500 mb-1">
                    Ishtiaq Robin
                  </div>
                  <div className="text-gray-300 text-xs">
                    Professional Web Development,
                    <br />
                    Mobile Apps & Software Solutions
                    <br />
                    Digital Innovation & Technology
                  </div>
                </div>

                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
