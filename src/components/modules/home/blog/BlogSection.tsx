"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";

import { Blog, BlogTag } from "@/types/blog.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionTitle from "@/components/common/SectionTitle";

import BlogCard from "./BlogCard";

type BlogSectionProps = {
  featuredBlogs: Blog[];
  latestBlogs: Blog[];
  tags: BlogTag[];
  /**
   * When `true`, renders a compact preview (used on the home page):
   * no hero/search/tags, limited cards, and a "View all" link.
   */
  compact?: boolean;
  /** Max featured blogs to show in compact mode. Defaults to 2. */
  maxFeatured?: number;
  /** Max latest blogs to show in compact mode. Defaults to 3. */
  maxLatest?: number;
};

export default function BlogSection({
  featuredBlogs,
  latestBlogs,
  tags,
  compact = false,
  maxFeatured = 2,
  maxLatest = 3,
}: BlogSectionProps) {
  if (compact) {
    return (
      <CompactBlogSection
        featuredBlogs={featuredBlogs.slice(0, maxFeatured)}
        latestBlogs={latestBlogs.slice(0, maxLatest)}
      />
    );
  }

  return (
    <FullBlogSection
      featuredBlogs={featuredBlogs}
      latestBlogs={latestBlogs}
      tags={tags}
    />
  );
}

// ─────────────────────────────────────────────────────────
// Compact variant — home page preview
// ─────────────────────────────────────────────────────────

function CompactBlogSection({
  featuredBlogs,
  latestBlogs,
}: {
  featuredBlogs: Blog[];
  latestBlogs: Blog[];
}) {
  if (featuredBlogs.length === 0 && latestBlogs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Latest Articles"
          subtitle="From the Blog"
          description="Thoughts on software engineering, system design, and modern web development"
        />

        {featuredBlogs.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                Featured
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {featuredBlogs.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} featured={i === 0} />
              ))}
            </div>
          </div>
        )}

        {latestBlogs.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-5">
              Recent
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link href="/blogs">
            <Button asChild variant="outline" className="rounded-full group">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Full variant — interactive search + tag filtering
// ─────────────────────────────────────────────────────────

function FullBlogSection({
  featuredBlogs,
  latestBlogs,
  tags,
}: {
  featuredBlogs: Blog[];
  latestBlogs: Blog[];
  tags: BlogTag[];
}) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const allBlogs = [...featuredBlogs, ...latestBlogs];

    return allBlogs.filter((blog) => {
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.tags.some((t) => t.name.toLowerCase().includes(query));

      const matchesTag =
        !activeTag || blog.tags.some((t) => t.id === activeTag);

      return matchesSearch && matchesTag;
    });
  }, [featuredBlogs, latestBlogs, search, activeTag]);

  const isFiltering = Boolean(search || activeTag);
  const showFeatured = !isFiltering && featuredBlogs.length > 0;

  const clearFilters = () => {
    setSearch("");
    setActiveTag(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-linear-to-b from-muted/30 to-background">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <SectionTitle
            title="Technical Articles"
            subtitle="Dev Blog"
            description="In-depth articles on software engineering, system design, web development, and everything in between"
          />

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base rounded-xl"
              aria-label="Search articles"
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              <Button
                variant={activeTag === null ? "default" : "outline"}
                size="sm"
                className="rounded-full h-7 text-xs"
                onClick={() => setActiveTag(null)}
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={activeTag === tag.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full h-7 text-xs"
                  onClick={() =>
                    setActiveTag(activeTag === tag.id ? null : tag.id)
                  }
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {/* Featured */}
        {showFeatured && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h2 className="text-lg font-semibold">Featured</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {featuredBlogs.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} featured={i === 0} />
              ))}
            </div>
          </section>
        )}

        {/* All / filtered */}
        {/* <section>
          {!isFiltering ? (
            <h2 className="text-lg font-semibold mb-6">Latest Articles</h2>
          ) : (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={clearFilters}
              >
                Clear
              </Button>
            </div>
          )}

          {(isFiltering ? filtered : latestBlogs).length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(isFiltering ? filtered : latestBlogs).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </section> */}
      </div>
    </div>
  );
}
