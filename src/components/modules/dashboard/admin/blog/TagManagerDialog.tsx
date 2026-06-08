"use client";

import { useState } from "react";
import { BlogTag } from "@/types";
import {
  createBlogTagAction,
  updateBlogTagAction,
  deleteBlogTagAction,
} from "@/actions/blog.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Wand2,
  Loader2,
  Tags,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  tags: BlogTag[];
  onTagsChange: (tags: BlogTag[]) => void;
  token: string;
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function TagManagerDialog({
  open,
  onClose,
  tags,
  onTagsChange,
  token,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const guardToken = (): boolean => {
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!newName.trim() || !guardToken()) return;
    setLoading("create");

    const res = await createBlogTagAction(
      { name: newName.trim(), slug: newSlug || toSlug(newName) },
      token,
    );
    setLoading(null);

    if (res.success && res.data) {
      toast.success(res.message);
      onTagsChange([...tags, res.data]);
      setNewName("");
      setNewSlug("");
    } else {
      toast.error(res.message);
    }
  };

  const startEdit = (tag: BlogTag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
    setEditSlug(tag.slug);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditSlug("");
  };

  const handleUpdate = async (id: string) => {
    if (!guardToken()) return;
    setLoading(id);

    const res = await updateBlogTagAction(
      id,
      { name: editName.trim(), slug: editSlug || toSlug(editName) },
      token,
    );
    setLoading(null);

    if (res.success && res.data) {
      toast.success(res.message);
      onTagsChange(tags.map((t) => (t.id === id ? res.data! : t)));
      cancelEdit();
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || !guardToken()) return;
    setLoading("delete-" + deleteId);

    const res = await deleteBlogTagAction(deleteId, token);
    setLoading(null);
    setDeleteId(null);

    if (res.success) {
      toast.success(res.message);
      onTagsChange(tags.filter((t) => t.id !== deleteId));
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tags className="h-5 w-5" />
              Manage Tags
            </DialogTitle>
            <DialogDescription>
              Create, edit, or delete blog tags.
            </DialogDescription>
          </DialogHeader>

          {/* Create new tag */}
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <div className="space-y-1">
                <Label className="text-xs font-medium">Name</Label>
                <Input
                  placeholder="React"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium">Slug</Label>
                <div className="flex gap-1">
                  <Input
                    placeholder="react"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="h-8 text-sm font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setNewSlug(toSlug(newName))}
                    title="Generate slug"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  size="sm"
                  className="h-8 w-8"
                  onClick={handleCreate}
                  disabled={!newName.trim() || loading === "create"}
                >
                  {loading === "create" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tag list */}
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {tags.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No tags yet. Create one above.
              </p>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 group rounded-md border p-2"
                >
                  {editingId === tag.id ? (
                    <>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-7 text-sm flex-1"
                      />
                      <Input
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="h-7 text-sm flex-1 font-mono"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-emerald-600 hover:text-emerald-700"
                        onClick={() => handleUpdate(tag.id)}
                        disabled={loading === tag.id}
                      >
                        {loading === tag.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Save className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={cancelEdit}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {tag.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {tag.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => startEdit(tag)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(tag.id)}
                          disabled={loading === "delete-" + tag.id}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tag?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the tag from all blogs. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
