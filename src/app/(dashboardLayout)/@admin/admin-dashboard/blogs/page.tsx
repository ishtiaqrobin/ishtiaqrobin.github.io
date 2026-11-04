import { BlogClient } from "@/components/modules/dashboard/admin/blog/BlogClient";
import { blogService } from "@/services/blog.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;

  const [blogsRes, tagsRes] = await Promise.all([
    blogService.getBlogs({ page: 1, limit: 10 }, token),
    blogService.getTags(),
  ]);

  return (
    <div className="min-h-screen space-y-6">
      <BlogClient
        initialBlogs={blogsRes.data?.data ?? []}
        initialMeta={
          blogsRes.data?.meta ?? {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          }
        }
        tags={tagsRes.data ?? []}
        token={token}
      />
    </div>
  );
}
