"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Heart, Share2, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { likeBlogAction } from "@/actions/blog.action";

interface BlogActionsProps {
    blogId: string;
    slug: string;
    title: string;
    initialLikes: number;
}

export default function BlogActions({
    blogId,
    slug,
    title,
    initialLikes,
}: BlogActionsProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [busy, setBusy] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleLike = async () => {
        if (busy || liked) return;
        setBusy(true);

        const result = await likeBlogAction(blogId);

        if (result.success && result.data) {
            setLikes(result.data.likeCount);
            if (result.data.liked) {
                setLiked(true);
                toast.success("Thanks for the like!");
            } else {
                setLiked(true);
                toast.info(result.data.message);
            }
        } else {
            toast.error(result.message);
        }

        setBusy(false);
    };

    const shareUrl =
        typeof window !== "undefined"
            ? window.location.href
            : `https://ishtiaqrobin.vercel.app/blogs/${slug}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Could not copy link");
        }
    };

    const shareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl,
        )}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border-y py-4">
            <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                disabled={busy || liked}
                className="gap-1.5"
            >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                {likes}
            </Button>

            <div className="mx-1 h-5 w-px bg-border" />

            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Share2 className="h-3.5 w-3.5" />
                Share
            </span>

            <Button variant="outline" size="sm" onClick={shareTwitter}>
                X
            </Button>
            <Button variant="outline" size="sm" onClick={shareLinkedIn}>
                LinkedIn
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5"
            >
                {copied ? (
                    <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                    </>
                ) : (
                    <>
                        <Link2 className="h-3.5 w-3.5" />
                        Copy link
                    </>
                )}
            </Button>
        </div>
    );
}
