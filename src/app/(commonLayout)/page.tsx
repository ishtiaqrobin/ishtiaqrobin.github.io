"use client";

import CtaSection from "@/components/modules/shared/CtaSection";
import HeroSection from "@/components/modules/home/hero/HeroSection";
import TextMarquee from "@/components/modules/shared/TextMarquee";
import Testimonials from "@/components/modules/home/testimonials/Testimonials";
import ScrollRevealText from "@/components/modules/shared/ScrollRevealText";
import ExpertiseSection from "@/components/modules/home/expertise/ExpertiseSection";
import { ProjectSection } from "@/components/modules/home/ProjectSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* flex flex-col */}
      <HeroSection />
      <TextMarquee />

      <ScrollRevealText text="I'm Ishtiaq Robin, with over 3+ years of experience in design & development with strong focus on producing high quality & impactful digital experiences. I have worked with some of the most innovative industry leaders to help build their top-notch products." />

      <ExpertiseSection />
      <Testimonials />
      <CtaSection />

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
      {/* <ProjectSection /> */}

      {/* Certificate Section */}
      {/* <CertificateSection /> */}

      {/* Appointments Section */}
      {/* <AppointmentsSection /> */}

      {/* Dynamic Content */}
      {/* <VideoSection /> */}

      {/* Dynamic Content */}
      {/* <TestimonialSection /> */}

      {/* Dynamic Content */}
      {/* <ContactSection /> */}

      {/* Static Content */}
      {/* <CTASection /> */}
    </div>
  );
}
