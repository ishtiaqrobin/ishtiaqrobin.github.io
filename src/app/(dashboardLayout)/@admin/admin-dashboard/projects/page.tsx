import { ProjectsClient } from "@/components/modules/dashboard/admin/project/ProjectClient";
import { projectService } from "@/services/project.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const [projectsRes, categoriesRes] = await Promise.all([
    projectService.getProjects(),
    projectService.getCategories(),
  ]);

  return (
    <div className="space-y-6 min-h-screen">
      <ProjectsClient
        projects={projectsRes.data || []}
        categories={categoriesRes.data || []}
        token={token}
      />
    </div>
  );
}
