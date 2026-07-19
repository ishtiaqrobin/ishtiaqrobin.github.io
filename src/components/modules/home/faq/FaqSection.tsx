"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import { IFaq } from "@/types/faq.type";
import { faqService } from "@/services/faq.service";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data } = await faqService.getFaqs();
        if (data) {
          const published = data.filter((f) => f.isPublished);
          setFaqs(published);
        }
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container-custom py-10 sm:py-24 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        <div className="lg:col-span-4">
          <ShimmerText className="mb-3.5">FAQs</ShimmerText>

          <h2 className="text-4xl lg:text-5xl font-clash font-medium tracking-wide leading-12 text-secondary">
            Have <br /> Questions?
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-3">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : faqs.length === 0 ? null : (
            faqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              const num = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  onClick={() => toggle(faq.id)}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 cursor-pointer transition-all duration-500"
                >
                  <div className="flex items-center justify-between py-4 gap-6">
                    <span className="text-base font-medium text-text-primary flex items-start gap-2">
                      <span className="text-base font-medium text-text-primary tabular-nums">
                        {num}.
                      </span>
                      {faq.question}
                    </span>

                    <span
                      className="text-text-primary shrink-0"
                      style={{
                        display: "inline-block",
                        transition:
                          "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={
                      isOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="pb-4 text-base text-text-primary">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
