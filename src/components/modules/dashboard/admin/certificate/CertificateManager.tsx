/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  Award,
  Loader2,
  ExternalLink,
  CalendarDays,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

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
  createCertificateAction,
  updateCertificateAction,
  deleteCertificateAction,
  toggleCertificatePublishAction,
} from "@/actions/certificate.action";

import { certificateService } from "@/services/certificate.service";
import type { ICategory, ICategoryPayload } from "@/types/certificate.type";
import Image from "next/image";

interface CertificateManagerProps {
  certificates: ICategory[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

const EMPTY_FORM: ICategoryPayload = {
  title: "",
  issuer: "",
  issuedDate: "",
  expiryDate: null,
  credentialId: "",
  credentialUrl: "",
  isPublished: true,
  sortOrder: 0,
};

// ─── Small helper: field label ────────────────────────────────────────────────
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

// ─── Create / Edit Form ───────────────────────────────────────────────────────
interface CertFormProps {
  initial: ICategoryPayload;
  imageFile: File | null;
  onFormChange: (field: keyof ICategoryPayload, value: any) => void;
  onImageChange: (file: File | null) => void;
}

function CertificateForm({
  initial,
  imageFile,
  onFormChange,
  onImageChange,
}: CertFormProps) {
  // const [isPublished, setIsPublished] = useState(true);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="title">Title *</FieldLabel>
          <Input
            id="title"
            placeholder="AWS Solutions Architect"
            value={initial.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            className="rounded-xl h-10"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="issuer">Issuer *</FieldLabel>
          <Input
            id="issuer"
            placeholder="Amazon Web Services"
            value={initial.issuer}
            onChange={(e) => onFormChange("issuer", e.target.value)}
            className="rounded-xl h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="issuedDate">Issued Date *</FieldLabel>
          <Input
            id="issuedDate"
            type="date"
            value={initial.issuedDate?.slice(0, 10)}
            onChange={(e) => onFormChange("issuedDate", e.target.value)}
            className="rounded-xl h-10"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="expiryDate">Expiry Date</FieldLabel>
          <Input
            id="expiryDate"
            type="date"
            value={initial.expiryDate?.slice(0, 10) ?? ""}
            onChange={(e) =>
              onFormChange("expiryDate", e.target.value || undefined)
            }
            className="rounded-xl h-10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="credentialId">Credential ID</FieldLabel>
        <Input
          id="credentialId"
          placeholder="ABC-12345-XYZ"
          value={initial.credentialId ?? ""}
          onChange={(e) =>
            onFormChange("credentialId", e.target.value || undefined)
          }
          className="rounded-xl h-10 font-mono text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="credentialUrl">Credential URL</FieldLabel>
        <Input
          id="credentialUrl"
          type="url"
          placeholder="https://www.credly.com/badges/..."
          value={initial.credentialUrl ?? ""}
          onChange={(e) =>
            onFormChange("credentialUrl", e.target.value || undefined)
          }
          className="rounded-xl h-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
          <Input
            id="sortOrder"
            type="number"
            min={0}
            value={initial.sortOrder ?? 0}
            onChange={(e) =>
              onFormChange("sortOrder", parseInt(e.target.value, 10) || 0)
            }
            className="rounded-xl h-10"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="certImage">Certificate Image</FieldLabel>
          <Input
            id="certImage"
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
            className="rounded-xl h-10 cursor-pointer file:mr-3 file:text-xs"
          />
          {imageFile && (
            <p className="text-xs text-muted-foreground truncate">
              {imageFile.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <Switch
          id="isPublished"
          checked={initial.isPublished ?? true}
          onCheckedChange={(v) => onFormChange("isPublished", v)}
          // checked={isPublished}
          // onCheckedChange={setIsPublished}
        />
        <Label htmlFor="isPublished" className="text-sm cursor-pointer">
          Published (visible on portfolio)
        </Label>
      </div>
    </div>
  );
}

// ─── Main Manager ──────────────────────────────────────────────────────────────
export function CertificateManager({
  certificates,
  token,
  onRefresh,
  isLoading = false,
}: CertificateManagerProps) {
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<ICategory | null>(null);
  const [selectedCert, setSelectedCert] = useState<ICategory | null>(null);

  // Form state
  const [formData, setFormData] = useState<ICategoryPayload>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const updateField = useCallback(
    (field: keyof ICategoryPayload, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // ── Create ────────────────────────────────────────────────────────
  const openCreate = () => {
    setFormData(EMPTY_FORM);
    setImageFile(null);
    setCreateDialog(true);
  };

  const handleCreate = useCallback(async () => {
    if (
      !formData.title.trim() ||
      !formData.issuer.trim() ||
      !formData.issuedDate
    ) {
      toast.error("Title, Issuer, and Issued Date are required");
      return;
    }

    setLoading(true);

    // If there's an image file we call the service directly (FormData upload)
    // then trigger revalidation via the action after success
    let result;
    if (imageFile) {
      const { data, error } = await certificateService.createCertificate(
        token,
        formData,
        imageFile,
      );
      result = error
        ? { success: false, message: error.message }
        : { success: true, message: "Certificate created successfully", data };
    } else {
      result = await createCertificateAction(formData, token);
    }

    if (result.success) {
      toast.success(result.message);
      setCreateDialog(false);
      setFormData(EMPTY_FORM);
      setImageFile(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [formData, imageFile, token, onRefresh]);

  // ── Edit ──────────────────────────────────────────────────────────
  const openEdit = (cert: ICategory) => {
    setSelectedCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issuedDate: cert.issuedDate,
      expiryDate: cert.expiryDate,
      credentialId: cert.credentialId,
      credentialUrl: cert.credentialUrl,
      isPublished: cert.isPublished,
      sortOrder: cert.sortOrder,
    });
    setImageFile(null);
    setEditDialog(true);
  };

  const handleEdit = useCallback(async () => {
    if (!selectedCert) return;
    if (
      !formData.title?.trim() ||
      !formData.issuer?.trim() ||
      !formData.issuedDate
    ) {
      toast.error("Title, Issuer, and Issued Date are required");
      return;
    }

    setLoading(true);

    let result;
    if (imageFile) {
      const { data, error } = await certificateService.updateCertificate(
        token,
        selectedCert.id,
        formData,
        imageFile,
      );
      result = error
        ? { success: false, message: error.message }
        : { success: true, message: "Certificate updated successfully", data };
    } else {
      result = await updateCertificateAction(selectedCert.id, formData, token);
    }

    if (result.success) {
      toast.success(result.message);
      setEditDialog(false);
      setSelectedCert(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [selectedCert, formData, imageFile, token, onRefresh]);

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = useCallback(async () => {
    if (!deleteConfirm) return;
    setLoading(true);

    const result = await deleteCertificateAction(deleteConfirm.id, token);
    if (result.success) {
      toast.success(result.message);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [deleteConfirm, token, onRefresh]);

  // ── Toggle publish ────────────────────────────────────────────────
  const handleTogglePublish = useCallback(
    async (cert: ICategory) => {
      setLoading(true);
      const result = await toggleCertificatePublishAction(
        cert.id,
        !cert.isPublished,
        token,
      );
      if (result.success) {
        toast.success(result.message);
        onRefresh();
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    },
    [token, onRefresh],
  );

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
            <CardTitle>Certificates</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {certificates.length} total ·{" "}
              {certificates.filter((c) => c.isPublished).length} published
            </p>
          </div>
          <Button size="sm" onClick={openCreate} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert, i) => (
                  <motion.tr
                    key={cert.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="h-9 w-9 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0">
                        {cert.imageUrl ? (
                          <Image
                            src={cert.imageUrl}
                            alt={cert.title}
                            width={300}
                            height={300}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Award className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium max-w-45">
                      <p className="truncate">{cert.title}</p>
                      {cert.credentialId && (
                        <p className="text-[11px] font-mono text-muted-foreground truncate">
                          {cert.credentialId}
                        </p>
                      )}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </TableCell>

                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarDays className="h-3 w-3 shrink-0" />
                        {new Date(cert.issuedDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>

                    {/* Expiry */}
                    <TableCell className="text-sm">
                      {cert.expiryDate ? (
                        <Badge
                          variant={
                            new Date(cert.expiryDate) < new Date()
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {new Date(cert.expiryDate) < new Date()
                            ? "Expired"
                            : new Date(cert.expiryDate).toLocaleDateString(
                                "en-US",
                                { month: "short", year: "numeric" },
                              )}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No expiry
                        </span>
                      )}
                    </TableCell>

                    {/* Sort Order */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold"
                      >
                        <ArrowUpDown className="h-2.5 w-2.5 mr-1" />
                        {cert.sortOrder ?? 0}
                      </Badge>
                    </TableCell>

                    {/* Published */}
                    <TableCell>
                      <Badge
                        variant={cert.isPublished ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {cert.isPublished ? "Published" : "Draft"}
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
                          <DropdownMenuItem onClick={() => openEdit(cert)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleTogglePublish(cert)}
                          >
                            {cert.isPublished ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          {cert.credentialUrl && (
                            <DropdownMenuItem asChild>
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Verify
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(cert)}
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

          {certificates.length === 0 && (
            <div className="text-center py-16">
              <Award className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No certificates yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first certificate to get started
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={openCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Certificate
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Create Dialog ─────────────────────────────────────────── */}
      <Dialog
        open={createDialog}
        onOpenChange={(open) => {
          if (!open) {
            setFormData(EMPTY_FORM);
            setImageFile(null);
          }
          setCreateDialog(open);
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Certificate</DialogTitle>
            <DialogDescription>
              Add a new professional certification or credential
            </DialogDescription>
          </DialogHeader>

          <CertificateForm
            initial={formData}
            imageFile={imageFile}
            onFormChange={updateField}
            onImageChange={setImageFile}
          />

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setCreateDialog(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Certificate</DialogTitle>
            <DialogDescription>
              Update the details for{" "}
              <span className="font-medium">{selectedCert?.title}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Current image preview */}
          {selectedCert?.imageUrl && !imageFile && (
            <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
              <Image
                src={selectedCert.imageUrl}
                width={48}
                height={48}
                alt="Current"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-xs font-medium">Current image</p>
                <p className="text-[11px] text-muted-foreground">
                  Upload a new image to replace
                </p>
              </div>
            </div>
          )}

          <CertificateForm
            initial={formData}
            imageFile={imageFile}
            onFormChange={updateField}
            onImageChange={setImageFile}
          />

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setEditDialog(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ─────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Certificate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.title}
              </span>
              ? This will also remove the image from Cloudinary. This action
              cannot be undone.
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
