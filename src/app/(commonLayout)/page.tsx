"use client";

import { HeroSection } from "@/components/modules/home/HeroSection";
import { TestimonialSection } from "@/components/modules/home/TestimonialSection";
import { AboutSection } from "@/components/modules/home/AboutSection";
import StatsSection from "@/components/modules/home/StatsSection";
import { SkillsSection } from "@/components/modules/home/SkillsSection";
import { GallerySection } from "@/components/modules/home/GallerySection";
import { EducationSection } from "@/components/modules/home/EducationSection";
import { ExperienceSection } from "@/components/modules/home/ExperienceSection";
import { ProjectSection } from "@/components/modules/home/ProjectSection";
import { ServiceSection } from "@/components/modules/home/ServiceSection";
import { ContactSection } from "@/components/modules/home/ContactSection";
import { VideoSection } from "@/components/modules/home/VideoSection";
import { CTASection } from "@/components/modules/home/CTASection";
import { AppointmentsSection } from "@/components/modules/home/AppointmentsSection";
import { CertificateSection } from "@/components/modules/home/CertificateSection";
import HomeBlogPreview from "@/components/modules/home/blog/HomeBlogPreview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Static Content */}
      <HeroSection />

      {/* Dynamic Content */}
      <StatsSection />

      {/* Static Content */}
      {/* <AboutSection /> */}

      {/* Blog Section — compact preview, links to /blogs for the full list */}
      <HomeBlogPreview />

      {/* Dynamic Content */}
      {/* <EducationSection /> */}

      {/* Dynamic Content */}
      {/* <ExperienceSection /> */}

      {/* Dynamic Content */}
      {/* <SkillsSection /> */}

      {/* Dynamic Content */}
      {/* <ServiceSection /> */}

      {/* Dynamic Content */}
      {/* <GallerySection /> */}

      {/* Dynamic Content */}
      <ProjectSection />

      {/* Certificate Section */}
      <CertificateSection />

      {/* Appointments Section */}
      <AppointmentsSection />

      {/* Dynamic Content */}
      <VideoSection />

      {/* Dynamic Content */}
      <TestimonialSection />

      {/* Dynamic Content */}
      {/* <ContactSection /> */}

      {/* Static Content */}
      <CTASection />
    </div>
  );
}
