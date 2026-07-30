"use client";

import { useState, useMemo } from "react";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { PageView } from "@/types/analytics.type";

const numberFmt = new Intl.NumberFormat("en-US");

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const truncate = (str: string | null | undefined, max = 48) => {
  if (!str) return "—";
  return str.length > max ? `${str.slice(0, max)}…` : str;
};

function EmptyState({
  icon: Icon,
  label,
}: {
  icon: typeof Eye;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
      <Icon className="h-10 w-10 opacity-50" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function PageViewsTable({ rows }: { rows: PageView[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter(
      (r) =>
        r.page.toLowerCase().includes(needle) ||
        (r.country ?? "").toLowerCase().includes(needle) ||
        (r.city ?? "").toLowerCase().includes(needle) ||
        (r.ipAddress ?? "").toLowerCase().includes(needle) ||
        (r.referrer ?? "").toLowerCase().includes(needle),
    );
  }, [rows, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by page, country, IP…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary" className="tabular-nums">
          {numberFmt.format(filtered.length)} / {numberFmt.format(rows.length)}
        </Badge>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Eye} label="No page views match your filter" />
      ) : (
        <div className="rounded-lg border p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead className="text-right">When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 200).map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.page}</TableCell>
                  <TableCell>{r.country ?? "—"}</TableCell>
                  <TableCell>{r.city ?? "—"}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {r.ipAddress ?? "—"}
                  </TableCell>
                  <TableCell
                    className="max-w-55 truncate text-xs"
                    title={r.referrer ?? ""}
                  >
                    {truncate(r.referrer, 40)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right text-xs text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length > 200 && (
            <p className="border-t px-4 py-2 text-center text-xs text-muted-foreground">
              Showing first 200 of {numberFmt.format(filtered.length)} rows
            </p>
          )}
        </div>
      )}
    </div>
  );
}
