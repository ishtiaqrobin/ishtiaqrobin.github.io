import type { Metadata } from "next";

import BlogSection from "@/components/modules/home/blog/BlogSection";
import { blogService } from "@/services/blog.service";

export const metadata: Metadata = {
  title: "Blog | Developer Articles",
  description:
    "Technical articles on software engineering, web development, and computer science",
};

// Match the cache window used by blogService.getBlogs (revalidate: 60).
export const revalidate = 60;

export default async function PublicBlogPage() {
  const [blogsResult, tagsResult] = await Promise.all([
    blogService.getBlogs({ status: "PUBLISHED" }),
    blogService.getBlogTags(),
  ]);

  const blogs = blogsResult.data ?? [];
  const tags = tagsResult.data ?? [];

  const featuredBlogs = blogs.filter((b) => b.isFeatured);
  const latestBlogs = blogs.filter((b) => !b.isFeatured);

  return (
    <BlogSection
      featuredBlogs={featuredBlogs}
      latestBlogs={latestBlogs}
      tags={tags}
    />
  );
}
