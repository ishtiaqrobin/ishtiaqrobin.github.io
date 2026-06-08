"use client";

import { useState } from "react";
import CommentTable from "./CommentTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RefreshCcw, Filter } from "lucide-react";
import { toast } from "sonner";
import { BlogComment } from "@/types";
import {
  approveCommentAction,
  deleteCommentAction,
} from "@/actions/blog.action";

type Props = {
  initialComments: BlogComment[];
  token: string;
};

export default function CommentClient({ initialComments, token }: Props) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [search, setSearch] = useState("");
  const [approvalFilter, setApprovalFilter] = useState<string>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  // Token is passed from the server — no client-side session call needed.
  // If token is missing, the action itself will fail gracefully.
  const handleRefresh = async () => {
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return;
    }
    setRefreshing(true);
    // Re-fetch by triggering a full page reload to let the server
    // re-run blogService.getComments() and pass fresh data.
    // This keeps all data fetching on the server side.
    window.location.reload();
  };

  const handleApprove = async (id: string) => {
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return;
    }
    const res = await approveCommentAction(id, token);
    if (res.success) {
      toast.success(res.message);
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isApproved: true } : c)),
      );
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return;
    }
    const res = await deleteCommentAction(id, token);
    if (res.success) {
      toast.success(res.message);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } else {
      toast.error(res.message);
    }
  };

  const filteredComments = comments.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.comment.toLowerCase().includes(search.toLowerCase());
    const matchApproval =
      approvalFilter === "ALL" ||
      (approvalFilter === "APPROVED" && c.isApproved) ||
      (approvalFilter === "PENDING" && !c.isApproved);
    return matchSearch && matchApproval;
  });

  const stats = {
    total: comments.length,
    pending: comments.filter((c) => !c.isApproved).length,
    approved: comments.filter((c) => c.isApproved).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Comment Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and moderate blog comments
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-muted" },
          {
            label: "Pending",
            value: stats.pending,
            color:
              stats.pending > 0
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-muted",
          },
          {
            label: "Approved",
            value: stats.approved,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-lg border px-4 py-3 ${s.color}`}
          >
            <p className="text-xs font-medium opacity-70">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={approvalFilter} onValueChange={setApprovalFilter}>
          <SelectTrigger className="w-full sm:w-44 min-h-11">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="ALL">All Comments</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredComments.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{comments.length}</span>{" "}
          comments
        </p>
        {(search || approvalFilter !== "ALL") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setApprovalFilter("ALL");
            }}
            className="text-xs border h-5 p-2 rounded-sm"
          >
            Clear filters
          </Button>
        )}
      </div>

      <CommentTable
        comments={filteredComments}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />
    </div>
  );
}
