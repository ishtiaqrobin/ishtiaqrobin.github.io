"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  MoreHorizontal,
  Pencil,
  FolderKanban,
  Star,
  ArrowUpDown,
  Link as LinkIcon,
  Github,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import type { IProject } from "@/types";
import { deleteProjectAction } from "@/actions/project.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface ProjectTableProps {
  projects: IProject[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (project: IProject) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

export default function ProjectTable({
  projects,
  loading = false,
  searchQuery = "",
  onEdit,
  onDeleteSuccess,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  token,
}: ProjectTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    projectId: string | null;
    title: string;
  }>({
    open: false,
    projectId: null,
    title: "",
  });

  const confirmDelete = (project: IProject) => {
    setDeleting({
      open: true,
      projectId: project.id,
      title: project.title || "this project",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, projectId: null, title: "" });
  };

  const doDelete = async () => {
    if (!deleting.projectId) return;
    try {
      const result = await deleteProjectAction(deleting.projectId, token);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      cancelDelete();
      onDeleteSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <>
      <div className="bg-gray-100 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Sort</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="h-10 w-16 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-9 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-600"
                >
                  {searchQuery
                    ? "No projects found matching your search"
                    : "No projects found"}
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="align-middle">
                  <TableCell>
                    <div className="relative h-10 w-16 rounded-md border-2 border-border overflow-hidden bg-muted shrink-0">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FolderKanban className="h-4 w-4 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm truncate max-w-44">
                        {project.title}
                      </p>
                      {project.isFeatured && (
                        <Badge
                          variant="outline"
                          className="text-[9px] border-yellow-400 text-yellow-600 py-0"
                        >
                          <Star className="h-2.5 w-2.5 mr-1 fill-yellow-400" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {project.category?.name || "—"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Live"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold"
                    >
                      <ArrowUpDown className="h-2.5 w-2.5 mr-1" />
                      {project.sortOrder ?? 0}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={project.isPublished ? "default" : "secondary"}
                      className="inline-flex items-center gap-1 text-[10px]"
                    >
                      {project.isPublished ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {project.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(project)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(project)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          pageCount={projects.length}
          label="projects"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Project?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.title}&quot;
            </span>
            ? Thumbnail and all gallery images will be permanently removed from
            storage.
          </>
        }
      />
    </>
  );
}
