/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RefObject, useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  FolderKanban,
  Loader2,
  Star,
  ArrowUpDown,
  Link as LinkIcon,
  Github,
  Check,
  Tags,
  ImagePlus,
  X,
  Eye,
  Edit,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/actions/project.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import { IProject } from "@/types";

interface ProjectManagerProps {
  projects: IProject[];
  categories: any[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

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

// ─── Project Images Multi-Upload Component ────────────────────────────────────
function ProjectImagesUpload({
  existingImages,
  onFilesChange,
}: {
  existingImages?: IProject["images"];
  onFilesChange: (files: File[]) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    onFilesChange(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const removePreview = (idx: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 rounded-xl border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors cursor-pointer bg-muted/20">
        <ImagePlus className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="flex-1">
          <Input
            id="projectImages"
            type="file"
            name="projectImages"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="border-none shadow-none p-0 h-auto text-sm cursor-pointer bg-transparent"
          />
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Max 10 images · Project screenshots/gallery
      </p>

      {/* New image previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((url, i) => (
            <div
              key={i}
              className="relative group aspect-video rounded-lg overflow-hidden border"
            >
              <Image
                src={url}
                alt={`preview-${i}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removePreview(i)}
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Existing images (edit mode) */}
      {existingImages && existingImages.length > 0 && previews.length === 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Current Images ({existingImages.length}) — Upload new to replace
          </p>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((img, i) => (
              <div
                key={img.id}
                className="relative aspect-video rounded-lg overflow-hidden border"
              >
                <Image
                  src={img.url}
                  alt={img.alt || `image-${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Project Form ─────────────────────────────────────────────────────────────
function ProjectForm({
  item,
  categories,
  thumbnailRef,
  handleThumbnailChange,
  isCompressing,
  onImagesChange,
}: {
  item: IProject | null;
  categories: any[];
  thumbnailRef: React.RefObject<HTMLInputElement>;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompressing: boolean;
  onImagesChange: (files: File[]) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Title */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="title">Project Title *</FieldLabel>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title || ""}
          placeholder="e.g. E-Commerce Dashboard"
          required
          className="rounded-xl h-10"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="categoryId">Category *</FieldLabel>
        <Select name="categoryId" defaultValue={item?.categoryId || ""}>
          <SelectTrigger id="categoryId" className="rounded-xl h-10">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      {/* Thumbnail */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="thumbnail">Thumbnail Image</FieldLabel>
        <Input
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept="image/*"
          ref={thumbnailRef}
          onChange={handleThumbnailChange}
          disabled={isCompressing}
          className="rounded-xl h-10 cursor-pointer"
        />
        {isCompressing ? (
          <p className="text-[11px] text-primary flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Compressing…
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Max 5MB · Auto-compressed to WebP
          </p>
        )}
        {item?.thumbnail && (
          <div className="flex items-center gap-2 mt-1">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={64}
              height={40}
              className="rounded-lg object-cover"
            />
            <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
              {item.thumbnail.split("/").pop()}
            </span>
          </div>
        )}
      </div>

      {/* Project Images (Gallery) */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="projectImages">Project Gallery Images</FieldLabel>
        <ProjectImagesUpload
          existingImages={item?.images}
          onFilesChange={onImagesChange}
        />
      </div>

      {/* Live URL */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="liveUrl"
            name="liveUrl"
            defaultValue={item?.liveUrl || ""}
            placeholder="https://..."
            className="rounded-xl h-10 pl-8"
          />
        </div>
      </div>

      {/* GitHub URL */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="githubUrl">GitHub URL</FieldLabel>
        <div className="relative">
          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="githubUrl"
            name="githubUrl"
            defaultValue={item?.githubUrl || ""}
            placeholder="https://github.com/..."
            className="rounded-xl h-10 pl-8"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
        <div className="relative">
          <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="tags"
            name="tags"
            defaultValue={item?.tags.join(", ") || ""}
            placeholder="React, Next.js, Tailwind CSS"
            className="rounded-xl h-10 pl-8"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description">Description *</FieldLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          placeholder="Describe the project..."
          required
          className="rounded-xl resize-none"
          rows={4}
        />
      </div>

      {/* Featured toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
        <Label
          htmlFor="isFeatured"
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Star className="h-4 w-4 text-yellow-500" />
          Featured
        </Label>
        <Switch
          id="isFeatured"
          name="isFeatured"
          defaultChecked={item?.isFeatured || false}
        />
      </div>

      {/* Published toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
        <Label
          htmlFor="isPublished"
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Check className="h-4 w-4 text-green-500" />
          Published
        </Label>
        <Switch
          id="isPublished"
          name="isPublished"
          defaultChecked={item ? item.isPublished : true}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProjectManager({
  projects,
  categories,
  token,
  onRefresh,
  isLoading = false,
}: ProjectManagerProps) {
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IProject | null>(null);
  const [selectedItem, setSelectedItem] = useState<IProject | null>(null);

  // Thumbnail
  const {
    file: thumbnailFile,
    isCompressing,
    handleFileChange: handleThumbnailChange,
    reset: resetThumbnail,
    inputRef: thumbnailRef,
  } = useImageUpload({ maxSizeMB: 5 });

  // Project gallery images (raw Files — no compression needed, backend handles)
  const [projectImageFiles, setProjectImageFiles] = useState<File[]>([]);

  const resetAll = () => {
    resetThumbnail();
    setProjectImageFiles([]);
  };

  // ─── Build FormData ────────────────────────────────────────────
  const buildFormData = (
    form: HTMLFormElement,
    thumbFile: File | null,
    imageFiles: File[],
  ) => {
    const fd = new FormData(form);
    const out = new FormData();

    out.append("title", fd.get("title") as string);
    out.append("description", fd.get("description") as string);
    out.append("categoryId", fd.get("categoryId") as string);

    const liveUrl = fd.get("liveUrl") as string;
    const githubUrl = fd.get("githubUrl") as string;
    const sortOrder = fd.get("sortOrder") as string;
    if (liveUrl) out.append("liveUrl", liveUrl);
    if (githubUrl) out.append("githubUrl", githubUrl);
    if (sortOrder) out.append("sortOrder", sortOrder);

    const tagsRaw = fd.get("tags") as string;
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    out.append("tags", JSON.stringify(tags));

    out.append("isFeatured", String(fd.get("isFeatured") === "on"));
    out.append("isPublished", String(fd.get("isPublished") === "on"));

    // Thumbnail (single)
    if (thumbFile) out.append("thumbnail", thumbFile);

    // Gallery images (multiple) — field name must be "images" to match multer config
    imageFiles.forEach((file) => out.append("images", file));

    return out;
  };

  // ─── Handlers ─────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createProjectAction(
      buildFormData(e.currentTarget, thumbnailFile, projectImageFiles),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setCreateDialog(false);
      resetAll();
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);
    const result = await updateProjectAction(
      selectedItem.id,
      buildFormData(e.currentTarget, thumbnailFile, projectImageFiles),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setEditDialog(false);
      setSelectedItem(null);
      resetAll();
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    const result = await deleteProjectAction(deleteConfirm.id, token);
    if (result.success) {
      toast.success(result.message);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ─── Loading skeleton ──────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  const publishedCount = projects.filter((p) => p.isPublished).length;
  const featuredCount = projects.filter((p) => p.isFeatured).length;
  const draftCount = projects.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: projects.length,
            color: "text-foreground",
            icon: <FolderKanban className="h-4 w-4 text-primary" />,
          },
          {
            label: "Published",
            value: publishedCount,
            color: "text-green-600",
            icon: <Eye className="h-4 w-4 text-green-600" />,
          },
          {
            label: "Drafts",
            value: draftCount,
            color: "text-yellow-600",
            icon: <Edit className="h-4 w-4 text-yellow-600" />,
          },
          {
            label: "Featured",
            value: featuredCount,
            color: "text-primary",
            icon: <Star className="h-4 w-4 text-muted-foreground" />,
          },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className={`text-xl font-bold leading-none ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-primary" />
              All Projects
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} total · {publishedCount} published
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              resetAll();
              setCreateDialog(true);
            }}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>

        <CardContent className="px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Thumb</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b last:border-0"
                  >
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="relative h-10 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
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

                    {/* Title */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="font-semibold text-sm truncate max-w-[180px]">
                          {item.title}
                        </p>
                        {item.isFeatured && (
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

                    {/* Category */}
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category?.name || "—"}
                      </Badge>
                    </TableCell>

                    {/* Gallery image count */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ImagePlus className="h-3.5 w-3.5" />
                        <span>{item.images?.length ?? 0}</span>
                      </div>
                    </TableCell>

                    {/* Links */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Live"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        )}
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {!item.liveUrl && !item.githubUrl && (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Sort order */}
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item);
                              resetAll();
                              setEditDialog(true);
                            }}
                          >
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

          {projects.length === 0 && (
            <div className="text-center py-16">
              <FolderKanban className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No projects yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first project to showcase your portfolio
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Create Dialog ─────────────────────────────────────────── */}
      <Dialog
        open={createDialog}
        onOpenChange={(open) => {
          if (!open) resetAll();
          setCreateDialog(open);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ProjectForm
                item={null}
                categories={categories}
                thumbnailRef={thumbnailRef as RefObject<HTMLInputElement>}
                handleThumbnailChange={handleThumbnailChange}
                isCompressing={isCompressing}
                onImagesChange={setProjectImageFiles}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialog(false)}
                disabled={loading}
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedItem(null);
            resetAll();
          }
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.title}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ProjectForm
                item={selectedItem}
                categories={categories}
                thumbnailRef={thumbnailRef as RefObject<HTMLInputElement>}
                handleThumbnailChange={handleThumbnailChange}
                isCompressing={isCompressing}
                onImagesChange={setProjectImageFiles}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialog(false)}
                disabled={loading}
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

      {/* ── Delete Dialog ─────────────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.title}
              </span>
              ? Thumbnail and all gallery images will be permanently removed
              from storage.
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
              // variant="destructive"
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
