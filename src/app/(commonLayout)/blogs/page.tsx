import type { Metadata } from "next";
import { env } from "@/env";
import BlogsPage from "@/components/modules/home/blog/BlogsPage";
import type { IBlog, IBlogTag } from "@/types/blog.type";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles by Ishtiaq Robin on software engineering, AI, and building modern web applications.",
  keywords: [
    "Ishtiaq Robin Blog",
    "Software Engineering Blog",
    "AI Development",
    "Next.js Articles",
    "Web Development",
  ],
  authors: [{ name: "Ishtiaq Robin" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishtiaqrobin.vercel.app/blogs",
    title: "Blog — Ishtiaq Robin",
    description:
      "Articles by Ishtiaq Robin on software engineering, AI, and building modern web applications.",
    siteName: "Ishtiaq Robin Portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Ishtiaq Robin",
    description:
      "Articles by Ishtiaq Robin on software engineering, AI, and building modern web applications.",
    images: ["/twitter-image.jpg"],
    creator: "@ishtiaqrobin",
  },
  alternates: { canonical: "https://ishtiaqrobin.vercel.app/blogs" },
};

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

async function getTags(): Promise<IBlogTag[]> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/blogs/tags`, {
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

export default async function BlogsRoute() {
  const [blogs, tags] = await Promise.all([getBlogs(), getTags()]);

  return <BlogsPage blogs={blogs} tags={tags} />;
}
