"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import type { IBlog, IBlogTag } from "@/types/blog.type";
import BlogCard from "./BlogCard";

const PAGE_SIZE = 9;

interface BlogsPageProps {
    blogs: IBlog[];
    tags: IBlogTag[];
}

export default function BlogsPage({ blogs, tags }: BlogsPageProps) {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return blogs.filter((b) => {
            const matchesSearch =
                !query.trim() ||
                b.title.toLowerCase().includes(query.toLowerCase()) ||
                (b.excerpt ?? "").toLowerCase().includes(query.toLowerCase());

            const matchesTag =
                !activeTag || b.tags?.some((t) => t.slug === activeTag);

            return matchesSearch && matchesTag;
        });
    }, [blogs, query, activeTag]);

    // Pinned posts first, then newest
    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return db - da;
        });
    }, [filtered]);

    const featured = sorted.find((b) => b.isFeatured) ?? sorted[0] ?? null;
    const rest = sorted.filter((b) => b.id !== featured?.id);

    const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const paginated = rest.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE,
    );

    const resetPage = () => setPage(1);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Blog
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Thoughts on software engineering, AI, and building things for the web.
                </p>
            </div>

            {/* Search + tag filters */}
            <div className="mb-8 space-y-4">
                <div className="relative mx-auto max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            resetPage();
                        }}
                        placeholder="Search posts…"
                        className="h-11 pl-10"
                    />
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTag(null);
                                resetPage();
                            }}
                            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${activeTag === null
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                }`}
                        >
                            All
                        </button>
                        {tags.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => {
                                    setActiveTag(t.slug);
                                    resetPage();
                                }}
                                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${activeTag === t.slug
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                    }`}
                            >
                                {t.name}
                                {t._count?.blogs ? (
                                    <span className="ml-1.5 text-xs opacity-60">
                                        {t._count.blogs}
                                    </span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Empty state */}
            {sorted.length === 0 && (
                <div className="rounded-2xl border border-dashed py-20 text-center">
                    <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
                    <p className="text-muted-foreground">
                        {query || activeTag
                            ? "No posts match your filters."
                            : "No posts published yet. Check back soon!"}
                    </p>
                    {(query || activeTag) && (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setQuery("");
                                setActiveTag(null);
                                resetPage();
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </div>
            )}

            {/* Featured */}
            {featured && (
                <div className="mb-10">
                    <BlogCard blog={featured} featured />
                </div>
            )}

            {/* Grid */}
            {paginated.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginated.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setPage(n)}
                                className={`h-9 w-9 rounded-md text-sm transition-colors ${n === safePage
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Back link */}
            <div className="mt-16 text-center">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                    ← Back to home
                </Link>
            </div>
        </div>
    );
}
