// app/(public)/blogs/[slug]/page.tsx
// Server Component

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogService } from "@/services/blog.service";
import BlogDetails from "@/components/modules/home/blog/BlogDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog, error } = await blogService.getBlogBySlug(slug);

  if (error || !blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || blog.title,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  const { data: blogs } = await blogService.getBlogs({ status: "PUBLISHED" });

  if (!blogs) return [];

  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDynamicPage({ params }: Props) {
  const { slug } = await params;
  const { data: blog, error } = await blogService.getBlogBySlug(slug);

  if (error || !blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
}
