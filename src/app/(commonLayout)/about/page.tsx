import { AboutSection } from "@/components/modules/home/AboutSection";
import { EducationSection } from "@/components/modules/home/EducationSection";
import { ExperienceSection } from "@/components/modules/home/ExperienceSection";
import { GallerySection } from "@/components/modules/home/GallerySection";
import { ServiceSection } from "@/components/modules/home/ServiceSection";
import { SkillsSection } from "@/components/modules/home/SkillsSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ServiceSection />
      <GallerySection />
    </div>
  );
}
