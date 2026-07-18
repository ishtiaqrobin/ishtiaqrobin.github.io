"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  MoreHorizontal,
  Pencil,
  ArrowUpDown,
  Trophy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import type { IAward } from "@/types/awards.type";
import { deleteAwardAction } from "@/actions/award.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface AwardsTableProps {
  awards: IAward[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (award: IAward) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

export function AwardsTable({
  awards,
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
}: AwardsTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    awardId: string | null;
    title: string;
  }>({
    open: false,
    awardId: null,
    title: "",
  });

  const confirmDelete = (award: IAward) => {
    setDeleting({
      open: true,
      awardId: award.id,
      title: award.title || "this award",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, awardId: null, title: "" });
  };

  const doDelete = async () => {
    if (!deleting.awardId) return;
    try {
      const result = await deleteAwardAction(deleting.awardId, token);
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
              <TableHead className="w-10"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Sort</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="h-9 w-9 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
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
            ) : awards.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-gray-600"
                >
                  {searchQuery
                    ? "No awards found matching your search"
                    : "No award records yet. Add your first award."}
                </TableCell>
              </TableRow>
            ) : (
              awards.map((item) => (
                <TableRow key={item.id} className="align-middle">
                  <TableCell>
                    <div className="h-9 w-9 rounded-full border-2 bg-primary/10 flex items-center justify-center shrink-0">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium max-w-[180px]">
                    <p className="truncate">{item.title}</p>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground max-w-[160px]">
                    <span className="truncate block">{item.subTitle}</span>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold"
                    >
                      <ArrowUpDown className="h-2.5 w-2.5 mr-1" />
                      {item.sortOrder ?? 0}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={item.isPublished ? "default" : "secondary"}
                      className="inline-flex items-center gap-1 text-[10px]"
                    >
                      {item.isPublished ? "Published" : "Draft"}
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
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(item)}
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
          pageCount={awards.length}
          label="awards"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Award?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.title}&quot;
            </span>
            ?
          </>
        }
      />
    </>
  );
}
