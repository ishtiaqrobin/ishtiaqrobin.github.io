import { blogService } from "@/services/blog.service";
import { sessionService } from "@/services/session.service";
import CommentClient from "@/components/modules/dashboard/admin/comment/CommentClient";

export const metadata = {
  title: "Comment Management | Admin",
};

export default async function CommentsPage() {
  const sessionResult = await sessionService.getSession();
  const token = sessionResult.data?.session.token ?? "";

  const commentsResult = await blogService.getComments(token);
  const comments = commentsResult.data ?? [];

  return <CommentClient initialComments={comments} token={token} />;
}
