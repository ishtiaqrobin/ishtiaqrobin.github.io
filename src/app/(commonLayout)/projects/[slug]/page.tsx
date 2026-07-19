import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { env } from "@/env";
import { IProject } from "@/types";
import ProjectDetails from "@/components/modules/home/project/ProjectDetails";
import CtaSection from "@/components/modules/shared/CtaSection";

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
    <>
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
      <CtaSection />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title}`;
  const description =
    project.description ||
    `Explore the ${project.title} project by Ishtiaq Robin.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      "Ishtiaq Robin",
      "Web Development Project",
      "Portfolio Project",
      ...(project.tags || []),
    ],
    authors: [{ name: "Ishtiaq Robin" }],
    creator: "Ishtiaq Robin",
    publisher: "Ishtiaq Robin",
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://ishtiaqrobin.vercel.app/projects/${slug}`,
      title,
      description,
      siteName: "Ishtiaq Robin Portfolio",
      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              width: 1200,
              height: 630,
              alt: `${project.title} — Ishtiaq Robin`,
            },
          ]
        : [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Ishtiaq Robin Portfolio",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.thumbnail
        ? [project.thumbnail]
        : ["/twitter-image.jpg"],
      creator: "@ishtiaqrobin",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://ishtiaqrobin.vercel.app/projects/${slug}`,
    },
  };
}
