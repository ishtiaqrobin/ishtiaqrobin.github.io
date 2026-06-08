"use client";

import { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Blog, BlogTag } from "@/types";
import { createBlogAction, updateBlogAction } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  ImagePlus,
  X,
  Wand2,
  Loader2,
  Check,
  ChevronsUpDown,
  Tags,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import TiptapEditor from "@/components/modules/shared/TiptapEditor";

// ── Schema ────────────────────────────────────────────────

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isFeatured: z.boolean(),
  publishedAt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tagIds: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

// ── Slug helper ───────────────────────────────────────────

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ── Props ─────────────────────────────────────────────────

type Props = {
  blog: Blog | null;
  tags: BlogTag[];
  token: string;
  onSuccess: () => void;
};

export default function BlogForm({ blog, tags, token, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    blog?.thumbnail || "",
  );
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: blog?.title || "",
      slug: blog?.slug || "",
      content: blog?.content || "",
      excerpt: blog?.excerpt || "",
      status: blog?.status || "DRAFT",
      isFeatured: blog?.isFeatured || false,
      publishedAt: blog?.publishedAt
        ? new Date(blog.publishedAt).toISOString().slice(0, 16)
        : "",
      metaTitle: blog?.metaTitle || "",
      metaDescription: blog?.metaDescription || "",
      tagIds: blog?.tags.map((t) => t.id) || [],
    },
  });

  const title = watch("title");
  const selectedTagIds = watch("tagIds");

  const generateSlug = useCallback(() => {
    setValue("slug", toSlug(title), { shouldValidate: true });
  }, [title, setValue]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleTag = (tagId: string) => {
    const current = selectedTagIds;
    if (current.includes(tagId)) {
      setValue(
        "tagIds",
        current.filter((id) => id !== tagId),
      );
    } else {
      setValue("tagIds", [...current, tagId]);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, val]) => {
        if (key === "tagIds") {
          (val as string[]).forEach((id) => formData.append("tagIds", id));
        } else if (val !== undefined && val !== "") {
          formData.append(key, String(val));
        }
      });

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const res = blog
        ? await updateBlogAction(blog.id, formData, token)
        : await createBlogAction(formData, token);

      if (res.success) {
        toast.success(res.message);
        onSuccess();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTags = tags.filter((t) => selectedTagIds.includes(t.id));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-4">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="My Awesome Blog Post"
          {...register("title")}
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug" className="text-sm font-medium">
          Slug <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            id="slug"
            placeholder="my-awesome-blog-post"
            {...register("slug")}
            className={cn(
              "font-mono text-sm",
              errors.slug ? "border-destructive" : "",
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateSlug}
            title="Generate slug from title"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
        {errors.slug && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Thumbnail</Label>
        {thumbnailPreview ? (
          <div className="relative h-40 w-72 rounded-lg overflow-hidden border bg-muted">
            <Image
              src={thumbnailPreview}
              alt="Thumbnail preview"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={removeThumbnail}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-40 w-72 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">
              Click to upload thumbnail
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG, WebP up to 5MB
            </span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />
      </div>

      {/* Content / TiptapEditor */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Content <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor
              content={field.value}
              onChange={field.onChange}
              placeholder="Start writing your technical blog post here..."
            />
          )}
        />
        {errors.content && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <Label htmlFor="excerpt" className="text-sm font-medium">
          Excerpt
          <span className="text-xs text-muted-foreground font-normal ml-2">
            (short summary shown in listing)
          </span>
        </Label>
        <Textarea
          id="excerpt"
          placeholder="A brief description of this post..."
          rows={2}
          {...register("excerpt")}
        />
      </div>

      {/* Tags */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Tags</Label>
        <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className="w-full border justify-between font-normal cursor-pointer"
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedTags.length === 0 ? (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Tags className="h-4 w-4" />
                    Select tags...
                  </span>
                ) : (
                  selectedTags.map((t) => (
                    <Badge
                      key={t.id}
                      variant="secondary"
                      className="text-xs px-1.5 py-0"
                    >
                      {t.name}
                    </Badge>
                  ))
                )}
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." className="h-9" />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={() => toggleTag(tag.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTagIds.includes(tag.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {tag.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Separator />

      {/* Status + Featured + Publish Date */}
      <div className="flex flex-wrap gap-4">
        <div className="space-y-1.5 flex-1 min-w-[140px]">
          <Label className="text-sm font-medium">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Featured</Label>
          <div className="flex items-center gap-2 h-10">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="text-sm text-muted-foreground">
              Show on homepage
            </span>
          </div>
        </div>

        <div className="space-y-1.5 flex-1 min-w-[180px]">
          <Label htmlFor="publishedAt" className="text-sm font-medium">
            Publish Date
          </Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            {...register("publishedAt")}
          />
        </div>
      </div>

      {/* SEO Accordion */}
      <Accordion type="single" collapsible className="border rounded-lg px-4">
        <AccordionItem value="seo" className="border-0">
          <AccordionTrigger className="text-sm font-medium py-3">
            SEO Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4 px-1">
            <div className="space-y-1.5">
              <Label htmlFor="metaTitle" className="text-sm font-medium">
                Meta Title
              </Label>
              <Input
                id="metaTitle"
                placeholder="SEO title (defaults to post title if empty)"
                {...register("metaTitle")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="metaDescription" className="text-sm font-medium">
                Meta Description
              </Label>
              <Textarea
                id="metaDescription"
                placeholder="SEO description (150–160 chars recommended)"
                rows={2}
                {...register("metaDescription")}
              />
              <p className="text-xs text-muted-foreground">
                {watch("metaDescription")?.length || 0}/160 characters
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="gap-2 w-full cursor-pointer"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting
            ? blog
              ? "Updating..."
              : "Creating..."
            : blog
              ? "Update Blog"
              : "Create Blog"}
        </Button>
        {blog && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
            disabled={submitting}
            className="w-full cursor-pointer"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
