"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Loader2, Check } from "lucide-react";
import type { Category, CategoryPayload } from "@/types/category.type";
import { categoryService } from "@/services/category.service";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  mode: "add" | "edit";
  onSuccess?: () => void;
  token: string;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  mode,
  onSuccess,
  token,
}: CategoryDialogProps) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && category) {
        setName(category.name || "");
        setSortOrder(category.sortOrder ?? 0);
        setIsPublished(Boolean(category.isPublished));
      } else {
        setName("");
        setSortOrder(0);
        setIsPublished(true);
      }
    }
  }, [open, mode, category]);

  const handleClose = () => {
    setName("");
    setSortOrder(0);
    setIsPublished(true);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(
      mode === "add" ? "Creating category..." : "Updating category...",
    );

    try {
      const payload: CategoryPayload = {
        name: trimmed,
        sortOrder,
        isPublished,
      };

      if (mode === "add") {
        const { error } = await categoryService.createCategory(token, payload);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Category created successfully", { id: toastId });
      } else if (mode === "edit" && category?.id) {
        const { error } = await categoryService.updateCategory(
          token,
          category.id,
          payload,
        );
        if (error) {
          toast.error(error.message, { id: toastId });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the category details."
              : "Create a new category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
            >
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-10 bg-white"
              placeholder="Enter category name"
            />
          </div>

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
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="rounded-xl h-10 bg-white"
              placeholder="0"
            />
          </div>

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
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
