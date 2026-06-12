"use client";

import React from "react";
import {
  FiMessageSquare,
  FiBriefcase,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Left side 4 cards
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 bg-accent border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl flex flex-col items-start gap-4 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 group">
    {/* Icon container */}
    {/* <div className="p-4 flex items-center justify-center rounded-full bg-zinc-300/40 dark:bg-zinc-900 text-primary border border-zinc-200/50 dark:border-emerald-900/40 transition-transform duration-300 ">
      {icon}
    </div> */}

    <div className="p-3.5 flex items-center justify-center rounded-full text-primary text-xl bg-[#E5E7EB] dark:bg-[#191920] border border-zinc-300 dark:border-zinc-800 shrink-0">
      {icon}
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-xl leading-7 font-medium text-text-primary tracking-tight">
        {title}
      </h3>
      <p className="text-base leading-snug text-text-primary font-normal">
        {description}
      </p>
    </div>
  </div>
);

export default function CommunitySection() {
  return (
    <section className="container-custom pt-16 sm:pt-22 pb-12 sm:pb-12">
      {/* বড় স্ক্রিনে ২ কলাম গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* 
          ─── ডানপাশের সেকশন (কন্টেন্ট, স্ট্যাটস এবং বাটন) ─── 
          মোবাইলে এটি প্রথমে থাকবে (order-first), এবং বড় স্ক্রিনে নিজের আসল অর্ডারে ফিরবে (lg:order-none)
        */}
        <div className="lg:col-span-6 flex flex-col items-start text-left order-first lg:order-none">
          {/* গ্লেয়ার টেক্সট ব্যাজ */}
          <div>
            <ShimmerText className="mb-3.5">Community Work</ShimmerText>
            <h2 className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-tight mb-6">
              Building a Tech <br /> Community
            </h2>
            <p className="text-text-primary font-normal leading-snug text-base">
              I founded Design & Code which is a global community with a mission
              to connect designers and developers to create a happy community
              eager to learn, innovate and grow together. We welcome all
              designers and developers: beginners, intermediates, and experts
              willing to learn together. We encourage sharing resources and
              learning experiences, organizing events, and providing feedback
              for our members to grow as they learn.
            </p>
          </div>

          {/* ─── স্ট্যাটস কাউন্টার এরিয়া ─── */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-nowrap my-8">
            <div className="flex flex-col">
              <span className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-wider">
                5k+
              </span>
              <span className="text-base leading-[22px] text-text-primary font-normal tracking-wider">
                Community Members
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-wider">
                25+
              </span>
              <span className="text-base leading-[22px] text-text-primary font-normal tracking-wider">
                Events conducted
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl lg:text-5xl text-secondary font-clash font-medium tracking-wider">
                5
              </span>
              <span className="text-base leading-[22px] text-text-primary font-normal tracking-wider">
                Years
              </span>
            </div>
          </div>

          <Link
            href="https://www.facebook.com/groups/288111895977592"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverButton>Join Community</HoverButton>
          </Link>
        </div>

        {/* ─── বামপাশের সেকশন (৪টি ফিচারカード গ্রিড) ─── */}
        {/* মোবাইলে এটি নিচে চলে যাবে (order-last) এবং ডেস্কটপে প্রথমে আসবে (lg:order-first) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 order-last lg:order-first">
          <FeatureCard
            icon={<FiMessageSquare className="w-5 h-5" />}
            title="Mentoring"
            description="Get connected with a mentor that will help you pave your career path."
          />
          <FeatureCard
            icon={<FiBriefcase className="w-5 h-5" />}
            title="Opportunities"
            description="Get Internships and Job opportunities and gain experience while you learn."
          />
          <FeatureCard
            icon={<FiBookOpen className="w-5 h-5" />}
            title="Free Resources"
            description="Get Free resources related to Designing and Development from the community."
          />
          <FeatureCard
            icon={<FiHeart className="w-5 h-5" />}
            title="Help & Reviews"
            description="Get your portfolio and projects reviewed by Industry experts and mentors."
          />
        </div>
      </div>
    </section>
  );
}
