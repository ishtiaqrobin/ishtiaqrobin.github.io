"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Star,
  Pin,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import type { IBlog } from "@/types/blog.type";
import { deleteBlogAction } from "@/actions/blog.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface BlogTableProps {
  blogs: IBlog[];
  loading?: boolean;
  onEdit: (blog: IBlog) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  DRAFT: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  ARCHIVED: "bg-muted text-muted-foreground border-border",
};

export default function BlogTable({
  blogs,
  loading = false,
  onEdit,
  onDeleteSuccess,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  token,
}: BlogTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    id: string | null;
    title: string;
  }>({ open: false, id: null, title: "" });

  const confirmDelete = (blog: IBlog) =>
    setDeleting({ open: true, id: blog.id, title: blog.title });

  const cancelDelete = () =>
    setDeleting({ open: false, id: null, title: "" });

  const doDelete = async () => {
    if (!deleting.id) return;
    const result = await deleteBlogAction(deleting.id, token);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    cancelDelete();
    onDeleteSuccess?.();
  };

  if (loading) {
    return (
      <div className="rounded-md border bg-white p-8 text-center text-sm text-muted-foreground">
        Loading posts…
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="rounded-md border bg-white p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No blog posts yet. Create your first one!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Views</TableHead>
              <TableHead className="text-center">Likes</TableHead>
              <TableHead className="text-center">Comments</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <div className="relative h-10 w-14 overflow-hidden rounded border bg-muted">
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.coverImageAlt || blog.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="max-w-65">
                  <div className="flex items-center gap-1.5">
                    {blog.isPinned && (
                      <Pin className="h-3 w-3 shrink-0 text-primary" />
                    )}
                    {blog.isFeatured && (
                      <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
                    )}
                    <span className="truncate font-medium">{blog.title}</span>
                  </div>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    /{blog.slug}
                  </p>
                </TableCell>

                <TableCell>
                  <div className="flex max-w-40 flex-wrap gap-1">
                    {blog.tags?.slice(0, 2).map((t) => (
                      <Badge
                        key={t.id}
                        variant="outline"
                        className="text-[10px] font-normal"
                      >
                        {t.name}
                      </Badge>
                    ))}
                    {(blog.tags?.length ?? 0) > 2 && (
                      <Badge variant="outline" className="text-[10px]">
                        +{(blog.tags?.length ?? 0) - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase tracking-wide ${
                      STATUS_STYLES[blog.status] ?? ""
                    }`}
                  >
                    {blog.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-center text-sm tabular-nums">
                  {blog.viewCount}
                </TableCell>
                <TableCell className="text-center text-sm tabular-nums">
                  {blog.likeCount}
                </TableCell>
                <TableCell className="text-center text-sm tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-muted-foreground" />
                    {blog._count?.comments ?? 0}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(blog)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View live
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => confirmDelete(blog)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          pageCount={blogs.length}
          label="posts"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete blog post?"
        description={
          <>
            <strong>{deleting.title}</strong> will be permanently deleted, along
            with its comments. This cannot be undone.
          </>
        }
      />
    </>
  );
}
