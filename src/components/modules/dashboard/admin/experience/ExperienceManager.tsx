"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  Briefcase,
  Loader2,
  Building2,
  CalendarDays,
  MapPin,
  ExternalLink,
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/actions/experience.action";
import { IExperience } from "@/types";

interface ExperienceManagerProps {
  experiences: IExperience[];
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

// ─── Shared form ──────────────────────────────────────────────────────────────
function ExperienceForm({ item }: { item: IExperience | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="title">Job Title *</FieldLabel>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title || ""}
          placeholder="e.g. Senior Backend Developer"
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="company">Company Name *</FieldLabel>
        <Input
          id="company"
          name="company"
          defaultValue={item?.company || ""}
          placeholder="e.g. Creative Agency Ltd."
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
        <FieldLabel htmlFor="endDate">End Date (Optional)</FieldLabel>
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

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="location">Location</FieldLabel>
        <Input
          id="location"
          name="location"
          defaultValue={item?.location || ""}
          placeholder="e.g. Dhaka, Bangladesh (Remote)"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description">Description *</FieldLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          placeholder="Describe your responsibilities, achievements, etc..."
          required
          className="rounded-xl resize-none"
          rows={4}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="companyUrl">Company URL (Optional)</FieldLabel>
        <Input
          id="companyUrl"
          type="url"
          name="companyUrl"
          defaultValue={item?.companyUrl || ""}
          placeholder="https://company.com"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="companyLogo">
          Company Logo URL (Optional)
        </FieldLabel>
        <Input
          id="companyLogo"
          type="url"
          name="companyLogo"
          defaultValue={item?.companyLogo || ""}
          placeholder="https://.../logo.png"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
        <Input
          id="sortOrder"
          type="number"
          name="sortOrder"
          min={0}
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
export function ExperienceManager({
  experiences,
  token,
  onRefresh,
  isLoading = false,
}: ExperienceManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IExperience | null>(null);
  const [selectedItem, setSelectedItem] = useState<IExperience | null>(null);

  // ── helpers ───────────────────────────────────────────────────────
  const parseFormData = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      title: fd.get("title") as string,
      company: fd.get("company") as string,
      startDate: new Date(fd.get("startDate") as string).toISOString(),
      endDate: fd.get("endDate")
        ? new Date(fd.get("endDate") as string).toISOString()
        : null,
      location: (fd.get("location") as string) || null,
      description: fd.get("description") as string,
      companyUrl: (fd.get("companyUrl") as string) || null,
      companyLogo: (fd.get("companyLogo") as string) || null,
      isPublished: fd.get("isPublished") === "on",
      sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : 0,
    };
  };

  const formatYear = (date: string) => new Date(date).getFullYear();

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createExperienceAction(
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
    const result = await updateExperienceAction(
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
    const result = await deleteExperienceAction(deleteConfirm.id, token);
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
            <CardTitle>Professional Experience</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {experiences.length} total ·{" "}
              {experiences.filter((e) => e.isPublished).length} published
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateDialog(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Logo / Icon */}
                    <TableCell>
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                        {item.companyLogo ? (
                          <Image
                            src={item.companyLogo}
                            alt={item.company}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Briefcase className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </TableCell>

                    {/* Position / Title */}
                    <TableCell className="font-medium max-w-[180px]">
                      <p className="truncate">{item.title}</p>
                    </TableCell>

                    {/* Company */}
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5 shrink-0" />
                        {item.companyUrl ? (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary inline-flex items-center gap-1 truncate max-w-[140px]"
                          >
                            {item.company}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="truncate max-w-[140px]">
                            {item.company}
                          </span>
                        )}
                      </div>
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

                    {/* Location */}
                    <TableCell className="text-sm">
                      {item.location ? (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate max-w-[120px]">
                            {item.location}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
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

          {experiences.length === 0 && (
            <div className="text-center py-16">
              <Briefcase className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No experience records yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first work experience to get started
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
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
              <DialogTitle>Add Experience</DialogTitle>
              <DialogDescription>
                Add a new work experience record to your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <ExperienceForm item={null} />
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
              <DialogTitle>Edit Experience</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.title}
                </span>{" "}
                at {selectedItem?.company}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <ExperienceForm item={selectedItem} />
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
            <DialogTitle>Delete Experience Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.title}
              </span>{" "}
              at {deleteConfirm?.company}? This action cannot be undone.
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
