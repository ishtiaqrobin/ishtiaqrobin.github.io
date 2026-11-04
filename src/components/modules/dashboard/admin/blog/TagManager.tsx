"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, Tag as TagIcon } from "lucide-react";
import type { IBlogTag } from "@/types/blog.type";
import {
    createBlogTagAction,
    deleteBlogTagAction,
} from "@/actions/blog.action";

interface TagManagerProps {
    tags: IBlogTag[];
    token: string;
    onChanged: () => void;
}

export default function TagManager({
    tags,
    token,
    onChanged,
}: TagManagerProps) {
    const [name, setName] = useState("");
    const [creating, setCreating] = useState(false);
    const [busyId, setBusyId] = useState<string | null>(null);

    const handleCreate = async () => {
        const trimmed = name.trim();
        if (!trimmed) {
            toast.error("Tag name is required");
            return;
        }

        setCreating(true);
        const result = await createBlogTagAction({ name: trimmed }, token);
        if (result.success) {
            toast.success(result.message);
            setName("");
            onChanged();
        } else {
            toast.error(result.message);
        }
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        setBusyId(id);
        const result = await deleteBlogTagAction(id, token);
        if (result.success) {
            toast.success(result.message);
            onChanged();
        } else {
            toast.error(result.message);
        }
        setBusyId(null);
    };

    return (
        <div className="space-y-4">
            <div className="rounded-lg border bg-white p-4">
                <div className="flex gap-2">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleCreate();
                            }
                        }}
                        placeholder="New tag name…"
                        className="h-10"
                    />
                    <Button onClick={handleCreate} disabled={creating}>
                        {creating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <Plus className="mr-1.5 h-4 w-4" />
                                Add
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {tags.length === 0 ? (
                <div className="rounded-md border bg-white p-12 text-center">
                    <TagIcon className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                        No tags yet. Add your first tag above.
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 rounded-lg border bg-white p-4">
                    {tags.map((t) => (
                        <Badge
                            key={t.id}
                            variant="secondary"
                            className="gap-1.5 py-1.5 pl-3 pr-1.5 text-sm"
                        >
                            {t.name}
                            <span className="text-[10px] text-muted-foreground">
                                {t._count?.blogs ?? 0}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDelete(t.id)}
                                disabled={busyId === t.id}
                                className="rounded-full p-0.5 hover:bg-destructive/15 hover:text-destructive"
                                title="Delete tag"
                            >
                                {busyId === t.id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Trash2 className="h-3 w-3" />
                                )}
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
