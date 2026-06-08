"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ExternalLink, LayoutGrid, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IProject } from "@/types";

interface ProjectCardProps {
  item: IProject;
}

export function ProjectCard({ item }: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card
        onClick={() => router.push(`/projects/${item.id}`)}
        className="p-0 group relative h-full overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500 flex flex-col cursor-pointer gap-0"
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <LayoutGrid className="h-12 w-12 text-muted-foreground/20" />
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-primary shadow-lg">
              {item.category?.name}
            </span>
          </div>

          {/* Hover Overlay — Live & GitHub বাটন */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-10 backdrop-blur-sm">
            {item.liveUrl && (
              <Link
                href={item.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="h-12 w-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-105 transition-transform shadow-xl hover:bg-primary hover:text-white duration-500"
                title="Live Preview"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}

            {item.githubUrl && (
              <Link
                href={item.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl hover:bg-white hover:text-gray-900 duration-500"
                title="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-1.5 group-hover:text-primary transition-colors duration-300">
              <Link href={`/projects/${item.id}`}>{item.title}</Link>
              <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1 rounded-lg bg-primary/5 text-primary font-bold border border-primary/10 hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
