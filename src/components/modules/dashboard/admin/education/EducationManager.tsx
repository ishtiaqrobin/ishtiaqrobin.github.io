"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  GraduationCap,
  Loader2,
  Building2,
  CalendarDays,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createEducationAction,
  updateEducationAction,
  deleteEducationAction,
} from "@/actions/education.action";
import { IEducation } from "@/types";

interface EducationManagerProps {
  educations: IEducation[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── Field Label helper ───────────────────────────────────────────────────────
function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="text-[11px] font-bold tracking-wider text-muted-foreground"
    >
      {children}
    </Label>
  );
}

// ─── Shared form ─────────────────────────────────────────────────────────────
function EducationForm({ item }: { item: IEducation | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="degree">Degree / Certification *</FieldLabel>
        <Input
          id="degree"
          name="degree"
          defaultValue={item?.degree || ""}
          placeholder="e.g. B.Sc in Computer Science"
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="institution">Institution *</FieldLabel>
        <Input
          id="institution"
          name="institution"
          defaultValue={item?.institution || ""}
          placeholder="e.g. University of Dhaka"
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="startDate">Start Date *</FieldLabel>
        <Input
          id="startDate"
          type="date"
          name="startDate"
          defaultValue={
            item?.startDate
              ? new Date(item.startDate).toISOString().split("T")[0]
              : ""
          }
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="endDate">End Date</FieldLabel>
        <Input
          id="endDate"
          type="date"
          name="endDate"
          defaultValue={
            item?.endDate
              ? new Date(item.endDate).toISOString().split("T")[0]
              : ""
          }
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="board">Board</FieldLabel>
        <Input
          id="board"
          name="board"
          defaultValue={item?.board || ""}
          placeholder="e.g. Dhaka Board"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="group">Group / Major</FieldLabel>
        <Input
          id="group"
          name="group"
          defaultValue={item?.group || ""}
          placeholder="e.g. Science"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="result">Result *</FieldLabel>
        <Input
          id="result"
          name="result"
          defaultValue={item?.result || ""}
          placeholder="e.g. GPA 4.75 out of 5.00"
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
        <Input
          id="sortOrder"
          type="number"
          name="sortOrder"
          min="0"
          defaultValue={item?.sortOrder ?? 0}
          className="rounded-xl h-10"
        />
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 self-end">
        <Label
          htmlFor="isPublished"
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Check className="h-4 w-4 text-green-500" />
          Published
        </Label>
        <Switch
          id="isPublished"
          name="isPublished"
          defaultChecked={item ? item.isPublished : true}
        />
      </div>
    </div>
  );
}

// ─── Main Manager ─────────────────────────────────────────────────────────────
export function EducationManager({
  educations,
  token,
  onRefresh,
  isLoading = false,
}: EducationManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IEducation | null>(null);
  const [selectedItem, setSelectedItem] = useState<IEducation | null>(null);

  // ── helpers ───────────────────────────────────────────────────────
  const parseFormData = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const sortOrderRaw = fd.get("sortOrder");
    return {
      degree: fd.get("degree") as string,
      institution: fd.get("institution") as string,
      board: (fd.get("board") as string) || null,
      startDate: new Date(fd.get("startDate") as string).toISOString(),
      endDate: fd.get("endDate")
        ? new Date(fd.get("endDate") as string).toISOString()
        : null,
      result: fd.get("result") as string,
      group: (fd.get("group") as string) || null,
      isPublished: fd.get("isPublished") === "on",
      sortOrder: sortOrderRaw ? Number(sortOrderRaw) : 0,
    };
  };

  const formatYear = (date: string) => new Date(date).getFullYear();

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createEducationAction(
      parseFormData(e.currentTarget),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setCreateDialog(false);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Edit ──────────────────────────────────────────────────────────
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);
    const result = await updateEducationAction(
      selectedItem.id,
      parseFormData(e.currentTarget),
      token,
    );
    if (result.success) {
      toast.success(result.message);
      setEditDialog(false);
      setSelectedItem(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    const result = await deleteEducationAction(deleteConfirm.id, token);
    if (result.success) {
      toast.success(result.message);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Education History</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {educations.length} total ·{" "}
              {educations.filter((e) => e.isPublished).length} published
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateDialog(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educations.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Icon */}
                    <TableCell>
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                    </TableCell>

                    {/* Degree */}
                    <TableCell className="font-medium max-w-[180px]">
                      <p className="truncate">{item.degree}</p>
                      {item.group && (
                        <p className="text-[11px] text-muted-foreground truncate">
                          {item.group}
                        </p>
                      )}
                    </TableCell>

                    {/* Institution */}
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate max-w-[160px]">
                          {item.institution}
                        </span>
                      </div>
                      {item.board && (
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5 ml-5">
                          {item.board}
                        </p>
                      )}
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        <span>
                          {formatYear(item.startDate)} –{" "}
                          {item.endDate ? formatYear(item.endDate) : "Present"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Sort Order */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold"
                      >
                        <ArrowUpDown className="h-2.5 w-2.5 mr-1" />
                        {item.sortOrder ?? 0}
                      </Badge>
                    </TableCell>

                    {/* Result */}
                    <TableCell>
                      {item.result ? (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold"
                        >
                          {item.result}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={item.isPublished ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item);
                              setEditDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(item)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {educations.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No education records yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first education entry to get started
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Create Dialog ─────────────────────────────────────────── */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Add Education</DialogTitle>
              <DialogDescription>
                Add a new education record to your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <EducationForm item={null} />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialog(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit Education</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.degree}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <EducationForm item={selectedItem} />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialog(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ─────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Education Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.degree}
              </span>{" "}
              from {deleteConfirm?.institution}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              // variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
