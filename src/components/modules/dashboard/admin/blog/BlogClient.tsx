"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    RefreshCw,
    Search,
    FileText,
    MessageSquare,
    Tag as TagIcon,
} from "lucide-react";
import type { IBlog, IBlogComment, IBlogTag } from "@/types/blog.type";
import { blogService } from "@/services/blog.service";
import BlogTable from "./BlogTable";
import BlogDialog from "./BlogDialog";
import CommentModeration from "./CommentModeration";
import TagManager from "./TagManager";

const PAGE_SIZE = 10;

interface BlogClientProps {
    initialBlogs: IBlog[];
    initialMeta: { total: number; page: number; limit: number; totalPages: number };
    tags: IBlogTag[];
    token: string;
}

export function BlogClient({
    initialBlogs,
    initialMeta,
    tags,
    token,
}: BlogClientProps) {
    const router = useRouter();

    // ── List state ────────────────────────────────────────────
    const [blogs, setBlogs] = useState<IBlog[]>(initialBlogs);
    const [meta, setMeta] = useState(initialMeta);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(1);

    // ── Dialog ────────────────────────────────────────────────
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

    // ── Comments ──────────────────────────────────────────────
    const [comments, setComments] = useState<IBlogComment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentFilter, setCommentFilter] = useState("PENDING");

    // ── Tags ──────────────────────────────────────────────────
    const [tagList, setTagList] = useState<IBlogTag[]>(tags);

    // ── Data loading ──────────────────────────────────────────
    const loadBlogs = useCallback(
        async (opts?: { page?: number; status?: string; search?: string }) => {
            setLoading(true);
            const nextPage = opts?.page ?? page;
            const nextStatus = opts?.status ?? statusFilter;
            const nextSearch = opts?.search ?? query;

            const { data, error } = await blogService.getBlogs(
                {
                    page: nextPage,
                    limit: PAGE_SIZE,
                    ...(nextStatus !== "ALL" && { status: nextStatus }),
                    ...(nextSearch.trim() && { search: nextSearch.trim() }),
                },
                token,
            );

            if (error) {
                setLoading(false);
                return;
            }

            setBlogs(data?.data ?? []);
            setMeta(
                data?.meta ?? { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1 },
            );
            setLoading(false);
        },
        [page, statusFilter, query, token],
    );

    const loadComments = useCallback(async () => {
        setCommentsLoading(true);
        const { data } = await blogService.getAllComments(token, {
            ...(commentFilter !== "ALL" && {
                isApproved: commentFilter === "APPROVED",
            }),
            limit: 50,
        });
        setComments(data?.data ?? []);
        setCommentsLoading(false);
    }, [commentFilter, token]);

    const loadTags = useCallback(async () => {
        const { data } = await blogService.getTags();
        if (data) setTagList(data);
    }, []);

    // Reload comments when the filter changes
    useEffect(() => {
        loadComments();
    }, [loadComments]);

    // ── Handlers ──────────────────────────────────────────────
    const handleRefresh = () => {
        loadBlogs();
        loadTags();
        router.refresh();
    };

    const handleSearch = (value: string) => {
        setQuery(value);
        setPage(1);
        loadBlogs({ page: 1, search: value });
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1);
        loadBlogs({ page: 1, status: value });
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        loadBlogs({ page: nextPage });
    };

    const handleAdd = () => {
        setDialogMode("add");
        setSelectedBlog(null);
        setDialogOpen(true);
    };

    const handleEdit = (blog: IBlog) => {
        setDialogMode("edit");
        setSelectedBlog(blog);
        setDialogOpen(true);
    };

    const handleSuccess = () => {
        loadBlogs();
        loadTags();
        router.refresh();
    };

    const pendingCount = useMemo(
        () => comments.filter((c) => !c.isApproved).length,
        [comments],
    );

    return (
        <div className="mx-auto w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Blog Management</h1>
                    <p className="mt-2 text-muted-foreground">
                        Write, publish, and moderate your blog posts
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                        <RefreshCw
                            className={`mr-1.5 h-4 w-4 ${loading ? "animate-spin" : ""}`}
                        />
                        Refresh
                    </Button>
                    <Button onClick={handleAdd}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        New Post
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="posts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="posts" className="gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        Posts
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                            {meta.total}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="comments" className="gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Comments
                        {pendingCount > 0 && (
                            <Badge className="ml-1 h-5 px-1.5 text-[10px]">
                                {pendingCount}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="tags" className="gap-1.5">
                        <TagIcon className="h-3.5 w-3.5" />
                        Tags
                    </TabsTrigger>
                </TabsList>

                {/* ── Posts ── */}
                <TabsContent value="posts" className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search posts by title…"
                                className="h-10 bg-white pl-9"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={handleStatusChange}>
                            <SelectTrigger className="h-10 w-full bg-white sm:w-44">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All statuses</SelectItem>
                                <SelectItem value="PUBLISHED">Published</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <BlogTable
                        blogs={blogs}
                        loading={loading}
                        onEdit={handleEdit}
                        onDeleteSuccess={handleSuccess}
                        page={meta.page}
                        totalPages={meta.totalPages}
                        total={meta.total}
                        limit={meta.limit}
                        onPageChange={handlePageChange}
                        token={token}
                    />
                </TabsContent>

                {/* ── Comments ── */}
                <TabsContent value="comments" className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <Select
                            value={commentFilter}
                            onValueChange={setCommentFilter}
                        >
                            <SelectTrigger className="h-10 w-full bg-white sm:w-44">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                                <SelectItem value="ALL">All comments</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={loadComments}
                            disabled={commentsLoading}
                        >
                            <RefreshCw
                                className={`mr-1.5 h-4 w-4 ${commentsLoading ? "animate-spin" : ""
                                    }`}
                            />
                            Refresh
                        </Button>
                    </div>

                    <CommentModeration
                        comments={comments}
                        loading={commentsLoading}
                        token={token}
                        onChanged={() => {
                            loadComments();
                            loadBlogs();
                        }}
                    />
                </TabsContent>

                {/* ── Tags ── */}
                <TabsContent value="tags" className="space-y-4">
                    <TagManager tags={tagList} token={token} onChanged={loadTags} />
                </TabsContent>
            </Tabs>

            <BlogDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                blog={selectedBlog}
                tags={tagList}
                mode={dialogMode}
                onSuccess={handleSuccess}
                token={token}
            />
        </div>
    );
}
