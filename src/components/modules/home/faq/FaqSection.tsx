"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import SplitTextReveal from "../../shared/SplitTextReveal";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "What is your current role?",
    answer:
      "I'm a freelance full-stack web developer and AI automation specialist. I build complete web applications and integrate AI-powered automation for clients.",
  },
  {
    id: 2,
    question: "How much does it cost for a high performing website?",
    answer:
      "Project pricing depends on scope, complexity, and timeline. A standard landing page typically starts from $200, while full-stack web applications are quoted after a discovery call. I provide transparent estimates with no hidden charges.",
  },
  {
    id: 3,
    question: "How long will the work take from start to finish?",
    answer:
      "A simple portfolio or landing page usually takes 5–7 business days. A feature-rich web application can take 3–6 weeks depending on the requirements. I share a clear timeline before starting every project.",
  },
  {
    id: 4,
    question: "Are you available to join as full time?",
    answer:
      "I am currently open to exciting full-time opportunities. If your company is building something meaningful and values clean, thoughtful engineering, I would love to have a conversation.",
  },
];

export default function FaqSection() {
  // ডিফল্টে কোনো item open নেই — null
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    // একই item এ ক্লিক করলে close, নতুনটায় ক্লিক করলে আগেরটা বন্ধ হয়ে নতুনটা খোলে
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container-custom py-10 sm:py-24 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        {/* ─── বামপাশ: Heading ─── */}
        <div className="lg:col-span-4">
          <ShimmerText className="mb-3.5">FAQs</ShimmerText>

          <h2 className="text-4xl lg:text-5xl font-clash font-medium tracking-wide leading-12 text-secondary">
            Have <br /> Questions?
          </h2>

          {/* <SplitTextReveal className="leading-12">
            Have <br /> Questions?
          </SplitTextReveal> */}
        </div>

        {/* ─── ডানপাশ: Accordion List ─── */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openId === faq.id;

            // zero-padded number — 01, 02, ...
            const num = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={faq.id}
                onClick={() => toggle(faq.id)}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 cursor-pointer transition-all duration-500"
              >
                {/* ─── Question রো ─── */}
                <div className="flex items-center justify-between py-4 gap-6">
                  <span className="text-base font-medium text-text-primary flex items-start gap-2">
                    {/* number prefix */}
                    <span className="text-base font-medium text-text-primary tabular-nums">
                      {num}.
                    </span>
                    {faq.question}
                  </span>

                  {/* Chevron — open হলে rotate */}
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

                {/* ─── Answer (Accordion body) ─── */}
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
          })}
        </div>
      </div>
    </section>
  );
}
