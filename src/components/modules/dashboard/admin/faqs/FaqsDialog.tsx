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
  HelpCircle,
  ArrowUpDown,
  MessageSquareText,
} from "lucide-react";

import type { IFaq } from "@/types/faq.type";
import {
  createFaqAction,
  updateFaqAction,
} from "@/actions/faq.action";

interface FaqsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: IFaq | null;
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

export function FaqsDialog({
  open,
  onOpenChange,
  faq,
  mode,
  onSuccess,
  token,
}: FaqsDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const buildFormData = (): FormData => {
    const form = document.getElementById("faq-form") as HTMLFormElement;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("question", fd.get("question") as string);
    out.append("answer", fd.get("answer") as string);

    const sortOrder = fd.get("sortOrder") as string;
    if (sortOrder) out.append("sortOrder", sortOrder);

    out.append("isPublished", String(fd.get("isPublished") === "on"));

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating FAQ..." : "Updating FAQ...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createFaqAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && faq?.id) {
        const result = await updateFaqAction(
          faq.id,
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
        <form id="faq-form" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit FAQ" : "Add FAQ"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update this frequently asked question."
                : "Add a new frequently asked question to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="question">
                  Question <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="question"
                    name="question"
                    defaultValue={faq?.question || ""}
                    placeholder="e.g. What is your current role?"
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="answer">
                  Answer <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <MessageSquareText className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
                  <Textarea
                    id="answer"
                    name="answer"
                    defaultValue={faq?.answer || ""}
                    placeholder="Enter your answer here..."
                    required
                    className="rounded-xl resize-none pl-8"
                    rows={5}
                  />
                </div>
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
                    defaultValue={faq?.sortOrder ?? 0}
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
                  defaultChecked={faq ? faq.isPublished : true}
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
