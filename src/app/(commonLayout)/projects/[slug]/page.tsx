import { notFound } from "next/navigation";
import { env } from "@/env";
import { IProject } from "@/types";
import ProjectDetails from "@/components/modules/home/project/ProjectDetails";

async function getProjectBySlug(slug: string): Promise<IProject | null> {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/projects/slug/${slug}`,
      {
        next: { tags: ["project"] },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

async function getProjects(): Promise<IProject[]> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { tags: ["project"] },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project || !project.isPublished) notFound();

  const publishedProjects = allProjects.filter((p) => p.isPublished);
  const currentIndex = publishedProjects.findIndex((p) => p.slug === slug);
  const previousProject =
    currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < publishedProjects.length - 1
      ? publishedProjects[currentIndex + 1]
      : null;

  return (
    <ProjectDetails
      project={project}
      previousProject={
        previousProject
          ? { slug: previousProject.slug, title: previousProject.title }
          : null
      }
      nextProject={
        nextProject
          ? { slug: nextProject.slug, title: nextProject.title }
          : null
      }
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}
