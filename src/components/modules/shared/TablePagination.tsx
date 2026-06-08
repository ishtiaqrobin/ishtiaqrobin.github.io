"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TablePaginationProps {
    /** Current page (1-indexed) */
    page: number;
    /** Total number of pages */
    totalPages: number;
    /** Total number of records */
    total: number;
    /** Records per page */
    limit: number;
    /** Current page record count (to compute "X to Y of Z") */
    pageCount: number;
    /** Label shown after the count, e.g. "users" or "categories" */
    label?: string;
    onPageChange: (page: number) => void;
}

/** Builds page number list with ellipsis for long ranges */
function buildPages(current: number, total: number): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        pages.push(1);
        if (current > 3) pages.push("...");
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (current < total - 2) pages.push("...");
        pages.push(total);
    }

    return pages;
}

export default function TablePagination({
    page,
    totalPages,
    total,
    limit,
    pageCount,
    label = "records",
    onPageChange,
}: TablePaginationProps) {
    const from = pageCount > 0 ? (page - 1) * limit + 1 : 0;
    const to = Math.min(page * limit, total);
    const pages = buildPages(page, totalPages);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 border-t rounded-b-md bg-white">
            <div className="text-sm text-gray-600">
                Showing {from} to {to} of {total} {label}
            </div>

            <div className="flex gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    className="hover:cursor-pointer"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={14} />
                </Button>

                {pages.map((p, idx) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="px-3 py-1.5 text-gray-500 select-none"
                        >
                            …
                        </span>
                    ) : (
                        <Button
                            key={p}
                            size="sm"
                            variant={page === p ? "default" : "outline"}
                            className="hover:cursor-pointer min-w-[36px]"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </Button>
                    )
                )}

                <Button
                    size="sm"
                    variant="outline"
                    className="hover:cursor-pointer"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight size={14} />
                </Button>
            </div>
        </div>
    );
}
