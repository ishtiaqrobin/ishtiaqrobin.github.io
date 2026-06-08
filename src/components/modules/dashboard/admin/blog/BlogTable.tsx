// "use client";

// import { useState } from "react";
// import { Blog } from "@/types";
// import { deleteBlogAction } from "@/actions/blog.action";
// import { authClient } from "@/lib/auth-client";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   MoreHorizontal,
//   Pencil,
//   Trash2,
//   ExternalLink,
//   Eye,
//   Heart,
//   Star,
// } from "lucide-react";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import Image from "next/image";

// type Props = {
//   blogs: Blog[];
//   onEdit: (blog: Blog) => void;
//   onRefresh: () => void;
// };

// const statusConfig = {
//   PUBLISHED: {
//     label: "Published",
//     className:
//       "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
//   },
//   DRAFT: {
//     label: "Draft",
//     className:
//       "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
//   },
//   ARCHIVED: {
//     label: "Archived",
//     className:
//       "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
//   },
// };

// export default function BlogTable({ blogs, onEdit, onRefresh }: Props) {
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     setDeleting(true);

//     const session = await authClient.getSession();
//     const token = session?.data?.session?.token;
//     if (!token) {
//       toast.error("Session expired. Please log in again.");
//       setDeleting(false);
//       return;
//     }

//     const res = await deleteBlogAction(deleteId, token);
//     setDeleting(false);
//     setDeleteId(null);
//     if (res.success) {
//       toast.success(res.message);
//       onRefresh();
//     } else {
//       toast.error(res.message);
//     }
//   };

//   if (blogs.length === 0) {
//     return (
//       <div className="border rounded-lg p-12 text-center">
//         <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
//           <Pencil className="h-5 w-5 text-muted-foreground" />
//         </div>
//         <p className="text-muted-foreground text-sm">No blogs found</p>
//         <p className="text-muted-foreground text-xs mt-1">
//           Create your first blog post to get started
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="border rounded-lg overflow-hidden px-6 py-2">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted/40 hover:bg-muted/40">
//               <TableHead className="w-12">#</TableHead>
//               <TableHead>Blog</TableHead>
//               <TableHead className="hidden md:table-cell">Tags</TableHead>
//               <TableHead className="hidden lg:table-cell">Status</TableHead>
//               <TableHead className="hidden lg:table-cell text-center">
//                 <Eye className="h-4 w-4 mx-auto" />
//               </TableHead>
//               <TableHead className="hidden lg:table-cell text-center">
//                 <Heart className="h-4 w-4 mx-auto" />
//               </TableHead>
//               <TableHead className="hidden xl:table-cell">Published</TableHead>
//               <TableHead className="w-12">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {blogs.map((blog, idx) => {
//               const status = statusConfig[blog.status] || statusConfig.DRAFT;
//               return (
//                 <TableRow key={blog.id} className="group">
//                   <TableCell className="text-muted-foreground text-sm">
//                     {idx + 1}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       {blog.thumbnail ? (
//                         <div className="relative h-10 w-16 rounded overflow-hidden shrink-0 bg-muted">
//                           <Image
//                             src={blog.thumbnail}
//                             alt={blog.title}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       ) : (
//                         <div className="h-10 w-16 rounded bg-muted shrink-0 flex items-center justify-center">
//                           <Pencil className="h-4 w-4 text-muted-foreground/50" />
//                         </div>
//                       )}
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-1.5">
//                           <p className="font-medium text-sm truncate max-w-[200px]">
//                             {blog.title}
//                           </p>
//                           {blog.isFeatured && (
//                             <Star className="h-3.5 w-3.5 text-amber-500 shrink-0 fill-amber-500" />
//                           )}
//                         </div>
//                         <p className="text-xs text-muted-foreground truncate max-w-[200px]">
//                           /{blog.slug}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     <div className="flex flex-wrap gap-1 max-w-[180px]">
//                       {blog.tags.slice(0, 3).map((tag) => (
//                         <Badge
//                           key={tag.id}
//                           variant="secondary"
//                           className="text-xs px-1.5 py-0"
//                         >
//                           {tag.name}
//                         </Badge>
//                       ))}
//                       {blog.tags.length > 3 && (
//                         <Badge
//                           variant="outline"
//                           className="text-xs px-1.5 py-0"
//                         >
//                           +{blog.tags.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden lg:table-cell">
//                     <Badge
//                       variant="outline"
//                       className={`text-xs ${status.className}`}
//                     >
//                       {status.label}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="hidden lg:table-cell text-center text-sm text-muted-foreground">
//                     {blog.viewCount.toLocaleString()}
//                   </TableCell>
//                   <TableCell className="hidden lg:table-cell text-center text-sm text-muted-foreground">
//                     {blog.likeCount.toLocaleString()}
//                   </TableCell>
//                   <TableCell className="hidden xl:table-cell text-sm text-muted-foreground whitespace-nowrap">
//                     {blog.publishedAt
//                       ? format(new Date(blog.publishedAt), "MMM d, yyyy")
//                       : "—"}
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-44">
//                         <DropdownMenuItem onClick={() => onEdit(blog)}>
//                           <Pencil className="h-4 w-4 mr-2" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem asChild>
//                           <a
//                             href={`/blogs/${blog.slug}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <ExternalLink className="h-4 w-4 mr-2" />
//                             View Live
//                           </a>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           onClick={() => setDeleteId(blog.id)}
//                           className="text-destructive focus:text-destructive"
//                         >
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Delete Confirmation */}
//       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. The blog post and its thumbnail will
//               be permanently deleted.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               disabled={deleting}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { Blog } from "@/types";
import { deleteBlogAction } from "@/actions/blog.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  Eye,
  Heart,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onRefresh: () => void;
  token: string;
};

const statusConfig = {
  PUBLISHED: {
    label: "Published",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  DRAFT: {
    label: "Draft",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  ARCHIVED: {
    label: "Archived",
    className:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  },
};

export default function BlogTable({ blogs, onEdit, onRefresh, token }: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    if (!token) {
      toast.error("Session expired. Please reload the page.");
      return;
    }

    setDeleting(true);
    const res = await deleteBlogAction(deleteId, token);
    setDeleting(false);
    setDeleteId(null);

    if (res.success) {
      toast.success(res.message);
      onRefresh();
    } else {
      toast.error(res.message);
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
          <Pencil className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">No blogs found</p>
        <p className="text-muted-foreground text-xs mt-1">
          Create your first blog post to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden px-6 py-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Blog</TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                <Eye className="h-4 w-4 mx-auto" />
              </TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                <Heart className="h-4 w-4 mx-auto" />
              </TableHead>
              <TableHead className="hidden xl:table-cell">Published</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, idx) => {
              const status = statusConfig[blog.status] || statusConfig.DRAFT;
              return (
                <TableRow key={blog.id} className="group">
                  <TableCell className="text-muted-foreground text-sm">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {blog.thumbnail ? (
                        <div className="relative h-10 w-16 rounded overflow-hidden shrink-0 bg-muted">
                          <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-16 rounded bg-muted shrink-0 flex items-center justify-center">
                          <Pencil className="h-4 w-4 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm truncate max-w-[200px]">
                            {blog.title}
                          </p>
                          {blog.isFeatured && (
                            <Star className="h-3.5 w-3.5 text-amber-500 shrink-0 fill-amber-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          /{blog.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs px-1.5 py-0"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0"
                        >
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-xs ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center text-sm text-muted-foreground">
                    {blog.viewCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center text-sm text-muted-foreground">
                    {blog.likeCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-muted-foreground whitespace-nowrap">
                    {blog.publishedAt
                      ? format(new Date(blog.publishedAt), "MMM d, yyyy")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => onEdit(blog)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(blog.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The blog post and its thumbnail will
              be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
