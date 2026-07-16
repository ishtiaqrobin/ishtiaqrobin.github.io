import ProjectsPage from "@/components/modules/home/project/ProjectsPage";
import CtaSection from "@/components/modules/shared/CtaSection";
import { env } from "@/env";

async function getProjectsAndCategories() {
  try {
    const [projRes, catRes] = await Promise.all([
      fetch(`${env.NEXT_PUBLIC_API_URL}/projects`, {
        next: { tags: ["project"] },
        cache: "no-store",
      }),
      fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { tags: ["project"] },
        cache: "no-store",
      }),
    ]);

    const projects = projRes.ok ? (await projRes.json()).data || [] : [];
    const categories = catRes.ok ? (await catRes.json()).data || [] : [];

    return { projects, categories };
  } catch {
    return { projects: [], categories: [] };
  }
}

export default async function ProjectPage() {
  const { projects, categories } = await getProjectsAndCategories();

  return (
    <div>
      <ProjectsPage projects={projects} categories={categories} />
      <CtaSection />
    </div>
  );
}
