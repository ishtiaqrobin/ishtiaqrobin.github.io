import { FaqsClient } from "@/components/modules/dashboard/admin/faqs/FaqsClient";
import { faqService } from "@/services/faq.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const { data: faqs } = await faqService.getFaqs();

  return (
    <div className="space-y-6 min-h-screen">
      <FaqsClient
        faqs={faqs || []}
        token={token}
      />
    </div>
  );
}
