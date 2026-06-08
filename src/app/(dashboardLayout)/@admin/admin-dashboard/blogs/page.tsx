// // app/(admin)/admin-dashboard/blogs/page.tsx
// // Server Component

// import { blogService } from "@/services/blog.service";
// import BlogClient from "@/components/modules/dashboard/admin/blog/BlogClient";

// export const metadata = {
//   title: "Blog Management | Admin",
// };

// export default async function BlogPage() {
//   const [blogsResult, tagsResult] = await Promise.all([
//     blogService.getBlogs(),
//     blogService.getBlogTags(),
//   ]);

//   const blogs = blogsResult.data ?? [];
//   const tags = tagsResult.data ?? [];

//   return <BlogClient initialBlogs={blogs} tags={tags} />;
// }

// app/(admin)/admin-dashboard/blogs/page.tsx
// Server Component

import { blogService } from "@/services/blog.service";
import { sessionService } from "@/services/session.service";
import BlogClient from "@/components/modules/dashboard/admin/blog/BlogClient";

export const metadata = {
  title: "Blog Management | Admin",
};

export default async function BlogPage() {
  const [sessionResult, blogsResult, tagsResult] = await Promise.all([
    sessionService.getSession(),
    blogService.getBlogs(),
    blogService.getBlogTags(),
  ]);

  const token = sessionResult.data?.session.token ?? "";
  const blogs = blogsResult.data ?? [];
  const tags = tagsResult.data ?? [];

  return <BlogClient initialBlogs={blogs} tags={tags} token={token} />;
}
