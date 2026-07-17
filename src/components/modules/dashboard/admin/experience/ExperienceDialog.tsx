"use client";

import { useEffect, useRef, useState } from "react";
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
  Building2,
  Briefcase,
  CalendarDays,
  Globe,
  ListChecks,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";

import type { IExperience } from "@/types";
import {
  createExperienceAction,
  updateExperienceAction,
} from "@/actions/experience.action";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: IExperience | null;
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

export function ExperienceDialog({
  open,
  onOpenChange,
  experience,
  mode,
  onSuccess,
  token,
}: ExperienceDialogProps) {
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    file: logoFile,
    preview: logoPreview,
    isCompressing,
    handleFileChange: handleLogoChange,
    reset: resetLogo,
    inputRef: logoInputRef,
  } = useImageUpload({ maxSizeMB: 5 });

  useEffect(() => {
    if (!open) {
      resetLogo();
    }
  }, [open]);

  const handleClose = () => {
    resetLogo();
    onOpenChange(false);
  };

  const buildFormData = (): FormData => {
    const form = formRef.current;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("position", fd.get("position") as string);
    out.append("companyName", fd.get("companyName") as string);
    out.append(
      "startDate",
      new Date(fd.get("startDate") as string).toISOString(),
    );

    const endDate = fd.get("endDate") as string;
    if (endDate) out.append("endDate", new Date(endDate).toISOString());

    const companyUrl = fd.get("companyUrl") as string;
    if (companyUrl) out.append("companyUrl", companyUrl);

    const responsibilitiesRaw = (fd.get("responsibilities") as string) || "";
    const responsibilities = responsibilitiesRaw
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);
    out.append("responsibilities", JSON.stringify(responsibilities));

    const sortOrder = fd.get("sortOrder") as string;
    if (sortOrder) out.append("sortOrder", sortOrder);

    out.append("isPublished", String(fd.get("isPublished") === "on"));

    if (logoFile) out.append("companyLogo", logoFile);

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating experience..." : "Updating experience...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createExperienceAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && experience?.id) {
        const result = await updateExperienceAction(
          experience.id,
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
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update details for this work experience."
                : "Add a new work experience record to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="position">
                  Position <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="position"
                    name="position"
                    defaultValue={experience?.position || ""}
                    placeholder="e.g. Senior Backend Developer"
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={experience?.companyName || ""}
                    placeholder="e.g. Creative Agency Ltd."
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="startDate">
                  Start Date <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    name="startDate"
                    defaultValue={
                      experience?.startDate
                        ? new Date(experience.startDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    required
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    name="endDate"
                    defaultValue={
                      experience?.endDate
                        ? new Date(experience.endDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Leave empty if currently working here
                </p>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="responsibilities">
                  Responsibilities <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <ListChecks className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    defaultValue={
                      experience?.responsibilities?.join("\n") || ""
                    }
                    placeholder="Enter each responsibility on a new line&#10;e.g. Led the frontend architecture development&#10;Optimized application performance"
                    required
                    className="rounded-xl resize-none pl-8"
                    rows={5}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  One responsibility per line
                </p>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="companyUrl">Company URL</FieldLabel>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="companyUrl"
                    type="url"
                    name="companyUrl"
                    defaultValue={experience?.companyUrl || ""}
                    placeholder="https://company.com"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="companyLogo">Company Logo</FieldLabel>
                <Input
                  id="companyLogo"
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={handleLogoChange}
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
                    Max 5MB · Auto-compressed to WebP · Image will be stored in
                    Cloudinary
                  </p>
                )}
                {logoPreview && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={40}
                      height={40}
                      className="rounded-lg object-cover h-10 w-10"
                    />
                    <span className="text-[10px] text-muted-foreground truncate max-w-48">
                      {logoFile?.name}
                    </span>
                  </div>
                )}
                {!logoPreview && experience?.companyLogo && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={experience.companyLogo}
                      alt={experience.companyName}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover h-10 w-10"
                    />
                    <span className="text-[10px] text-muted-foreground truncate max-w-48">
                      Current logo
                    </span>
                  </div>
                )}
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
                    defaultValue={experience?.sortOrder ?? 0}
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
                  defaultChecked={experience ? experience.isPublished : true}
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
