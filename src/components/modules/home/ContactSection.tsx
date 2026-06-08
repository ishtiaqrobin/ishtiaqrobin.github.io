"use client";

import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import SectionTitle from "@/components/common/SectionTitle";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./card/ContactForm";
import { SocialIcons } from "@/components/common/SocialIcons";
import { settingService } from "@/services/setting.service";
import { ISettings } from "@/types";
import { PERSONAL_INFO } from "@/utils/constants";

export function ContactSection() {
    const [settings, setSettings] = useState<ISettings | null>(null);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    useEffect(() => {
        settingService.getSettings().then(({ data }) => {
            if (data) setSettings(data);
        });
    }, []);

    const contactEmail = settings?.contactEmail || PERSONAL_INFO.email;
    const contactPhone = settings?.contactPhone || PERSONAL_INFO.whatsapp; // Fallback to whatsapp if phone is missing
    const address = settings?.address || "Dhaka, Bangladesh";
    const availability = settings?.availability || "freelance work and full-time opportunities";

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: contactEmail,
            href: `mailto:${contactEmail}`
        },
        {
            icon: Phone,
            label: "Phone",
            value: settings?.contactPhone || contactPhone,
            href: `tel:${(settings?.contactPhone || contactPhone).replace(/[^0-9]/g, "")}`
        },
        {
            icon: MapPin,
            label: "Location",
            value: address,
            href: "https://maps.app.goo.gl/E1bVnQxW1D8x5hK19"
            // Your google location here
        }
    ];

    return (
        <section id="contact" ref={ref} className="py-24 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />

            {/* Stylish Diagonal Grid Background */}
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
                    className="absolute inset-0 dark:opacity-[0.08] opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' stroke='%234f46e5' stroke-width='1.5' fill='none' fill-rule='evenodd' opacity='0.8'/%3E%3C/svg%3E\")",
                        backgroundSize: "40px 40px",
                        maskImage:
                            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/10 dark:via-primary-500/15 to-transparent opacity-60" />
            </div>

            <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    subtitle="Get In Touch"
                    title="Let's Work Together"
                    description="Have a project in mind? Let's discuss and bring your vision to life"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold tracking-tight">Let&apos; discuss your next project</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                I&apos;m currently available for {availability}.
                                Let&apos;s build something amazing together.
                            </p>
                        </div>

                        <div className="space-y-3.5">
                            {contactInfo.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-muted/60 hover:bg-muted border hover:border-primary/20 transition-all group"
                                >
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                                        <p className="font-semibold">{item.value}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4">
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow Me</p>

                            {/* Social Icon in contact section */}
                            <SocialIcons
                                className="hero-socials"
                            />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
