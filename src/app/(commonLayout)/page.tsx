"use client";

import CtaSection from "@/components/modules/shared/CtaSection";
import HeroSection from "@/components/modules/home/hero/HeroSection";
import TextMarquee from "@/components/modules/shared/TextMarquee";
import Testimonials from "@/components/modules/home/testimonials/Testimonials";
import ScrollRevealText from "@/components/modules/shared/ScrollRevealText";
import ExpertiseSection from "@/components/modules/home/expertise/ExpertiseSection";
import { ProjectSection } from "@/components/modules/home/ProjectSection";
import SelectedProjects from "@/components/modules/home/selected_projects/SelectedProjects";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* flex flex-col */}
      <HeroSection />
      <TextMarquee />

      <ScrollRevealText text="I'm Ishtiaq Robin, with over 3+ years of experience in design & development with strong focus on producing high quality & impactful digital experiences. I have worked with some of the most innovative industry leaders to help build their top-notch products." />

      <SelectedProjects />
      <ExpertiseSection />
      <Testimonials />
      <CtaSection />

      {/* Previous Section */}
      {/* <EducationSection /> */}
      {/* <ExperienceSection /> */}
      {/* <SkillsSection /> */}
      {/* <ServiceSection /> */}
      {/* <GallerySection /> */}
      {/* <ProjectSection /> */}
      {/* Certificate Section */}
      {/* <CertificateSection /> */}
      {/* Appointments Section */}
      {/* <AppointmentsSection /> */}
      {/* <VideoSection /> */}
      {/* <TestimonialSection /> */}
      {/* <ContactSection /> */}
      {/* <CTASection /> */}
    </div>
  );
}
