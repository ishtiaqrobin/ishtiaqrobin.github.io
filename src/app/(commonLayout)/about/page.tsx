import { AboutSection } from "@/components/modules/home/AboutSection";
import AwardsSection from "@/components/modules/home/awards/AwardsSection";
import CommunitySection from "@/components/modules/home/community/CommunitySection";
import CtaSection from "@/components/modules/shared/CtaSection";
import Experience from "@/components/modules/home/experience/Experience";
import TechMarquee from "@/components/modules/shared/TechMarquee";
import DesignProcess from "@/components/modules/home/design_process/DesignProcess";

export default function AboutPage() {
  return (
    // <div className="flex flex-col min-h-screen">
    <div className="min-h-screen">
      <AboutSection />
      <div className="border-y bg-[#F7F8FA] dark:bg-[#0b0b0d]">
        <TechMarquee />
      </div>

      <Experience />
      <DesignProcess />
      <AwardsSection />
      <CommunitySection />

      <CtaSection />

      {/* <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ServiceSection />
      <GallerySection /> */}
    </div>
  );
}
