"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, X, Star, StarOff } from "lucide-react";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/validations/category.validation";
import type { ICategory } from "@/types/category.type";
import { useCategories } from "@/hooks/useCategories";
import { useImageUpload } from "@/hooks/useImageUpload";
import { buildCategoryFormData } from "@/services/category.service";
import { createCategory, updateCategory } from "@/actions/category.action";

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ICategory | null;
  mode: "add" | "edit";
  onSuccess?: () => void;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  mode,
  onSuccess,
}: CategoryDialogProps) {
  const { categories } = useCategories();
  const [saving, setSaving] = useState(false);
  const [parentId, setParentId] = useState("_none");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<CategoryFormValues>({
    // Explicit cast: zodResolver's inferred input/output types can drift
    // from `CategoryFormValues` when the schema has optional/default
    // fields, which breaks handleSubmit's generic inference. Casting to
    // Resolver<CategoryFormValues> pins it to the type we actually use.
    resolver: zodResolver(categoryFormSchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: "",
      slug: "",
      sortOrder: 0,
      isPopular: false,
      isActive: true,
    },
  });

  const {
    file: imageFile,
    preview: imagePreview,
    isCompressing,
    handleFileChange,
    reset: resetImage,
    inputRef,
  } = useImageUpload({});

  const nameVal = watch("name");
  const isActive = watch("isActive");
  const isPopular = watch("isPopular");
  const sortOrder = watch("sortOrder");

  // Auto-generate slug from name in add mode
  useEffect(() => {
    if (mode === "add" && !dirtyFields.slug) {
      setValue("slug", generateSlug(nameVal || ""), { shouldValidate: false });
    }
  }, [nameVal, mode, dirtyFields.slug, setValue]);

  // Sync form when dialog opens or category changes
  useEffect(() => {
    if (open) {
      if (mode === "edit" && category) {
        reset({
          name: category.name || "",
          slug: category.slug || "",
          sortOrder: category.sortOrder ?? 0,
          isPopular: Boolean(category.isPopular),
          isActive: Boolean(category.isActive),
        });
        setParentId(category.parentId || "_none");
        resetImage();
      } else if (mode === "add") {
        reset({
          name: "",
          slug: "",
          sortOrder: 0,
          isPopular: false,
          isActive: true,
        });
        setParentId("_none");
        resetImage();
      }
    }
  }, [open, mode, category, reset, resetImage]);

  const handleClose = () => {
    resetImage();
    reset();
    onOpenChange(false);
  };

  const onSubmit = async (values: CategoryFormValues) => {
    setSaving(true);
    const toastId = toast.loading(
      mode === "add" ? "Creating category..." : "Updating category...",
    );

    try {
      const fd = buildCategoryFormData({
        image: imageFile || undefined,
        slug: values.slug,
        name: values.name.trim(),
        parentId: parentId === "_none" ? null : parentId,
        sortOrder: values.sortOrder ?? 0,
        isPopular: values.isPopular ?? false,
        isActive: values.isActive ?? true,
      });

      if (mode === "add") {
        const res = await createCategory(fd);
        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }
        toast.success("Category created successfully", { id: toastId });
      } else if (mode === "edit" && category?.id) {
        const res = await updateCategory(category.id, fd);
        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }
        toast.success("Category updated successfully", { id: toastId });
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed", {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const isEdit = mode === "edit";
  const displayPreview = imagePreview || (isEdit && category?.imageUrl) || null;

  // Only ROOT-level (Main) categories can be chosen as a parent.
  const parentOptions = categories.filter((c) => {
    if (c.parentId !== null) return false;
    if (category && c.id === category.id) return false;
    return true;
  });

  const currentCategoryHasChildren =
    isEdit && categories.some((c) => c.parentId === category?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the category details." : "Create a new category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label
              htmlFor="image"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Image {!isEdit ? "" : "(leave empty to keep current)"}
            </Label>

            {displayPreview ? (
              <div className="relative h-40 rounded-xl overflow-hidden border">
                <Image
                  src={displayPreview}
                  alt="Category preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    resetImage();
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/10">
                <div className="text-center text-muted-foreground">
                  <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No image selected</p>
                </div>
              </div>
            )}

            <input
              ref={inputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isCompressing}
              onClick={() => inputRef.current?.click()}
              className="w-full mt-1"
            >
              {isCompressing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {displayPreview ? "Change Image" : "Select Image"}
                </>
              )}
            </Button>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="rounded-xl h-10 bg-white"
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <Label
              htmlFor="slug"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              {...register("slug")}
              className="rounded-xl h-10 bg-white font-mono text-sm"
              placeholder="category-slug"
            />
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-1.5">
            <Label
              htmlFor="parentId"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Parent Category (optional)
            </Label>
            <Select
              value={parentId}
              onValueChange={setParentId}
              disabled={currentCategoryHasChildren}
            >
              <SelectTrigger id="parentId" className="rounded-xl h-10">
                <SelectValue placeholder="No parent (main category)" />
              </SelectTrigger>
              <SelectContent className="rounded-xl" position="popper">
                <SelectItem value="_none">No parent (main category)</SelectItem>
                {parentOptions.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentCategoryHasChildren && (
              <p className="text-xs text-muted-foreground">
                This category already has sub-categories under it, so it
                can&apos;t be moved under another category.
              </p>
            )}
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5">
            <Label
              htmlFor="sortOrder"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Sort Order
            </Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              value={sortOrder}
              onChange={(e) =>
                setValue("sortOrder", parseInt(e.target.value) || 0)
              }
              placeholder="0"
              className="rounded-xl h-10"
            />
          </div>

          {/* isPopular */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <Label
              htmlFor="isPopular"
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              {isPopular ? (
                <Star className="h-4 w-4 text-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4 text-muted-foreground" />
              )}
              Popular
            </Label>
            <Switch
              id="isPopular"
              checked={isPopular}
              onCheckedChange={(checked) => setValue("isPopular", checked)}
            />
          </div>

          {/* isActive */}
          {isEdit && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <Label
                htmlFor="isActive"
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <span
                  className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`}
                />
                Active
              </Label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving || isCompressing}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
