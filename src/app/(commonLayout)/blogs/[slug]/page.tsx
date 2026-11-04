import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { env } from "@/env";
import type { IBlog, IBlogComment } from "@/types/blog.type";
import { buildToc } from "@/utils/blogToc";
import BlogDetail from "@/components/modules/home/blog/BlogDetail";

const SITE_URL = "https://ishtiaqrobin.vercel.app";

async function getBlogBySlug(slug: string): Promise<IBlog | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}`, {
      next: { tags: ["blog"] },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

async function getBlogs(): Promise<IBlog[]> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/blogs?limit=100`, {
      next: { tags: ["blog"] },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getComments(blogId: string): Promise<IBlogComment[]> {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/blogs/${blogId}/comments`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getRelated(slug: string): Promise<IBlog[]> {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}/related?limit=3`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Post not found" };
  }

  const title = blog.metaTitle || blog.title;
  const description =
    blog.metaDescription || blog.excerpt || `Read "${blog.title}" on my blog.`;
  const url = blog.canonicalUrl || `${SITE_URL}/blogs/${blog.slug}`;
  const image = blog.ogImage || blog.thumbnail || "/og-image.jpg";

  return {
    title,
    description,
    keywords: blog.tags?.map((t) => t.name),
    authors: [{ name: blog.authorName || "Ishtiaq Robin" }],
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title,
      description,
      siteName: "Ishtiaq Robin Portfolio",
      publishedTime: blog.publishedAt ?? undefined,
      modifiedTime: blog.updatedAt,
      authors: [blog.authorName || "Ishtiaq Robin"],
      tags: blog.tags?.map((t) => t.name),
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ishtiaqrobin",
    },
    alternates: { canonical: url },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog || blog.status !== "PUBLISHED") notFound();

  const [allBlogs, comments, related] = await Promise.all([
    getBlogs(),
    getComments(blog.id),
    getRelated(slug),
  ]);

  // Prev / next based on publish order
  const ordered = [...allBlogs].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });
  const index = ordered.findIndex((b) => b.slug === slug);
  const previous =
    index >= 0 && index < ordered.length - 1
      ? { slug: ordered[index + 1].slug, title: ordered[index + 1].title }
      : null;
  const next =
    index > 0
      ? { slug: ordered[index - 1].slug, title: ordered[index - 1].title }
      : null;

  const { html, toc } = buildToc(blog.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt ?? undefined,
    image: blog.thumbnail ?? undefined,
    datePublished: blog.publishedAt ?? undefined,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.authorName || "Ishtiaq Robin",
    },
    publisher: {
      "@type": "Person",
      name: "Ishtiaq Robin",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetail
        blog={blog}
        html={html}
        toc={toc}
        comments={comments}
        related={related}
        previous={previous}
        next={next}
      />
    </>
  );
}
