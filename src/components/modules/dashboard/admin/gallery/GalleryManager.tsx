"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowUpDown,
  Check,
  Images,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createGalleryAction,
  updateGalleryAction,
  deleteGalleryAction,
} from "@/actions/gallery.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import { IGallery } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryManagerProps {
  galleries: IGallery[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── Field Label ──────────────────────────────────────────────────────────────
function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
    >
      {children}
    </Label>
  );
}

// ─── Gallery Form ─────────────────────────────────────────────────────────────
function GalleryForm({
  item,
  fileRef,
  handleFileChange,
  isCompressing,
  preview,
  isPublished,
  onPublishedChange,
}: {
  item: IGallery | null;
  fileRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompressing: boolean;
  preview: string | null;
  isPublished: boolean;
  onPublishedChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="image">Image File {!item && "*"}</FieldLabel>

        {/* Preview */}
        {(preview || item?.image) && (
          <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted">
            <Image
              src={preview || item!.image}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        <Input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileChange}
          disabled={isCompressing}
          className="rounded-xl h-10 cursor-pointer"
        />
        {isCompressing ? (
          <p className="text-[11px] text-primary flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Compressing image…
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Max 5MB · Auto-compressed to WebP · JPEG, PNG, GIF supported
          </p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title || ""}
          placeholder="Artwork or project title..."
          className="rounded-xl h-10"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          placeholder="Brief details about this piece..."
          className="rounded-xl resize-none"
          rows={3}
        />
      </div>

      {/* Sort Order */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
        <Input
          id="sortOrder"
          type="number"
          name="sortOrder"
          defaultValue={item?.sortOrder ?? 0}
          min={0}
          className="rounded-xl h-10"
        />
      </div>

      {/* Published */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
        <Label
          htmlFor="isPublish"
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Check className="h-4 w-4 text-green-500" />
          Publish Publicly
        </Label>
        <Switch
          id="isPublish"
          checked={isPublished}
          onCheckedChange={onPublishedChange}
        />
      </div>
    </div>
  );
}

// ─── Main Manager ─────────────────────────────────────────────────────────────
export function GalleryManager({
  galleries,
  token,
  onRefresh,
  isLoading = false,
}: GalleryManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IGallery | null>(null);
  const [selectedItem, setSelectedItem] = useState<IGallery | null>(null);

  // Controlled publish state (Switch needs controlled value)
  const [isPublished, setIsPublished] = useState(true);

  const {
    file: compressedFile,
    preview,
    isCompressing,
    handleFileChange,
    reset: resetImage,
    inputRef: fileRef,
  } = useImageUpload({ maxSizeMB: 5 });

  // ── Build FormData — individual fields for multer ─────────────────
  // NOTE: Backend validation uses `isPublish` (interface field name)
  //       but Prisma model & response use `isPublished`.
  //       We send `isPublish` on submit to match backend validation.
  const buildFormData = (
    form: HTMLFormElement,
    file: File | null,
    published: boolean,
  ) => {
    const fd = new FormData(form);
    const out = new FormData();

    const title = (fd.get("title") as string)?.trim();
    const description = (fd.get("description") as string)?.trim();
    const sortOrder = fd.get("sortOrder") as string;

    if (title) out.append("title", title);
    if (description) out.append("description", description);
    if (sortOrder) out.append("sortOrder", sortOrder);

    // ✅ Backend validation field name: isPublish
    out.append("isPublish", String(published));

    if (file) out.append("image", file);

    return out;
  };

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!compressedFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    setLoading(true);
    const result = await createGalleryAction(
      buildFormData(e.currentTarget, compressedFile, isPublished),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setCreateDialog(false);
      resetImage();
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Edit ──────────────────────────────────────────────────────────
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;

    setLoading(true);
    const result = await updateGalleryAction(
      selectedItem.id,
      buildFormData(e.currentTarget, compressedFile, isPublished),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setEditDialog(false);
      setSelectedItem(null);
      resetImage();
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    const result = await deleteGalleryAction(deleteConfirm.id, token);
    if (result.success) {
      toast.success(result.message);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const openCreate = () => {
    resetImage();
    setIsPublished(true);
    setCreateDialog(true);
  };

  const openEdit = (item: IGallery) => {
    setSelectedItem(item);
    resetImage();
    setIsPublished(item.isPublished);
    setEditDialog(true);
  };

  // ── Skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  // ── Stats ─────────────────────────────────────────────────────────
  const publishedCount = galleries.filter((g) => g.isPublished).length;
  const draftCount = galleries.length - publishedCount;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Images",
            value: galleries.length,
            icon: <Images className="h-4 w-4 text-primary" />,
          },
          {
            label: "Published",
            value: publishedCount,
            icon: <Eye className="h-4 w-4 text-green-500" />,
          },
          {
            label: "Draft",
            value: draftCount,
            icon: <EyeOff className="h-4 w-4 text-muted-foreground" />,
          },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Portfolio Gallery
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {galleries.length} total · {publishedCount} published
            </p>
          </div>
          <Button size="sm" onClick={openCreate} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {galleries.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="h-12 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title || "Gallery item"}
                          width={64}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell className="font-medium">
                      <p className="truncate max-w-[160px]">
                        {item.title || (
                          <span className="text-muted-foreground italic text-sm">
                            Untitled
                          </span>
                        )}
                      </p>
                    </TableCell>

                    {/* Description */}
                    <TableCell className="text-sm text-muted-foreground">
                      <p className="truncate max-w-[220px]">
                        {item.description || "—"}
                      </p>
                    </TableCell>

                    {/* Sort */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold"
                      >
                        <ArrowUpDown className="h-2.5 w-2.5 mr-1" />
                        {item.sortOrder ?? 0}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={item.isPublished ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
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
                          <DropdownMenuItem onClick={() => openEdit(item)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(item)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {galleries.length === 0 && (
            <div className="text-center py-16">
              <Images className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No gallery images yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Upload your first image to build your gallery
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={openCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Create Dialog ─────────────────────────────────────────── */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                Upload a new image to your portfolio gallery
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <GalleryForm
                item={null}
                fileRef={fileRef as React.RefObject<HTMLInputElement>}
                handleFileChange={handleFileChange}
                isCompressing={isCompressing}
                preview={preview}
                isPublished={isPublished}
                onPublishedChange={setIsPublished}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialog(false)}
                disabled={loading || isCompressing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || isCompressing}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit Gallery Item</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.title || "this image"}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <GalleryForm
                item={selectedItem}
                fileRef={fileRef as React.RefObject<HTMLInputElement>}
                handleFileChange={handleFileChange}
                isCompressing={isCompressing}
                preview={preview}
                isPublished={isPublished}
                onPublishedChange={setIsPublished}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialog(false)}
                disabled={loading || isCompressing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || isCompressing}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ─────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Gallery Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.title || "this image"}
              </span>
              ? The image will be permanently removed from storage.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              //   variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
