import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar, ArrowUpRight } from "lucide-react";
import type { IBlog } from "@/types/blog.type";

interface BlogCardProps {
    blog: IBlog;
    featured?: boolean;
}

function formatDate(value: string | null): string {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
    return (
        <Link
            href={`/blogs/${blog.slug}`}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg ${featured ? "md:flex-row" : ""
                }`}
        >
            {/* Cover */}
            <div
                className={`relative shrink-0 overflow-hidden bg-muted ${featured ? "aspect-video md:aspect-auto md:w-1/2" : "aspect-video"
                    }`}
            >
                {blog.thumbnail ? (
                    <Image
                        src={blog.thumbnail}
                        alt={blog.coverImageAlt || blog.title}
                        fill
                        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl font-bold text-primary/20">
                            {blog.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}

                {blog.isPinned && (
                    <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                        Pinned
                    </Badge>
                )}
            </div>

            {/* Body */}
            <div className={`flex flex-1 flex-col p-5 ${featured ? "md:p-7" : ""}`}>
                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((t) => (
                            <Badge
                                key={t.id}
                                variant="secondary"
                                className="text-[10px] font-medium"
                            >
                                {t.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <h3
                    className={`font-bold leading-snug tracking-tight transition-colors group-hover:text-primary ${featured ? "text-2xl md:text-3xl" : "text-lg"
                        }`}
                >
                    {blog.title}
                </h3>

                {blog.excerpt && (
                    <p
                        className={`mt-2 text-muted-foreground ${featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
                            }`}
                    >
                        {blog.excerpt}
                    </p>
                )}

                {/* Meta */}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-xs text-muted-foreground">
                    {blog.publishedAt && (
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(blog.publishedAt)}
                        </span>
                    )}
                    {blog.readingTime && (
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.readingTime} min read
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {blog.viewCount}
                    </span>

                    <span className="ml-auto inline-flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Read
                        <ArrowUpRight className="h-3 w-3" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
