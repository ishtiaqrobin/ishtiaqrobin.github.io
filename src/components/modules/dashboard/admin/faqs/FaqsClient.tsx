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
import type { IFaq } from "@/types/faq.type";
import { FaqsTable } from "./FaqsTable";
import { FaqsDialog } from "./FaqsDialog";

const PAGE_SIZE = 10;

interface FaqsClientProps {
  faqs: IFaq[];
  token: string;
}

export function FaqsClient({ faqs, token }: FaqsClientProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedFaq, setSelectedFaq] = useState<IFaq | null>(null);

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
    setSelectedFaq(null);
    setDialogOpen(true);
  };

  const handleEdit = (faq: IFaq) => {
    setDialogMode("edit");
    setSelectedFaq(faq);
    setDialogOpen(true);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        !query.trim() ||
        faq.question?.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && faq.isPublished) ||
        (statusFilter === "DRAFT" && !faq.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [faqs, query, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFaqs.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedFaqs = filteredFaqs.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage frequently asked questions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search FAQs..."
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
              <Plus size={16} className="mr-2" /> Add FAQ
            </Button>
          </div>
        </div>
      </div>

      <FaqsTable
        faqs={paginatedFaqs}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredFaqs.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
        token={token}
      />

      <FaqsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        faq={selectedFaq}
        mode={dialogMode}
        onSuccess={handleSuccess}
        token={token}
      />
    </div>
  );
}
