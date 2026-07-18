"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RefreshCw } from "lucide-react";
import type { IAward } from "@/types/awards.type";
import { AwardsTable } from "./AwardsTable";
import { AwardsDialog } from "./AwardsDialog";

const PAGE_SIZE = 10;

interface AwardsClientProps {
  awards: IAward[];
  token: string;
}

export function AwardsClient({ awards, token }: AwardsClientProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedAward, setSelectedAward] = useState<IAward | null>(null);

  const handleReset = () => {
    setQuery("");
    setStatusFilter("ALL");
    setPage(1);
    router.refresh();
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedAward(null);
    setDialogOpen(true);
  };

  const handleEdit = (award: IAward) => {
    setDialogMode("edit");
    setSelectedAward(award);
    setDialogOpen(true);
  };

  const filteredAwards = useMemo(() => {
    return awards.filter((award) => {
      const matchesSearch =
        !query.trim() ||
        award.title?.toLowerCase().includes(query.toLowerCase()) ||
        award.subTitle?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && award.isPublished) ||
        (statusFilter === "DRAFT" && !award.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [awards, query, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAwards.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedAwards = filteredAwards.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Awards Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your awards, certifications, and recognitions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search awards..."
            className="bg-white w-full md:w-72"
          />
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-36 rounded-lg border-primary/10 h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-lg" position="popper">
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleReset}
            >
              <RefreshCw size={16} className="mr-2" /> Reset
            </Button>
            <Button className="hover:cursor-pointer" onClick={handleAdd}>
              <Plus size={16} className="mr-2" /> Add Award
            </Button>
          </div>
        </div>
      </div>

      <AwardsTable
        awards={paginatedAwards}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredAwards.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
        token={token}
      />

      <AwardsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        award={selectedAward}
        mode={dialogMode}
        onSuccess={handleSuccess}
        token={token}
      />
    </div>
  );
}
