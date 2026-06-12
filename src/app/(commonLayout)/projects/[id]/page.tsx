import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Calendar,
  Tag,
  LayoutGrid,
} from "lucide-react";
import { env } from "@/env";
import { IProject } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getProject(id: string): Promise<IProject | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
      next: { tags: ["project"] },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

// ✅ Next.js 15 — params is now a Promise
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ← এটাই মূল fix

  const project = await getProject(id);

  if (!project || !project.isPublished) notFound();

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <main className="min-h-screen container-custom pt-28 mx-auto bg-gray-50/50 dark:bg-transparent">
      {/* Hero */}
      <section className="relative w-full aspect-[16/7] overflow-hidden bg-muted rounded-3xl">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <LayoutGrid className="h-20 w-20 text-muted-foreground/20" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <Link
              href="/#projects"
              className="flex items-center justify-center border border-gray-500 rounded-lg bg-white/10 dark:bg-black/40 backdrop-blur-xl px-2 py-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <div className="container-custom">
            {project.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/80 text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                {project.category.name}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {project.images && project.images.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <div
                      key={img.id}
                      className="relative aspect-video rounded-2xl overflow-hidden bg-muted border"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || `${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border bg-card p-5 space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Project Details
              </h3>
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <Button asChild className="w-full rounded-xl" size="lg">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="flex items-center text-green-500"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Preview
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl"
                    size="lg"
                  >
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="flex items-center text-primary"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Project Info
              </h3>
              {project.category && (
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">
                      Category
                    </p>
                    <p className="text-sm font-medium mt-0.5">
                      {project.category.name}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">
                    Published
                  </p>
                  <p className="text-sm font-medium mt-0.5">{formattedDate}</p>
                </div>
              </div>
              {project.isFeatured && (
                <div className="pt-1">
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-500/20 text-[11px]">
                    ⭐ Featured Project
                  </Badge>
                </div>
              )}
            </div>

            {project.tags.length > 0 && (
              <div className="rounded-2xl border bg-card p-5 space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-primary/5 text-primary font-bold border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

// ✅ generateMetadata-তেও একই fix
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
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
