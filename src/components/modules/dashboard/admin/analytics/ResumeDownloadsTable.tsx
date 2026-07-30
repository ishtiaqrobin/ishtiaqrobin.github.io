"use client";

import { useState, useMemo } from "react";
import { Download, Search } from "lucide-react";
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
import type { ResumeDownloadLog } from "@/types/analytics.type";

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

export function ResumeDownloadsTable({
  rows,
}: {
  rows: ResumeDownloadLog[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter(
      (r) =>
        (r.country ?? "").toLowerCase().includes(needle) ||
        (r.ipAddress ?? "").toLowerCase().includes(needle),
    );
  }, [rows, q]);

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
        <Download className="h-10 w-10 opacity-50" />
        <p className="text-sm">No resume downloads yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by country or IP…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary" className="tabular-nums">
          {numberFmt.format(filtered.length)} / {numberFmt.format(rows.length)}
        </Badge>
      </div>

      <div className="rounded-lg border p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>User Agent</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.country ?? "—"}</TableCell>
                <TableCell className="font-mono text-xs">
                  {r.ipAddress ?? "—"}
                </TableCell>
                <TableCell className="max-w-60 truncate text-xs">
                  {r.userAgent ?? "—"}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right text-xs text-muted-foreground">
                  {formatDate(r.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
