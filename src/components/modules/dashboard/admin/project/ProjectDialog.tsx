"use client";

import { useEffect, useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  Star,
  Link as LinkIcon,
  Github,
  User,
  Briefcase,
  Laptop,
  Calendar,
  FileSliders,
  Tags,
} from "lucide-react";
import Image from "next/image";
import type { IProject, IProjectSection } from "@/types";
import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/project.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import ProjectSectionsEditor from "./ProjectSectionsEditor";
import { Category } from "@/types/category.type";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: IProject | null;
  categories: Category[];
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

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  categories,
  mode,
  onSuccess,
  token,
}: ProjectDialogProps) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugAuto, setSlugAuto] = useState(true);
  const [sections, setSections] = useState<IProjectSection[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    file: thumbnailFile,
    isCompressing,
    handleFileChange: handleThumbnailChange,
    reset: resetThumbnail,
    inputRef: thumbnailRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const {
    file: bannerImageFile,
    isCompressing: isBannerCompressing,
    handleFileChange: handleBannerImageChange,
    reset: resetBannerImage,
    inputRef: bannerImageRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    if (open) {
      if (mode === "edit" && project) {
        setTitle(project.title || "");
        setSlug(project.slug || "");
        setSlugAuto(false);
        setSections(project.sections || []);
      } else {
        setTitle("");
        setSlug("");
        setSlugAuto(true);
        setSections([]);
      }
      resetThumbnail();
      resetBannerImage();
    }
  }, [open, mode, project]);

  const handleClose = () => {
    resetThumbnail();
    resetBannerImage();
    setSections([]);
    onOpenChange(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (slugAuto) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugAuto(false);
    setSlug(e.target.value);
  };

  const buildFormData = (): FormData => {
    const form = formRef.current;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("title", fd.get("title") as string);
    out.append("slug", fd.get("slug") as string);
    out.append("description", fd.get("description") as string);
    out.append("categoryId", fd.get("categoryId") as string);

    const liveUrl = fd.get("liveUrl") as string;
    const githubUrl = fd.get("githubUrl") as string;
    const sortOrder = fd.get("sortOrder") as string;
    const roles = fd.get("roles") as string;
    const client = fd.get("client") as string;
    const year = fd.get("year") as string;
    const bgColor = fd.get("bgColor") as string;
    if (liveUrl) out.append("liveUrl", liveUrl);
    if (githubUrl) out.append("githubUrl", githubUrl);
    if (sortOrder) out.append("sortOrder", sortOrder);
    if (roles) out.append("roles", roles);
    if (client) out.append("client", client);
    if (year) out.append("year", year);
    if (bgColor) out.append("bgColor", bgColor);

    const tagsRaw = fd.get("tags") as string;
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    out.append("tags", JSON.stringify(tags));

    const techStackRaw = fd.get("techStack") as string;
    const techStack = techStackRaw
      ? techStackRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    out.append("techStack", JSON.stringify(techStack));

    if (sections.length > 0) {
      out.append("sections", JSON.stringify(sections));
    }

    out.append("isFeatured", String(fd.get("isFeatured") === "on"));
    out.append("isPublished", String(fd.get("isPublished") === "on"));

    if (thumbnailFile) out.append("thumbnail", thumbnailFile);
    if (bannerImageFile) out.append("bannerImage", bannerImageFile);

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating project..." : "Updating project...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createProjectAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && project?.id) {
        const result = await updateProjectAction(project.id, formData, token);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update details for your project."
                : "Add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="title">
                  Project Title <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. E-Commerce Dashboard"
                  required
                  className="rounded-xl h-10"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <FileSliders className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="e.g. e-commerce-dashboard"
                    required
                    className="rounded-xl h-10 pl-8 font-mono text-sm"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Auto-generated from title. Edit manually if needed.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="categoryId">
                  Category <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name="categoryId"
                  defaultValue={project?.categoryId || ""}
                >
                  <SelectTrigger id="categoryId" className="rounded-xl h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categories.filter((cat) => cat.isPublished).map((cat) => (
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
                  defaultValue={project?.sortOrder ?? 0}
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
                {project?.thumbnail && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={64}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <span className="text-[10px] text-muted-foreground truncate max-w-48">
                      {project.thumbnail.split("/").pop()}
                    </span>
                  </div>
                )}
              </div>

              {/* Banner Image */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="bannerImage">Banner Image</FieldLabel>
                <Input
                  id="bannerImage"
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  ref={bannerImageRef}
                  onChange={handleBannerImageChange}
                  disabled={isBannerCompressing}
                  className="rounded-xl h-10 cursor-pointer"
                />
                {isBannerCompressing ? (
                  <p className="text-[11px] text-primary flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Compressing…
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    Optional · Larger hero/banner image for the project detail
                    page
                  </p>
                )}
                {project?.bannerImage && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={project.bannerImage}
                      alt={project.title}
                      width={96}
                      height={48}
                      className="rounded-lg object-cover aspect-video"
                    />
                    <span className="text-[10px] text-muted-foreground truncate max-w-48">
                      {project.bannerImage.split("/").pop()}
                    </span>
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="year">Project Year</FieldLabel>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="year"
                    name="year"
                    defaultValue={project?.year || ""}
                    placeholder="e.g. 2024"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* bgColor */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="bgColor">Card Background Color</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="bgColor"
                    name="bgColor"
                    defaultValue={project?.bgColor || ""}
                    placeholder="e.g. #fef08a"
                    className="rounded-xl h-10 font-mono text-sm flex-1"
                  />
                  {project?.bgColor && (
                    <div
                      className="h-10 w-10 rounded-xl border shrink-0"
                      style={{ backgroundColor: project.bgColor }}
                    />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Hex color for project card background on the listing page.
                </p>
              </div>

              {/* Live URL */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    defaultValue={project?.liveUrl || ""}
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
                    defaultValue={project?.githubUrl || ""}
                    placeholder="https://github.com/..."
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="roles">Roles</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="roles"
                    name="roles"
                    defaultValue={project?.roles || ""}
                    placeholder="e.g. Full-stack Developer"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* Client */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="client">Client</FieldLabel>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="client"
                    name="client"
                    defaultValue={project?.client || ""}
                    placeholder="e.g. Personal Project, Company Name"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="techStack">
                  Tech Stack (comma separated)
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Laptop className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="techStack"
                    name="techStack"
                    defaultValue={(project?.techStack || []).join(", ") || ""}
                    placeholder="React, Next.js, TypeScript, Tailwind CSS"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="tags">
                  Tags (comma separated) <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={project?.tags.join(", ") || ""}
                    placeholder="React, Next.js, Tailwind CSS"
                    className="rounded-xl h-10 pl-8"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={project?.description || ""}
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
                  defaultChecked={project?.isFeatured || false}
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
                  defaultChecked={project ? project.isPublished : true}
                />
              </div>

              {/* Sections */}
              <div className="sm:col-span-2">
                <ProjectSectionsEditor
                  sections={sections}
                  onChange={setSections}
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
            <Button
              type="submit"
              disabled={saving || isCompressing || isBannerCompressing}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
