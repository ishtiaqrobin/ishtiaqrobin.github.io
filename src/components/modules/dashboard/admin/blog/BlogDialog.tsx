"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  X,
  Plus,
  Image as ImageIcon,
  Search,
  Settings2,
  Tag as TagIcon,
} from "lucide-react";
import Image from "next/image";
import type { IBlog, IBlogTag, BlogStatus } from "@/types/blog.type";
import { createBlogAction, updateBlogAction } from "@/actions/blog.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import TiptapEditor from "@/components/modules/shared/TiptapEditor";

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog?: IBlog | null;
  tags: IBlogTag[];
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

/** "My First Post!" → "my-first-post" */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BlogDialog({
  open,
  onOpenChange,
  blog,
  tags,
  mode,
  onSuccess,
  token,
}: BlogDialogProps) {
  const isEdit = mode === "edit";

  // ── Core fields ───────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<BlogStatus>("DRAFT");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [coverImageAlt, setCoverImageAlt] = useState("");

  // ── SEO ───────────────────────────────────────────────────
  const [showSeo, setShowSeo] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  // ── Tags ──────────────────────────────────────────────────
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");

  const [saving, setSaving] = useState(false);

  const {
    file: thumbFile,
    preview: thumbPreview,
    isCompressing,
    handleFileChange: handleThumbChange,
    reset: resetThumb,
  } = useImageUpload();

  // ── Hydrate on open ───────────────────────────────────────
  useEffect(() => {
    if (!open) return;

    if (isEdit && blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setSlugTouched(true);
      setExcerpt(blog.excerpt ?? "");
      setContent(blog.content ?? "");
      setStatus(blog.status);
      setIsFeatured(blog.isFeatured);
      setIsPinned(blog.isPinned);
      setCoverImageAlt(blog.coverImageAlt ?? "");
      setMetaTitle(blog.metaTitle ?? "");
      setMetaDescription(blog.metaDescription ?? "");
      setCanonicalUrl(blog.canonicalUrl ?? "");
      setSelectedTagIds(blog.tags?.map((t) => t.id) ?? []);
      setShowSeo(
        Boolean(blog.metaTitle || blog.metaDescription || blog.canonicalUrl),
      );
    } else {
      setTitle("");
      setSlug("");
      setSlugTouched(false);
      setExcerpt("");
      setContent("");
      setStatus("DRAFT");
      setIsFeatured(false);
      setIsPinned(false);
      setCoverImageAlt("");
      setMetaTitle("");
      setMetaDescription("");
      setCanonicalUrl("");
      setSelectedTagIds([]);
      setShowSeo(false);
    }

    setTagSearch("");
    resetThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, blog?.id]);

  // Auto-slug from title until the user edits the slug manually
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase()),
  );

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      toast.error("Content is required");
      return;
    }

    setSaving(true);

    const fd = new FormData();
    fd.append("title", title.trim());
    if (slug.trim()) fd.append("slug", slug.trim());
    if (excerpt.trim()) fd.append("excerpt", excerpt.trim());
    fd.append("content", content);
    fd.append("status", status);
    fd.append("isFeatured", String(isFeatured));
    fd.append("isPinned", String(isPinned));
    if (coverImageAlt.trim()) fd.append("coverImageAlt", coverImageAlt.trim());
    if (metaTitle.trim()) fd.append("metaTitle", metaTitle.trim());
    if (metaDescription.trim())
      fd.append("metaDescription", metaDescription.trim());
    if (canonicalUrl.trim()) fd.append("canonicalUrl", canonicalUrl.trim());
    fd.append("tagIds", JSON.stringify(selectedTagIds));

    if (thumbFile) fd.append("thumbnail", thumbFile);

    const result = isEdit && blog
      ? await updateBlogAction(blog.id, fd, token)
      : await createBlogAction(fd, token);

    if (result.success) {
      toast.success(result.message);
      onOpenChange(false);
      onSuccess?.();
    } else {
      toast.error(result.message);
    }

    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the post details below."
              : "Write a new post. Save as draft or publish immediately."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-title">Title *</FieldLabel>
            <Input
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How I built my portfolio with Next.js"
              className="h-11 text-base font-medium"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-slug">Slug</FieldLabel>
            <Input
              id="blog-slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="auto-generated-from-title"
              className="h-10 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              URL: <code>/blogs/{slug || "…"}</code>
            </p>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
            <Textarea
              id="blog-excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown on the blog list…"
              className="min-h-17.5 resize-none"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-content">Content *</FieldLabel>
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your blog post here…"
            />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-thumb">Cover Image</FieldLabel>
            <div className="flex items-start gap-4">
              <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border bg-muted">
                {thumbPreview || (isEdit && blog?.thumbnail) ? (
                  <Image
                    src={thumbPreview || blog!.thumbnail!}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  id="blog-thumb"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbChange}
                  disabled={isCompressing}
                  className="cursor-pointer"
                />
                {isCompressing && (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Compressing…
                  </p>
                )}
                <Input
                  value={coverImageAlt}
                  onChange={(e) => setCoverImageAlt(e.target.value)}
                  placeholder="Alt text (accessibility)"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Status + toggles */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <FieldLabel htmlFor="blog-status">Status</FieldLabel>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as BlogStatus)}
              >
                <SelectTrigger id="blog-status" className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="blog-featured">Featured</FieldLabel>
              <div className="flex h-10 items-center gap-2 rounded-md border px-3">
                <Switch
                  id="blog-featured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
                <span className="text-sm text-muted-foreground">
                  {isFeatured ? "Yes" : "No"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="blog-pinned">Pinned</FieldLabel>
              <div className="flex h-10 items-center gap-2 rounded-md border px-3">
                <Switch
                  id="blog-pinned"
                  checked={isPinned}
                  onCheckedChange={setIsPinned}
                />
                <span className="text-sm text-muted-foreground">
                  {isPinned ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <FieldLabel htmlFor="blog-tags">
              <span className="inline-flex items-center gap-1.5">
                <TagIcon className="h-3 w-3" /> Tags
              </span>
            </FieldLabel>

            {selectedTagIds.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTagIds.map((id) => {
                  const t = tags.find((x) => x.id === id);
                  if (!t) return null;
                  return (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {t.name}
                      <button
                        type="button"
                        onClick={() => toggleTag(id)}
                        className="ml-0.5 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="blog-tags"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Search tags…"
                className="h-9 pl-9 text-sm"
              />
            </div>

            <div className="max-h-32 overflow-y-auto rounded-md border p-2">
              {filteredTags.length === 0 ? (
                <p className="py-2 text-center text-xs text-muted-foreground">
                  No tags yet. Create one from the Tags tab.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {filteredTags.map((t) => {
                    const active = selectedTagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTag(t.id)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {active ? (
                          <span className="inline-flex items-center gap-1">
                            <X className="h-3 w-3" />
                            {t.name}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Plus className="h-3 w-3" />
                            {t.name}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* SEO (collapsible) */}
          <div className="rounded-lg border">
            <button
              type="button"
              onClick={() => setShowSeo((p) => !p)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50"
            >
              <span className="inline-flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                SEO Settings
              </span>
              <span className="text-xs text-muted-foreground">
                {showSeo ? "Hide" : "Show"}
              </span>
            </button>

            {showSeo && (
              <div className="space-y-4 border-t px-4 py-4">
                <div className="space-y-2">
                  <FieldLabel htmlFor="blog-meta-title">Meta Title</FieldLabel>
                  <Input
                    id="blog-meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Defaults to the post title"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="blog-meta-desc">
                    Meta Description
                  </FieldLabel>
                  <Textarea
                    id="blog-meta-desc"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Defaults to the excerpt"
                    className="min-h-15 resize-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="blog-canonical">Canonical URL</FieldLabel>
                  <Input
                    id="blog-canonical"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://ishtiaqrobin.vercel.app/blogs/…"
                    className="h-9 font-mono text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving || isCompressing}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
