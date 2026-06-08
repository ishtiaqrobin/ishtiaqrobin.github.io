"use client";

import { useState } from "react";
import { BlogComment } from "@/types/blog.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  Trash2,
  MessageSquare,
  Reply,
  Clock,
  Mail,
  User,
} from "lucide-react";
import { format } from "date-fns";

type Props = {
  comments: BlogComment[];
  onApprove: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function CommentTable({ comments, onApprove, onDelete }: Props) {
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    await onApprove(id);
    setApprovingId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeletingId(deleteId);
    await onDelete(deleteId);
    setDeletingId(null);
    setDeleteId(null);
  };

  if (comments.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">No comments found</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead className="hidden xl:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment, idx) => (
              <TableRow
                key={comment.id}
                className={
                  !comment.isApproved
                    ? "bg-amber-500/5 hover:bg-amber-500/10"
                    : "group"
                }
              >
                <TableCell className="text-muted-foreground text-sm">
                  {idx + 1}
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium truncate max-w-[120px]">
                        {comment.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {comment.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm line-clamp-2 max-w-[280px]">
                    {comment.comment}
                  </p>
                  {comment.replies && comment.replies.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Reply className="h-3 w-3" />
                      {comment.replies.length} repl
                      {comment.replies.length === 1 ? "y" : "ies"}
                    </p>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {comment.isApproved ? (
                    <Badge
                      variant="outline"
                      className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    >
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 flex items-center gap-1 w-fit"
                    >
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {comment.parentId ? (
                      <span className="flex items-center gap-1">
                        <Reply className="h-3 w-3" /> Reply
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> Comment
                      </span>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="hidden xl:table-cell text-xs text-muted-foreground whitespace-nowrap">
                  {format(new Date(comment.createdAt), "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 justify-end">
                    {!comment.isApproved && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                            onClick={() => handleApprove(comment.id)}
                            disabled={approvingId === comment.id}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 ${approvingId === comment.id ? "animate-pulse" : ""}`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Approve</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(comment.id)}
                          disabled={deletingId === comment.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the comment and all its replies. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!!deletingId}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
