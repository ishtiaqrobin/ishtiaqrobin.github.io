import { ExperienceClient } from "@/components/modules/dashboard/admin/experience/ExperienceClient";
import { experienceService } from "@/services/experience.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const { data: experiences } = await experienceService.getExperiences();

  return (
    <div className="space-y-6 min-h-screen">
      <ExperienceClient
        experiences={experiences || []}
        token={token}
      />
    </div>
  );
}
