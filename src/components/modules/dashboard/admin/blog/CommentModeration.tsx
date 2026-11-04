"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, Trash2, MessageSquare } from "lucide-react";
import type { IBlogComment } from "@/types/blog.type";
import {
  approveBlogCommentAction,
  deleteBlogCommentAction,
} from "@/actions/blog.action";

interface CommentModerationProps {
  comments: IBlogComment[];
  loading: boolean;
  token: string;
  onChanged: () => void;
}

export default function CommentModeration({
  comments,
  loading,
  token,
  onChanged,
}: CommentModerationProps) {
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleApprove = async (id: string, isApproved: boolean) => {
    setBusyId(id);
    const result = await approveBlogCommentAction(id, isApproved, token);
    if (result.success) {
      toast.success(result.message);
      onChanged();
    } else {
      toast.error(result.message);
    }
    setBusyId(null);
  };

  const handleDelete = async (id: string) => {
    setBusyId(id);
    const result = await deleteBlogCommentAction(id, token);
    if (result.success) {
      toast.success(result.message);
      onChanged();
    } else {
      toast.error(result.message);
    }
    setBusyId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-md border bg-white py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-md border bg-white p-12 text-center">
        <MessageSquare className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div
          key={c.id}
          className="rounded-lg border bg-white p-4 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {c.email}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase ${
                    c.isApproved
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {c.isApproved ? "Approved" : "Pending"}
                </Badge>
                {c.parentId && (
                  <Badge variant="outline" className="text-[10px]">
                    Reply
                  </Badge>
                )}
              </div>

              {c.blog && (
                <p className="mt-1 text-xs text-muted-foreground">
                  on{" "}
                  <a
                    href={`/blogs/${c.blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    {c.blog.title}
                  </a>
                </p>
              )}

              <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/90">
                {c.comment}
              </p>

              <p className="mt-2 text-[11px] text-muted-foreground/60">
                {new Date(c.createdAt).toLocaleString()}
                {c.ipAddress ? ` · ${c.ipAddress}` : ""}
              </p>
            </div>

            <div className="flex shrink-0 gap-1">
              {c.isApproved ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApprove(c.id, false)}
                  disabled={busyId === c.id}
                  title="Unapprove"
                >
                  {busyId === c.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleApprove(c.id, true)}
                  disabled={busyId === c.id}
                  title="Approve"
                >
                  {busyId === c.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(c.id)}
                disabled={busyId === c.id}
                className="text-destructive hover:bg-destructive/10"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
