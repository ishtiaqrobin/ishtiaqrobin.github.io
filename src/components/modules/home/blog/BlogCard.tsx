"use client";

import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog.type";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
  blog: Blog;
  featured?: boolean;
};

function readingTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogCard({ blog, featured = false }: Props) {
  const rt = readingTime(blog.content);

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={cn(
        "group block rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30",
        featured && "sm:col-span-2 sm:flex",
      )}
    >
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div
          className={cn(
            "relative bg-muted overflow-hidden shrink-0",
            featured ? "sm:w-72 h-48 sm:h-auto" : "h-44 w-full",
          )}
        >
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-amber-500 text-white text-xs border-0">
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs px-2 py-0 font-mono"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-bold leading-snug group-hover:text-primary transition-colors",
            featured ? "text-xl" : "text-base",
          )}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            className={cn(
              "text-muted-foreground line-clamp-2",
              featured ? "text-sm" : "text-xs",
            )}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-2 border-t flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {rt} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {blog.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {blog.likeCount.toLocaleString()}
          </span>
          {blog.publishedAt && (
            <span className="ml-auto">
              {format(new Date(blog.publishedAt), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
