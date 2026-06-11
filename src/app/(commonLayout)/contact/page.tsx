import { ContactSection } from "@/components/modules/home/contact/ContactSection";
import FaqSection from "@/components/modules/home/faq/FaqSection";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactSection />
      <FaqSection />
    </div>
  );
}
