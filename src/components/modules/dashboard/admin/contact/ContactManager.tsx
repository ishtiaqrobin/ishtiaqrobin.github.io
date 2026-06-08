"use client";

import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  Mail,
  Trash2,
  RefreshCcw,
  Eye,
  MessageSquare,
  CheckCheck,
  Archive,
  Inbox,
  Loader2,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Copy,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  updateContactAction,
  deleteContactAction,
} from "@/actions/contact.action";
import { contactService } from "@/services/contact.service";
import type {
  IContact,
  IContactStat,
  ContactStatus,
} from "@/types/contact.type";

// ── Types ─────────────────────────────────────────────────────
interface ContactManagerProps {
  initialContacts: IContact[];
  initialStats: IContactStat[];
  token: string;
}

type SortField = "name" | "email" | "subject" | "status" | "createdAt";
type SortDir = "asc" | "desc";

// ── Config ────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ContactStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: LucideIcon;
    color: string;
  }
> = {
  UNREAD: {
    label: "Unread",
    variant: "destructive",
    icon: Inbox,
    color: "text-red-500",
  },
  READ: {
    label: "Read",
    variant: "secondary",
    icon: Eye,
    color: "text-blue-500",
  },
  REPLIED: {
    label: "Replied",
    variant: "default",
    icon: CheckCheck,
    color: "text-green-500",
  },
  ARCHIVED: {
    label: "Archived",
    variant: "outline",
    icon: Archive,
    color: "text-gray-400",
  },
};

const STAT_ICONS: Record<ContactStatus, LucideIcon> = {
  UNREAD: Inbox,
  READ: Eye,
  REPLIED: CheckCheck,
  ARCHIVED: Archive,
};

const STAT_COLORS: Record<ContactStatus, string> = {
  UNREAD: "bg-red-500/10 text-red-500 border-red-500/20",
  READ: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  REPLIED: "bg-green-500/10 text-green-500 border-green-500/20",
  ARCHIVED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

// ── Helpers ───────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs uppercase">
      {name[0]}
    </div>
  );
}

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
}) {
  if (field !== sortField)
    return <ArrowUpDown className="h-3 w-3 opacity-30" />;
  return sortDir === "asc" ? (
    <ArrowUp className="h-3 w-3 text-primary" />
  ) : (
    <ArrowDown className="h-3 w-3 text-primary" />
  );
}

// ─────────────────────────────────────────────────────────────
export function ContactManager({
  initialContacts,
  initialStats,
  token,
}: ContactManagerProps) {
  const [contacts, setContacts] = useState<IContact[]>(initialContacts);
  const [stats, setStats] = useState<IContactStat[]>(initialStats);
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "ALL">(
    "ALL",
  );
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<IContact | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IContact | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // ── Refresh ───────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const [contactsRes, statsRes] = await Promise.all([
      contactService.getAllContacts(token, {
        status: statusFilter === "ALL" ? undefined : statusFilter,
      }),
      contactService.getContactStats(token),
    ]);
    if (contactsRes.error) toast.error(contactsRes.error.message);
    else setContacts(contactsRes.data ?? []);
    if (statsRes.data) setStats(statsRes.data);
    setIsLoading(false);
    setSelectedIds(new Set());
  }, [token, statusFilter]);

  // ── Open detail ───────────────────────────────────────────
  const handleOpen = async (contact: IContact) => {
    setSelected(contact);
    setAdminNote(contact.adminNote ?? "");
    if (contact.status === "UNREAD") {
      const result = await updateContactAction(
        contact.id,
        { status: "READ" },
        token,
      );
      if (result.success) {
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? { ...c, status: "READ" } : c)),
        );
        setSelected((prev) => (prev ? { ...prev, status: "READ" } : prev));
      }
    }
  };

  // ── Status change ─────────────────────────────────────────
  const handleStatusChange = async (id: string, status: ContactStatus) => {
    const result = await updateContactAction(id, { status }, token);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c)),
      );
      setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
      toast.success("Status updated");
      fetchAll();
    } else {
      toast.error(result.message);
    }
  };

  // ── Save admin note ───────────────────────────────────────
  const handleSaveNote = async () => {
    if (!selected) return;
    setNoteLoading(true);
    const result = await updateContactAction(selected.id, { adminNote }, token);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === selected.id ? { ...c, adminNote } : c)),
      );
      setSelected((prev) => (prev ? { ...prev, adminNote } : prev));
      toast.success("Note saved");
    } else {
      toast.error(result.message);
    }
    setNoteLoading(false);
  };

  // ── Delete single ─────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id;
    const result = await deleteContactAction(id, token);
    if (result.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setSelected(null);
      setSelectedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      setDeleteConfirm(null);
      toast.success("Contact deleted");
      fetchAll();
    } else {
      toast.error(result.message);
    }
  };

  // ── Bulk delete ───────────────────────────────────────────
  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    const ids = Array.from(selectedIds);
    const results = await Promise.all(
      ids.map((id) => deleteContactAction(id, token)),
    );
    const failed = results.filter((r) => !r.success).length;
    setContacts((prev) => prev.filter((c) => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
    setBulkDeleteConfirm(false);
    if (failed > 0) toast.error(`${failed} deletion(s) failed`);
    else toast.success(`${ids.length} contact(s) deleted`);
    fetchAll();
    setBulkDeleting(false);
  };

  // ── Sorting ───────────────────────────────────────────────
  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // ── Checkbox helpers ──────────────────────────────────────
  const toggleOne = (id: string) =>
    setSelectedIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  // ── Filtered + sorted data ────────────────────────────────
  const filtered = useMemo(() => {
    let list = contacts;
    if (statusFilter !== "ALL")
      list = list.filter((c) => c.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          (c.message ?? "").toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      if (sortField === "createdAt") {
        va = new Date(a.createdAt).getTime();
        vb = new Date(b.createdAt).getTime();
      } else {
        va = (a[sortField] ?? "").toString().toLowerCase();
        vb = (b[sortField] ?? "").toString().toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [contacts, statusFilter, search, sortField, sortDir]);

  const total = stats.reduce((sum, s) => sum + s.total, 0);
  const allPageSelected =
    filtered.length > 0 && filtered.every((c) => selectedIds.has(c.id));

  const toggleAll = () => {
    if (allPageSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((c) => c.id)));
  };

  // ─────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="space-y-5">
        {/* ── Stat Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["UNREAD", "READ", "REPLIED", "ARCHIVED"] as ContactStatus[]).map(
            (s) => {
              const count = stats.find((x) => x.status === s)?.total ?? 0;
              const Icon = STAT_ICONS[s];
              const isActive = statusFilter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(isActive ? "ALL" : s)}
                  className={`
                  group relative rounded-xl border p-4 text-left transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5
                  ${
                    isActive
                      ? `${STAT_COLORS[s]} shadow-sm`
                      : "bg-card border-border hover:border-primary/30"
                  }
                `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-current/10" : "bg-muted"}`}
                    >
                      <Icon
                        className={`h-4 w-4 ${isActive ? "" : "text-muted-foreground"}`}
                      />
                    </div>
                    {isActive && <X className="h-3 w-3 opacity-60" />}
                  </div>
                  <p className="text-2xl font-bold leading-none tabular-nums">
                    {count}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {STATUS_CONFIG[s].label}
                  </p>
                </button>
              );
            },
          )}
        </div>

        {/* ── Toolbar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, subject…"
              className="pl-9 pr-9 h-9"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as ContactStatus | "ALL")}
            >
              <SelectTrigger className="h-9 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="ALL">All ({total})</SelectItem>
                {(
                  ["UNREAD", "READ", "REPLIED", "ARCHIVED"] as ContactStatus[]
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_CONFIG[s].label} (
                    {stats.find((x) => x.status === s)?.total ?? 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk delete */}
          {selectedIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-9 gap-2 flex-shrink-0"
              disabled={bulkDeleting}
              onClick={() => setBulkDeleteConfirm(true)}
            >
              {bulkDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                // <Trash2 className="h-3.5 w-3.5" />
                <></>
              )}
              Delete ({selectedIds.size})
            </Button>
          )}

          {/* Refresh */}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAll}
            disabled={isLoading}
            className="h-9 flex-shrink-0"
          >
            <RefreshCcw
              className={`mr-2 h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* ── Result count ───────────────────────────────── */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {contacts.length}
            </span>{" "}
            contacts
          </span>
          {selectedIds.size > 0 && (
            <span className="text-primary font-semibold">
              {selectedIds.size} selected
            </span>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-20 flex flex-col items-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Mail className="h-5 w-5 opacity-40" />
              </div>
              <p className="text-sm">No contacts found</p>
              {(search || statusFilter !== "ALL") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                  }}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    {/* Select all */}
                    <th className="w-10 px-4 py-3">
                      <Checkbox
                        checked={allPageSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                      />
                    </th>

                    {/* Sortable columns */}
                    {(
                      [
                        { field: "name" as SortField, label: "Sender" },
                        { field: "subject" as SortField, label: "Subject" },
                        { field: "status" as SortField, label: "Status" },
                        { field: "createdAt" as SortField, label: "Received" },
                      ] as { field: SortField; label: string }[]
                    ).map(({ field, label }) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left font-medium text-muted-foreground"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(field)}
                          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                          {label}
                          <SortIcon
                            field={field}
                            sortField={sortField}
                            sortDir={sortDir}
                          />
                        </button>
                      </th>
                    ))}

                    {/* Actions */}
                    <th className="w-16 px-4 py-3 text-right font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filtered.map((contact) => {
                    const cfg = STATUS_CONFIG[contact.status];
                    const isChecked = selectedIds.has(contact.id);
                    return (
                      <tr
                        key={contact.id}
                        className={`
                          group transition-colors hover:bg-muted/40
                          ${contact.status === "UNREAD" ? "bg-primary/[0.03]" : ""}
                          ${isChecked ? "bg-primary/5" : ""}
                        `}
                      >
                        {/* Checkbox */}
                        <td
                          className="px-4 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleOne(contact.id)}
                            aria-label={`Select ${contact.name}`}
                          />
                        </td>

                        {/* Sender */}
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleOpen(contact)}
                            className="flex items-center gap-3 text-left w-full"
                          >
                            <Avatar name={contact.name} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p
                                  className={`font-medium truncate ${contact.status === "UNREAD" ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {contact.name}
                                </p>
                                {contact.status === "UNREAD" && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                                {contact.email}
                              </p>
                            </div>
                          </button>
                        </td>

                        {/* Subject */}
                        <td className="px-4 py-3 max-w-[240px]">
                          <button
                            type="button"
                            onClick={() => handleOpen(contact)}
                            className="text-left w-full"
                          >
                            <p
                              className={`truncate ${contact.status === "UNREAD" ? "font-semibold" : "text-muted-foreground"}`}
                            >
                              {contact.subject}
                            </p>
                            {contact.message && (
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {contact.message}
                              </p>
                            )}
                          </button>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <Select
                            value={contact.status}
                            onValueChange={(v) =>
                              handleStatusChange(contact.id, v as ContactStatus)
                            }
                          >
                            <SelectTrigger className="h-7 w-28 border-0 bg-transparent p-0 focus:ring-0 [&>svg]:hidden">
                              <Badge
                                variant={cfg.variant}
                                className="text-[10px] cursor-pointer"
                              >
                                <cfg.icon className="h-2.5 w-2.5 mr-1" />
                                {cfg.label}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                [
                                  "UNREAD",
                                  "READ",
                                  "REPLIED",
                                  "ARCHIVED",
                                ] as ContactStatus[]
                              ).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const I = STATUS_CONFIG[s].icon;
                                      return <I className="h-3 w-3" />;
                                    })()}
                                    {STATUS_CONFIG[s].label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>

                        {/* Received */}
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center gap-1 cursor-default">
                                <Calendar className="h-3 w-3" />
                                {formatDistanceToNow(
                                  new Date(contact.createdAt),
                                  { addSuffix: true },
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {new Date(contact.createdAt).toLocaleString()}
                            </TooltipContent>
                          </Tooltip>
                        </td>

                        {/* Row actions */}
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleOpen(contact)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(contact)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Detail Modal ────────────────────────────────── */}
        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden max-h-[92vh] flex flex-col">
            {selected &&
              (() => {
                const cfg = STATUS_CONFIG[selected.status];
                const selectedIndex = filtered.findIndex(
                  (c) => c.id === selected.id,
                );
                const hasPrev = selectedIndex > 0;
                const hasNext = selectedIndex < filtered.length - 1;
                const noteChanged = adminNote !== (selected.adminNote ?? "");

                return (
                  <>
                    {/* ── Modal Header ── */}
                    <div className="flex items-center justify-start gap-8 px-5 py-3.5 border-b bg-muted/30 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-lg">
                          Contact Detail
                        </span>
                        {selectedIndex >= 0 && (
                          <span className="text-xs text-muted-foreground">
                            {selectedIndex + 1} / {filtered.length}
                          </span>
                        )}
                      </div>

                      {/* Prev / Next navigation */}
                      <div className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              disabled={!hasPrev}
                              onClick={() => {
                                handleOpen(filtered[selectedIndex - 1]);
                              }}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Previous</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              disabled={!hasNext}
                              onClick={() => {
                                handleOpen(filtered[selectedIndex + 1]);
                              }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Next</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* ── Scrollable body ── */}
                    <div className="overflow-y-auto flex-1">
                      {/* Sender hero */}
                      <div className="px-6 pt-5 pb-4 border-b">
                        <div className="flex items-start gap-4">
                          {/* Big avatar */}
                          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg uppercase flex-shrink-0">
                            {selected.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-base leading-tight">
                                {selected.name}
                              </h3>
                              <Badge
                                variant={cfg.variant}
                                className="text-[10px] h-5 px-2"
                              >
                                <cfg.icon className="h-2.5 w-2.5 mr-1" />
                                {cfg.label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <a
                                href={`mailto:${selected.email}`}
                                className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1"
                              >
                                {selected.email}
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        selected.email,
                                      );
                                      toast.success("Email copied!");
                                    }}
                                    className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                                  >
                                    <Copy className="h-2.5 w-2.5" />
                                    Copy
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Copy email address
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(selected.createdAt).toLocaleString(
                                "en-US",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                },
                              )}
                              <span className="text-muted-foreground/60">
                                (
                                {formatDistanceToNow(
                                  new Date(selected.createdAt),
                                  { addSuffix: true },
                                )}
                                )
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-5 space-y-5">
                        {/* Subject */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Subject
                          </p>
                          <p className="text-sm font-semibold leading-snug">
                            {selected.subject}
                          </p>
                        </div>

                        {/* Message */}
                        {selected.message && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              Message
                            </p>
                            <div className="p-4 rounded-xl bg-muted/60 border text-sm leading-relaxed whitespace-pre-wrap">
                              {selected.message}
                            </div>
                          </div>
                        )}

                        {/* Divider */}
                        {/* <div className="h-px bg-border" /> */}

                        {/* Status change */}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              Status
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Change the conversation status
                            </p>
                          </div>
                          <Select
                            value={selected.status}
                            onValueChange={(v) =>
                              handleStatusChange(
                                selected.id,
                                v as ContactStatus,
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-36 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {(
                                [
                                  "UNREAD",
                                  "READ",
                                  "REPLIED",
                                  "ARCHIVED",
                                ] as ContactStatus[]
                              ).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const I = STATUS_CONFIG[s].icon;
                                      return <I className="h-3 w-3" />;
                                    })()}
                                    {STATUS_CONFIG[s].label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quick status buttons */}
                        {/* <div className="flex gap-2 flex-wrap">
                          {(["READ", "REPLIED", "ARCHIVED"] as ContactStatus[])
                            .filter((s) => s !== selected.status)
                            .map((s) => {
                              const I = STATUS_CONFIG[s].icon;
                              return (
                                <Button
                                  key={s}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs gap-1.5"
                                  onClick={() =>
                                    handleStatusChange(selected.id, s)
                                  }
                                >
                                  <I className="h-3 w-3" />
                                  Mark as {STATUS_CONFIG[s].label}
                                </Button>
                              );
                            })}
                        </div> */}

                        {/* Divider */}
                        <div className="h-px bg-border" />

                        {/* Admin note */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Admin Note
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Private — not visible to the sender
                              </p>
                            </div>
                            {noteChanged && (
                              <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                                Unsaved
                              </span>
                            )}
                          </div>
                          <Textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            placeholder="Add a private note…"
                            className="min-h-[90px] resize-none rounded-xl text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveNote}
                            disabled={noteLoading || !noteChanged}
                            className="w-full"
                          >
                            {noteLoading ? (
                              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CheckCheck className="mr-2 h-3.5 w-3.5" />
                            )}
                            {noteLoading ? "Saving…" : "Save Note"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* ── Sticky Footer Actions ── */}
                    <div className="flex items-center gap-2 px-6 py-4 border-t bg-background flex-shrink-0">
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        asChild
                        onClick={() =>
                          handleStatusChange(selected.id, "REPLIED")
                        }
                      >
                        <a
                          href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="text-sm hover:text-primary hover:underline underline-offset-2">
                            Reply via Email
                          </span>
                        </a>
                      </Button>

                      {/* <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2 px-4"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this contact?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. The message from{" "}
                              <strong>{selected.name}</strong> will be
                              permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(selected.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog> */}
                    </div>
                  </>
                );
              })()}
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Single Delete Confirm Dialog ─────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the message from{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              // variant="destructive"
              onClick={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Bulk Delete Confirm Dialog ───────────────────── */}
      <Dialog
        open={bulkDeleteConfirm}
        onOpenChange={(open) => !bulkDeleting && setBulkDeleteConfirm(open)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.size} Contact(s)</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedIds.size} selected contact(s)
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setBulkDeleteConfirm(false)}
              disabled={bulkDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              // variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex-1"
            >
              {bulkDeleting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
