import CategoriesClient from "@/components/modules/dashboard/admin/category/CategoriesClient";
import { categoryService } from "@/services/category.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const { data: categories } = await categoryService.getAllCategories();

  return (
    <div className="space-y-6 min-h-screen">
      <CategoriesClient
        categories={categories || []}
        token={token}
      />
    </div>
  );
}
