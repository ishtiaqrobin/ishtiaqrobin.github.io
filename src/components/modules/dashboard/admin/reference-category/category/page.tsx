import CategoriesClient from "@/components/modules/dashboard/admin/category/CategoriesClient";
import { categoryService } from "@/services/category.service";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ isActive?: string; isPopular?: string }>;
}) {
  const params = await searchParams;

  const showInactive = params.isActive === "false";
  const showPopular = params.isPopular === "true";

  const fetchParams: Record<string, string> = {};
  if (!showInactive) fetchParams.isActive = "true";
  if (showPopular) fetchParams.isPopular = "true";

  const { data: categories } = await categoryService.getAll(fetchParams);

  return (
    <div className="space-y-6 min-h-screen">
      <CategoriesClient
        categories={categories || []}
        showInactiveDefault={showInactive}
        showPopularDefault={showPopular}
      />
    </div>
  );
}
