"use client";

// import { motion } from "framer-motion";
import { motion } from "motion/react";

export function CTASection() {
    return (
        <section className="pt-20 pb-20 bg-background ">
            <div className="container mx-auto flex flex-col items-center text-center">
                <motion.h2
                    className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 sm:mb-10 uppercase leading-[1.1]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Let&apos; build <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-violet-500">
                        the future
                    </span>
                </motion.h2>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent mb-16" />
        </section>
    );
}
