"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, MessageSquare, Reply } from "lucide-react";
import type { IBlogComment } from "@/types/blog.type";
import { createBlogCommentAction } from "@/actions/blog.action";

interface CommentSectionProps {
  blogId: string;
  initialComments: IBlogComment[];
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: IBlogComment;
  onReply: (c: IBlogComment) => void;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {comment.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium">{comment.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">
        {comment.comment}
      </p>

      <button
        type="button"
        onClick={() => onReply(comment)}
        className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
      >
        <Reply className="h-3 w-3" />
        Reply
      </button>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3 border-l-2 pl-4">
          {comment.replies.map((r) => (
            <div key={r.id}>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-xs font-medium">{r.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {formatDate(r.createdAt)}
                </p>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-sm text-foreground/90">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({
  blogId,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<IBlogComment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<IBlogComment | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      toast.error("Name, email, and comment are required");
      return;
    }

    setSubmitting(true);
    const result = await createBlogCommentAction(blogId, {
      name: name.trim(),
      email: email.trim(),
      comment: comment.trim(),
      ...(replyTo && { parentId: replyTo.id }),
    });

    if (result.success) {
      toast.success(result.message);
      setName("");
      setEmail("");
      setComment("");
      setReplyTo(null);
    } else {
      toast.error(result.message);
    }

    setSubmitting(false);
  };

  const total =
    comments.length +
    comments.reduce((sum, c) => sum + (c.replies?.length ?? 0), 0);

  return (
    <section id="comments" className="mt-16 border-t pt-10">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <MessageSquare className="h-5 w-5 text-primary" />
        Comments
        <span className="text-base font-normal text-muted-foreground">
          ({total})
        </span>
      </h2>

      {/* List */}
      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id} comment={c} onReply={setReplyTo} />
          ))
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border bg-card p-5"
      >
        <h3 className="text-base font-semibold">
          {replyTo ? `Reply to ${replyTo.name}` : "Leave a comment"}
        </h3>

        {replyTo && (
          <button
            type="button"
            onClick={() => setReplyTo(null)}
            className="mt-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Cancel reply
          </button>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="c-name" className="text-xs">
              Name *
            </Label>
            <Input
              id="c-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-10"
              maxLength={80}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email" className="text-xs">
              Email * <span className="text-muted-foreground">(not public)</span>
            </Label>
            <Input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10"
              maxLength={160}
            />
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="c-comment" className="text-xs">
            Comment *
          </Label>
          <Textarea
            id="c-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts…"
            className="min-h-24 resize-none"
            maxLength={2000}
          />
          <p className="text-right text-[11px] text-muted-foreground">
            {comment.length}/2000
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Comments appear after approval.
          </p>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
