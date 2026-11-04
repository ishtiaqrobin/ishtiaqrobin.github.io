import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import type { IBlog, IBlogComment, ITocItem } from "@/types/blog.type";
import BlogActions from "./BlogActions";
import CommentSection from "./CommentSection";
import BlogCard from "./BlogCard";

interface BlogDetailProps {
    blog: IBlog;
    html: string;
    toc: ITocItem[];
    comments: IBlogComment[];
    related: IBlog[];
    previous: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
}

function formatDate(value: string | null): string {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogDetail({
    blog,
    html,
    toc,
    comments,
    related,
    previous,
    next,
}: BlogDetailProps) {
    return (
        <article className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Back */}
            <Link
                href="/blogs"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                All posts
            </Link>

            {/* Header */}
            <header className="mx-auto max-w-3xl">
                {blog.tags?.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {blog.tags.map((t) => (
                            <Badge key={t.id} variant="secondary" className="text-xs">
                                {t.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                    {blog.title}
                </h1>

                {blog.excerpt && (
                    <p className="mt-4 text-lg text-muted-foreground">{blog.excerpt}</p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {blog.authorName || "Ishtiaq Robin"}
                    </span>
                    {blog.publishedAt && (
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(blog.publishedAt)}
                        </span>
                    )}
                    {blog.readingTime && (
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {blog.readingTime} min read
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        {blog.viewCount} views
                    </span>
                </div>
            </header>

            {/* Cover */}
            {blog.thumbnail && (
                <div className="relative mx-auto mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border bg-muted">
                    <Image
                        src={blog.thumbnail}
                        alt={blog.coverImageAlt || blog.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}

            {/* Actions */}
            <div className="mx-auto mt-8 max-w-3xl">
                <BlogActions
                    blogId={blog.id}
                    slug={blog.slug}
                    title={blog.title}
                    initialLikes={blog.likeCount}
                />
            </div>

            {/* Body + TOC */}
            <div className="mx-auto mt-10 flex max-w-6xl gap-10">
                {/* Article */}
                <div className="min-w-0 flex-1">
                    <div
                        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-primary prose-a:underline-offset-2 prose-img:rounded-xl prose-pre:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {/* Prev / Next */}
                    {(previous || next) && (
                        <nav className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2">
                            {previous ? (
                                <Link
                                    href={`/blogs/${previous.slug}`}
                                    className="group rounded-xl border p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
                                >
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <ArrowLeft className="h-3 w-3" />
                                        Previous
                                    </span>
                                    <p className="mt-1 line-clamp-2 font-medium group-hover:text-primary">
                                        {previous.title}
                                    </p>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {next && (
                                <Link
                                    href={`/blogs/${next.slug}`}
                                    className="group rounded-xl border p-4 text-right transition-colors hover:border-primary/40 hover:bg-muted/40 sm:col-start-2"
                                >
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        Next
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                    <p className="mt-1 line-clamp-2 font-medium group-hover:text-primary">
                                        {next.title}
                                    </p>
                                </Link>
                            )}
                        </nav>
                    )}

                    {/* Comments */}
                    <CommentSection blogId={blog.id} initialComments={comments} />
                </div>

                {/* TOC sidebar */}
                {toc.length > 1 && (
                    <aside className="hidden w-56 shrink-0 lg:block">
                        <div className="sticky top-24">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                On this page
                            </p>
                            <nav className="space-y-1 border-l">
                                {toc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`block border-l-2 border-transparent py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground ${item.level === 3 ? "pl-6" : "pl-3"
                                            }`}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                )}
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="mt-20 border-t pt-10">
                    <h2 className="mb-6 text-2xl font-bold">Related posts</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((r) => (
                            <BlogCard key={r.id} blog={r} />
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
