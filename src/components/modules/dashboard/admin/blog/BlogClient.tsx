// "use client";

// import { useState } from "react";
// import BlogTable from "./BlogTable";
// import BlogDialog from "./BlogDialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { PenLine, Search, Tags, Filter, RefreshCcw } from "lucide-react";
// import TagManagerDialog from "./TagManagerDialog";
// import { toast } from "sonner";
// import { Blog, BlogTag } from "@/types";
// import { blogService } from "@/services/blog.service";

// type Props = {
//   initialBlogs: Blog[];
//   tags: BlogTag[];
// };

// export default function BlogClient({ initialBlogs, tags }: Props) {
//   const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
//   const [localTags, setLocalTags] = useState<BlogTag[]>(tags);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("ALL");
//   const [tagFilter, setTagFilter] = useState<string>("ALL");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editBlog, setEditBlog] = useState<Blog | null>(null);
//   const [tagDialogOpen, setTagDialogOpen] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     const { data, error } = await blogService.getBlogs();
//     setRefreshing(false);
//     if (data) {
//       setBlogs(data);
//       toast.success("Refreshed successfully");
//     } else {
//       toast.error(error?.message || "Failed to refresh");
//     }
//   };

//   const handleEdit = (blog: Blog) => {
//     setEditBlog(blog);
//     setDialogOpen(true);
//   };

//   const handleCreate = () => {
//     setEditBlog(null);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = (refreshData?: boolean) => {
//     setDialogOpen(false);
//     setEditBlog(null);
//     if (refreshData) handleRefresh();
//   };

//   const filteredBlogs = blogs.filter((b) => {
//     const matchSearch =
//       b.title.toLowerCase().includes(search.toLowerCase()) ||
//       b.slug.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
//     const matchTag =
//       tagFilter === "ALL" || b.tags.some((t) => t.id === tagFilter);
//     return matchSearch && matchStatus && matchTag;
//   });

//   const stats = {
//     total: blogs.length,
//     published: blogs.filter((b) => b.status === "PUBLISHED").length,
//     draft: blogs.filter((b) => b.status === "DRAFT").length,
//     archived: blogs.filter((b) => b.status === "ARCHIVED").length,
//     featured: blogs.filter((b) => b.isFeatured).length,
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
//           <p className="mt-2 text-muted-foreground">
//             Manage articles, tags, and publication status
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRefresh}
//             disabled={refreshing}
//           >
//             <RefreshCcw
//               className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
//             />
//             Refresh
//           </Button>
//           <Button
//             onClick={() => setTagDialogOpen(true)}
//             className="cursor-pointer"
//           >
//             <Tags className="h-4 w-4 mr-2" />
//             Tags
//           </Button>
//           <Button onClick={handleCreate} className="cursor-pointer">
//             <PenLine className="h-4 w-4 mr-2" />
//             New Blog
//           </Button>
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//         {[
//           { label: "Total", value: stats.total, color: "bg-muted" },
//           {
//             label: "Published",
//             value: stats.published,
//             color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
//           },
//           {
//             label: "Draft",
//             value: stats.draft,
//             color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
//           },
//           {
//             label: "Archived",
//             value: stats.archived,
//             color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
//           },
//           {
//             label: "Featured",
//             value: stats.featured,
//             color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
//           },
//         ].map((stat) => (
//           <div
//             key={stat.label}
//             className={`rounded-lg border px-4 py-3 ${stat.color}`}
//           >
//             <p className="text-xs font-medium opacity-70">{stat.label}</p>
//             <p className="text-2xl font-bold">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by title or slug..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-full sm:w-44 min-h-11">
//             <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             <SelectItem value="ALL">All Status</SelectItem>
//             <SelectItem value="PUBLISHED">Published</SelectItem>
//             <SelectItem value="DRAFT">Draft</SelectItem>
//             <SelectItem value="ARCHIVED">Archived</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={tagFilter} onValueChange={setTagFilter}>
//           <SelectTrigger className="w-full sm:w-44 min-h-11">
//             <Tags className="h-4 w-4 mr-2 text-muted-foreground" />
//             <SelectValue placeholder="Tag" />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             <SelectItem value="ALL">All Tags</SelectItem>
//             {localTags.map((tag) => (
//               <SelectItem key={tag.id} value={tag.id}>
//                 {tag.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Results info */}
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           Showing{" "}
//           <span className="font-medium text-foreground">
//             {filteredBlogs.length}
//           </span>{" "}
//           of <span className="font-medium text-foreground">{blogs.length}</span>{" "}
//           blogs
//         </p>
//         {(search || statusFilter !== "ALL" || tagFilter !== "ALL") && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("ALL");
//               setTagFilter("ALL");
//             }}
//             className="text-xs border h-5 p-2 rounded-sm"
//           >
//             Clear filters
//           </Button>
//         )}
//       </div>

//       {/* Table */}
//       <BlogTable
//         blogs={filteredBlogs}
//         onEdit={handleEdit}
//         onRefresh={handleRefresh}
//       />

//       {/* Blog Create/Edit Dialog */}
//       <BlogDialog
//         open={dialogOpen}
//         onClose={handleDialogClose}
//         blog={editBlog}
//         tags={localTags}
//       />

//       {/* Tag Manager Dialog */}
//       <TagManagerDialog
//         open={tagDialogOpen}
//         onClose={() => setTagDialogOpen(false)}
//         tags={localTags}
//         onTagsChange={setLocalTags}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import BlogTable from "./BlogTable";
import BlogDialog from "./BlogDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PenLine, Search, Tags, Filter, RefreshCcw } from "lucide-react";
import TagManagerDialog from "./TagManagerDialog";
import { toast } from "sonner";
import { Blog, BlogTag } from "@/types";

type Props = {
  initialBlogs: Blog[];
  tags: BlogTag[];
  token: string;
};

export default function BlogClient({ initialBlogs, tags, token }: Props) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [localTags, setLocalTags] = useState<BlogTag[]>(tags);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [tagFilter, setTagFilter] = useState<string>("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Refresh re-fetches from the server by doing a full navigation reload.
  // All data fetching stays on the server side (blogService runs in the page).
  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload();
  };

  const handleEdit = (blog: Blog) => {
    setEditBlog(blog);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditBlog(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (refreshData?: boolean) => {
    setDialogOpen(false);
    setEditBlog(null);
    if (refreshData) handleRefresh();
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchTag =
      tagFilter === "ALL" || b.tags.some((t) => t.id === tagFilter);
    return matchSearch && matchStatus && matchTag;
  });

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "PUBLISHED").length,
    draft: blogs.filter((b) => b.status === "DRAFT").length,
    archived: blogs.filter((b) => b.status === "ARCHIVED").length,
    featured: blogs.filter((b) => b.isFeatured).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage articles, tags, and publication status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCcw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={() => setTagDialogOpen(true)}
            className="cursor-pointer"
          >
            <Tags className="h-4 w-4 mr-2" />
            Tags
          </Button>
          <Button onClick={handleCreate} className="cursor-pointer">
            <PenLine className="h-4 w-4 mr-2" />
            New Blog
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-muted" },
          {
            label: "Published",
            value: stats.published,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Draft",
            value: stats.draft,
            color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          },
          {
            label: "Archived",
            value: stats.archived,
            color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
          },
          {
            label: "Featured",
            value: stats.featured,
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg border px-4 py-3 ${stat.color}`}
          >
            <p className="text-xs font-medium opacity-70">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44 min-h-11">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-full sm:w-44 min-h-11">
            <Tags className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="ALL">All Tags</SelectItem>
            {localTags.map((tag) => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredBlogs.length}
          </span>{" "}
          of <span className="font-medium text-foreground">{blogs.length}</span>{" "}
          blogs
        </p>
        {(search || statusFilter !== "ALL" || tagFilter !== "ALL") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
              setTagFilter("ALL");
            }}
            className="text-xs border h-5 p-2 rounded-sm"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      <BlogTable
        blogs={filteredBlogs}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
        token={token}
      />

      {/* Blog Create/Edit Dialog */}
      <BlogDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        blog={editBlog}
        tags={localTags}
        token={token}
      />

      {/* Tag Manager Dialog */}
      <TagManagerDialog
        open={tagDialogOpen}
        onClose={() => setTagDialogOpen(false)}
        tags={localTags}
        onTagsChange={setLocalTags}
        token={token}
      />
    </div>
  );
}
