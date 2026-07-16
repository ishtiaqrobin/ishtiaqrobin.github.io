"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, RefreshCw, Star, Trash2 } from "lucide-react";
import type { ICategory } from "@/types/category.type";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";

const PAGE_SIZE = 10;

interface CategoriesClientProps {
  categories: ICategory[];
  showInactiveDefault: boolean;
  showPopularDefault?: boolean;
}

export default function CategoriesClient({
  categories,
  showInactiveDefault,
  showPopularDefault = false,
}: CategoriesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const handleToggleInactive = (checked: boolean) => {
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("isActive", "false");
    } else {
      params.delete("isActive");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTogglePopular = (checked: boolean) => {
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("isPopular", "true");
    } else {
      params.delete("isPopular");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setQuery("");
    setPage(1);
    router.push(pathname);
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category: ICategory) => {
    setDialogMode("edit");
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  // Client-side search within the loaded categories
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(q) ||
        cat.slug?.toLowerCase().includes(q),
    );
  }, [categories, query]);

  // Pagination derived values
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedCategories = filteredCategories.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="bg-white w-full md:w-[300px]"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleReset}
            >
              <RefreshCw size={16} className="mr-2" /> Reset
            </Button>
            <Button className="hover:cursor-pointer" onClick={handleAdd}>
              <Plus size={16} className="mr-2" /> Add Category
            </Button>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() => router.push("/admin-dashboard/categories/trash")}
            >
              <Trash2 size={16} className="mr-2" /> Trash
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="show-inactive"
            checked={showInactiveDefault}
            onCheckedChange={handleToggleInactive}
            className="hover:cursor-pointer"
          />
          <label
            htmlFor="show-inactive"
            className="text-sm font-medium hover:cursor-pointer"
          >
            Show inactive
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="show-popular"
            checked={showPopularDefault}
            onCheckedChange={handleTogglePopular}
            className="hover:cursor-pointer"
          />
          <label
            htmlFor="show-popular"
            className="text-sm font-medium hover:cursor-pointer flex items-center gap-1"
          >
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            Popular only
          </label>
        </div>
      </div>

      <CategoryTable
        categories={paginatedCategories}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredCategories.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
      />

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={selectedCategory}
        mode={dialogMode}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
