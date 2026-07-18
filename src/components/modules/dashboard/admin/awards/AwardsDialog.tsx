"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Loader2,
  Check,
  Trophy,
  ArrowUpDown,
  Calendar,
  User,
} from "lucide-react";

import type { IAward } from "@/types/awards.type";
import {
  createAwardAction,
  updateAwardAction,
} from "@/actions/award.action";

interface AwardsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  award?: IAward | null;
  mode: "add" | "edit";
  onSuccess?: () => void;
  token: string;
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

export function AwardsDialog({
  open,
  onOpenChange,
  award,
  mode,
  onSuccess,
  token,
}: AwardsDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const buildFormData = (): FormData => {
    const form = document.getElementById("award-form") as HTMLFormElement;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("title", fd.get("title") as string);
    out.append("subTitle", fd.get("subTitle") as string);
    out.append("date", fd.get("date") as string);

    const detailsRaw = (fd.get("details") as string) || "";
    const details = detailsRaw
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);
    out.append("details", JSON.stringify(details));

    const sortOrder = fd.get("sortOrder") as string;
    if (sortOrder) out.append("sortOrder", sortOrder);

    out.append("isPublished", String(fd.get("isPublished") === "on"));

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating award..." : "Updating award...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createAwardAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && award?.id) {
        const result = await updateAwardAction(
          award.id,
          formData,
          token,
        );
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <form id="award-form" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Award" : "Add Award"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update details for this award or recognition."
                : "Add a new award or recognition to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="title"
                    name="title"
                    defaultValue={award?.title || ""}
                    placeholder="e.g. Best Project Award"
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="subTitle">
                  Subtitle / Organization{" "}
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="subTitle"
                    name="subTitle"
                    defaultValue={award?.subTitle || ""}
                    placeholder="e.g. Programming Hero"
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="date">
                  Date <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="date"
                    name="date"
                    defaultValue={award?.date || ""}
                    placeholder="e.g. AUG 2026"
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Display format, e.g. &quot;AUG 2026&quot; or
                  &quot;2024&quot;
                </p>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="details">
                  Details <span className="text-red-500">*</span>
                </FieldLabel>
                <Textarea
                  id="details"
                  name="details"
                  defaultValue={award?.details?.join("\n") || ""}
                  placeholder="Enter each detail on a new line&#10;e.g. Built production-ready applications&#10;Integrated AI automation workflows"
                  required
                  className="rounded-xl resize-none"
                  rows={5}
                />
                <p className="text-[10px] text-muted-foreground">
                  One detail per line
                </p>
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="sortOrder"
                    type="number"
                    name="sortOrder"
                    min={0}
                    defaultValue={award?.sortOrder ?? 0}
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 sm:col-span-2">
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
                  defaultChecked={award ? award.isPublished : true}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
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
