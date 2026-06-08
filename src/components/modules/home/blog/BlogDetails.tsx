"use client";

import { useState } from "react";
import { Blog } from "@/types";
import { likeBlogAction } from "@/actions/blog.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Eye, Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import CommentSectionClient from "../comment/CommentSectionClient";

type Props = {
  blog: Blog;
};

function readingTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogDetails({ blog }: Props) {
  const [likeCount, setLikeCount] = useState(blog.likeCount);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  const rt = readingTime(blog.content);

  const handleLike = async () => {
    if (liked || liking) return;
    setLiking(true);
    const res = await likeBlogAction(blog.id);
    setLiking(false);
    if (res.success && res.data?.likeCount !== undefined) {
      setLikeCount(res.data.likeCount);
      setLiked(true);
      toast.success("Thanks for liking! ❤️");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: blog.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back */}
      <div className="">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 pb-10">
        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {blog.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs font-mono"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5">
          {blog.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          {blog.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {rt} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            {blog.viewCount.toLocaleString()} views
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5"
              onClick={handleShare}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </div>
        </div>

        {/* Thumbnail */}
        {blog.thumbnail && (
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-10 bg-muted">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "prose prose-neutral dark:prose-invert max-w-none",
            // Code blocks
            "[&_pre]:rounded-xl [&_pre]:bg-[#1e1e2e] [&_pre]:text-[#cdd6f4] [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:my-6",
            "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:text-sm",
            // Inline code
            "[&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:before:content-none [&_code:not(pre_code)]:after:content-none",
            // Tables
            "[&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2.5 [&_th]:border [&_th]:border-border [&_th]:p-2.5 [&_th]:bg-muted [&_th]:font-semibold",
            // Blockquote
            "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/30 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1",
            // Images
            "[&_img]:rounded-xl [&_img]:mx-auto",
            // Links
            "[&_a]:text-primary [&_a]:no-underline [&_a:hover]:underline",
            // Task lists
            "[&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]_li]:flex [&_ul[data-type=taskList]_li]:gap-2",
          )}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Like Button */}
        <div className="flex justify-center py-10">
          <button
            onClick={handleLike}
            disabled={liked || liking}
            className={cn(
              "group flex flex-col items-center gap-2 transition-all duration-500",
              liked ? "opacity-75" : "hover:scale-100",
            )}
          >
            <div
              className={cn(
                "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all",
                liked
                  ? "bg-red-500/10 border-red-500 text-red-500"
                  : "border-border text-muted-foreground group-hover:border-red-400 group-hover:text-red-400",
              )}
            >
              <Heart className={cn("h-7 w-7", liked && "fill-current")} />
            </div>
            <span className="text-sm font-medium">
              {likeCount.toLocaleString()} {likeCount === 1 ? "like" : "likes"}
            </span>
            {!liked && (
              <span className="text-xs text-muted-foreground">
                Enjoyed this article?
              </span>
            )}
          </button>
        </div>

        <Separator />

        {/* Comments */}
        <div className="mt-10">
          <CommentSectionClient
            blogId={blog.id}
            initialComments={blog.comments}
          />
        </div>
      </article>
    </div>
  );
}
