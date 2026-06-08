// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";
// import { Blog, BlogTag } from "@/types/blog.type";
// import BlogForm from "./BlogForm";
// import { ScrollArea } from "@/components/ui/scroll-area";

// type Props = {
//   open: boolean;
//   onClose: (refresh?: boolean) => void;
//   blog: Blog | null;
//   tags: BlogTag[];
// };

// export default function BlogDialog({ open, onClose, blog, tags }: Props) {
//   return (
//     <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
//       <SheetContent
//         side="right"
//         className="w-full sm:max-w-3xl p-0 flex flex-col"
//       >
//         <SheetHeader className="px-6 py-4 border-b shrink-0">
//           <SheetTitle className="text-lg font-semibold">
//             {blog ? "Edit Blog Post" : "Create New Blog Post"}
//           </SheetTitle>
//           <SheetDescription className="text-sm text-muted-foreground">
//             {blog
//               ? "Update the blog post content and settings."
//               : "Write a new blog post with the editor below."}
//           </SheetDescription>
//         </SheetHeader>
//         <ScrollArea className="flex-1 overflow-y-auto">
//           <div className="px-6 py-4">
//             <BlogForm blog={blog} tags={tags} onSuccess={() => onClose(true)} />
//           </div>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Blog, BlogTag } from "@/types";
import BlogForm from "./BlogForm";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  open: boolean;
  onClose: (refresh?: boolean) => void;
  blog: Blog | null;
  tags: BlogTag[];
  token: string;
};

export default function BlogDialog({
  open,
  onClose,
  blog,
  tags,
  token,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle className="text-lg font-semibold">
            {blog ? "Edit Blog Post" : "Create New Blog Post"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {blog
              ? "Update the blog post content and settings."
              : "Write a new blog post with the editor below."}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            <BlogForm
              blog={blog}
              tags={tags}
              token={token}
              onSuccess={() => onClose(true)}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
