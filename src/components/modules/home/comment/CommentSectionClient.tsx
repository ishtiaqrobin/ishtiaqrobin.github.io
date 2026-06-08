"use client";

import { useState } from "react";
import { BlogComment, CreateBlogCommentInput } from "@/types";
import { createCommentAction } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Reply,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  comment: z.string().min(2, "Comment is required").max(1000),
});
type CommentForm = z.infer<typeof commentSchema>;

// ── Single comment ─────────────────────────────────────────

function CommentItem({
  comment,
  blogId,
  depth = 0,
}: {
  comment: BlogComment;
  blogId: string;
  depth?: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentForm>({ resolver: zodResolver(commentSchema) });

  const onReply = async (data: CommentForm) => {
    setSubmitting(true);
    const res = await createCommentAction({
      ...data,
      blogId,
      parentId: comment.id,
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
      setShowReply(false);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className={cn("flex gap-3", depth > 0 && "ml-8 mt-3")}>
      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <User className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{comment.name}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {format(new Date(comment.createdAt), "MMM d, yyyy")}
          </span>
        </div>
        <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
          {comment.comment}
        </p>

        {depth === 0 && (
          <button
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1.5 transition-colors"
            onClick={() => setShowReply(!showReply)}
          >
            <Reply className="h-3 w-3" />
            Reply
          </button>
        )}

        {showReply && (
          <form
            onSubmit={handleSubmit(onReply)}
            className="mt-3 space-y-2 p-3 border rounded-lg bg-muted/20"
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  placeholder="Name *"
                  {...register("name")}
                  className="h-8 text-sm"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-0.5">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Email *"
                  type="email"
                  {...register("email")}
                  className="h-8 text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-0.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <Textarea
              placeholder="Write a reply..."
              rows={2}
              {...register("comment")}
              className="text-sm resize-none"
            />
            {errors.comment && (
              <p className="text-xs text-destructive">
                {errors.comment.message}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                className="h-7 rounded-md text-xs"
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                )}
                Submit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 rounded-md text-xs"
                onClick={() => setShowReply(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {submitted && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="h-3 w-3" />
            Reply submitted, pending approval
          </p>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l-2 border-muted pl-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                blogId={blogId}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main comment section ───────────────────────────────────

type Props = {
  blogId: string;
  initialComments: BlogComment[];
};

export default function CommentSectionClient({
  blogId,
  initialComments,
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>({ resolver: zodResolver(commentSchema) });

  const onSubmit = async (data: CommentForm) => {
    const res = await createCommentAction({ ...data, blogId });
    if (res.success) {
      setSubmitted(true);
      reset();
      toast.success("Comment submitted! It'll appear after approval.");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-bold">
          {initialComments.length} Comment
          {initialComments.length !== 1 ? "s" : ""}
        </h2>
      </div>

      {/* Comments list */}
      {initialComments.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-5">
          {initialComments.map((c) => (
            <div key={c.id}>
              <CommentItem comment={c} blogId={blogId} />
              <Separator className="mt-5" />
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <div className="border rounded-xl p-6 bg-muted/10">
        <h3 className="font-semibold mb-4">Leave a Comment</h3>

        {submitted ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 py-4">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">
              Your comment has been submitted and is awaiting approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email <span className="text-destructive">*</span>
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (won&#39;t be published)
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="comment" className="text-sm">
                Comment <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts..."
                rows={4}
                {...register("comment")}
                className={errors.comment ? "border-destructive" : ""}
              />
              {errors.comment && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.comment.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                size="xs"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Post Comment"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Comments are moderated and will appear after approval.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
