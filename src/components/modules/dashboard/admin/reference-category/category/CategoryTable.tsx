"use client";

import Image from "next/image";
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
  Loader2,
  MoreHorizontal,
  Pencil,
  Star,
  StarOff,
  ImageIcon,
  Layers,
  CornerDownRight,
  Lock,
} from "lucide-react";
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

import type { ICategory } from "@/types/category.type";
import { updateCategory, deleteCategory } from "@/actions/category.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface CategoryTableProps {
  categories: ICategory[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (category: ICategory) => void;
  onDeleteSuccess?: () => void;
  // pagination
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function CategoryTable({
  categories,
  loading = false,
  searchQuery = "",
  onEdit,
  onDeleteSuccess,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: CategoryTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    categoryId: string | null;
    name: string;
  }>({
    open: false,
    categoryId: null,
    name: "",
  });

  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggleStatus = async (category: ICategory) => {
    setTogglingId(category.id);
    try {
      const fd = new FormData();
      fd.append("isActive", String(!category.isActive));
      const res = await updateCategory(category.id, fd);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(
        `Category marked as ${!category.isActive ? "Active" : "Inactive"}`,
      );
      onDeleteSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Toggle failed");
    } finally {
      setTogglingId(null);
    }
  };

  // A category can only be deleted once it has no sub-categories and no
  // products left under it — mirrors the backend block in
  // category.service.ts's deleteCategory().
  const getBlockReason = (category: ICategory): string | null => {
    const childCount = category._count?.children ?? 0;
    const productCount = category._count?.products ?? 0;
    if (childCount > 0 && productCount > 0) {
      return `${childCount} sub-categor${childCount === 1 ? "y" : "ies"} and ${productCount} product${productCount === 1 ? "" : "s"} depend on this`;
    }
    if (childCount > 0) {
      return `${childCount} sub-categor${childCount === 1 ? "y" : "ies"} depend on this`;
    }
    if (productCount > 0) {
      return `${productCount} product${productCount === 1 ? "" : "s"} depend on this`;
    }
    return null;
  };

  const confirmDelete = (category: ICategory) => {
    const blockReason = getBlockReason(category);
    if (blockReason) {
      toast.error(
        `Can't delete "${category.name || category.slug}" — ${blockReason}. Reassign or remove them first.`,
      );
      return;
    }
    setDeleting({
      open: true,
      categoryId: category.id,
      name: category.name || category.slug || "this category",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, categoryId: null, name: "" });
  };

  const doDelete = async () => {
    if (!deleting.categoryId) return;
    try {
      const res = await deleteCategory(deleting.categoryId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Category deleted successfully");
      cancelDelete();
      onDeleteSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  const categoryName = (cat: ICategory) => cat.name || cat.slug || "—";

  return (
    <>
      <div className="bg-gray-100 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="w-10 h-10 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-9 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-600"
                >
                  {searchQuery
                    ? "No categories found matching your search"
                    : "No categories found"}
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => {
                const isSub = Boolean(category.parentId);
                const blockReason = getBlockReason(category);
                const isDeletable = blockReason === null;

                return (
                  <TableRow key={category.id} className="align-middle">
                    {/* Image */}
                    <TableCell>
                      {category.imageUrl ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                          <Image
                            src={category.imageUrl}
                            alt={categoryName(category)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>

                    {/* Name */}
                    <TableCell>
                      <span
                        className={`font-medium ${isSub ? "pl-4 inline-flex items-center gap-1.5" : ""}`}
                      >
                        {isSub && (
                          <CornerDownRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        )}
                        {categoryName(category)}
                      </span>
                    </TableCell>

                    {/* Type: Main vs Sub */}
                    <TableCell>
                      {isSub ? (
                        <Badge
                          variant="outline"
                          className="text-xs font-normal text-muted-foreground"
                        >
                          Sub of: {category.parent?.name ?? "—"}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="text-xs inline-flex items-center gap-1"
                        >
                          <Layers className="h-3 w-3" />
                          Main
                        </Badge>
                      )}
                    </TableCell>

                    {/* Slug */}
                    <TableCell>
                      <span className="text-gray-700 text-sm font-mono">
                        {category.slug || "—"}
                      </span>
                    </TableCell>

                    {/* Sort Order */}
                    <TableCell>
                      <span className="text-sm">{category.sortOrder}</span>
                    </TableCell>

                    {/* isPopular */}
                    <TableCell>
                      {category.isPopular ? (
                        <Star className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <button
                        onClick={() => handleToggleStatus(category)}
                        disabled={togglingId === category.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                          category.isActive
                            ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 border border-green-200 hover:border-red-200"
                            : "bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700 border border-red-200 hover:border-green-200"
                        }`}
                      >
                        {togglingId === category.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              category.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                        )}
                        {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </TableCell>

                    {/* Action Dropdown */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Dependency count hint — shown right next to the
                            action menu so it's visible without opening it */}
                        {!isDeletable && (
                          <span
                            title={blockReason ?? undefined}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded-full"
                          >
                            <Lock className="h-3 w-3" />
                            {blockReason}
                          </span>
                        )}

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
                            <DropdownMenuItem onClick={() => onEdit(category)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => confirmDelete(category)}
                              disabled={!isDeletable}
                              className="text-red-600 focus:text-red-600 data-[disabled]:text-muted-foreground"
                              title={blockReason ?? undefined}
                            >
                              {isDeletable ? (
                                <Trash2 className="mr-2 h-4 w-4" />
                              ) : (
                                <Lock className="mr-2 h-4 w-4" />
                              )}
                              Delete
                              {!isDeletable && (
                                <span className="ml-auto text-[10px] text-muted-foreground">
                                  {(category._count?.children ?? 0) +
                                    (category._count?.products ?? 0)}
                                </span>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          pageCount={categories.length}
          label="categories"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Category?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete this category{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.name}&quot;
            </span>
            ? The associated Cloudinary image will also be removed.
          </>
        }
      />
    </>
  );
}
