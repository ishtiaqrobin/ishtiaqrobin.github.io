"use client";

import { useEffect, useState } from "react";

import { Blog } from "@/types/blog.type";
import { blogService } from "@/services/blog.service";
import SectionTitle from "@/components/common/SectionTitle";

import BlogSection from "./BlogSection";

/**
 * Client-side wrapper used on the home page.
 *
 * The home page is a Client Component (because it composes many other client
 * sections), so we cannot `await` data inside it. This component fetches the
 * published blogs on the client, then defers rendering to the compact variant
 * of `BlogSection`.
 *
 * For SEO-critical pages (e.g. `/blogs`), keep using the server-component
 * pattern — fetch in the route's `page.tsx` and pass props directly.
 */
export default function HomeBlogPreview() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await blogService.getBlogs({
        status: "PUBLISHED",
      });

      if (cancelled) return;

      if (error || !data) {
        setErrored(true);
        setBlogs([]);
        return;
      }

      setBlogs(data);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Loading — show a lightweight skeleton so the section keeps its visual rhythm.
  if (blogs === null) {
    return <HomeBlogPreviewSkeleton />;
  }

  // Hide the section entirely if the fetch failed or there's nothing to show.
  if (errored || blogs.length === 0) {
    return null;
  }

  const featuredBlogs = blogs.filter((b) => b.isFeatured);
  const latestBlogs = blogs.filter((b) => !b.isFeatured);

  return (
    <BlogSection
      compact
      featuredBlogs={featuredBlogs}
      latestBlogs={latestBlogs}
      tags={[]}
    />
  );
}

function HomeBlogPreviewSkeleton() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Latest Articles"
          subtitle="From the Blog"
          description="Thoughts on software engineering, system design, and modern web development"
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl border bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
