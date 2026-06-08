// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import {
//     Pencil,
//     Trash2,
//     Loader2,
//     Plus,
//     Wrench,
//     Zap,
//     Layout,
// } from "lucide-react";
// import { IService } from "@/types";
// import DynamicIcon from "@/components/common/DynamicIcon";
// import {
//     createServiceAction,
//     updateServiceAction,
//     deleteServiceAction,
// } from "@/actions/service.action";
// import { toast } from "sonner";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";

// interface ServiceManagerProps {
//     services: IService[];
//     token: string;
//     onRefresh: () => void;
// }

// export function ServiceManager({ services, token, onRefresh }: ServiceManagerProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [editingItem, setEditingItem] = useState<IService | null>(null);
//     const [deleteId, setDeleteId] = useState<string | null>(null);

//     const handleOpen = (item?: IService) => {
//         setEditingItem(item || null);
//         setIsOpen(true);
//     };

//     const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);

//         const data = {
//             name: formData.get("name"),
//             description: formData.get("description"),
//             icon: {
//                 name: formData.get("iconName"),
//                 library: formData.get("iconLibrary"),
//                 color: formData.get("iconColor"),
//                 bgColor: formData.get("iconBgColor"),
//             },
//             isPublish: formData.get("isPublish") === "on",
//         };

//         setLoading(true);

//         const result = editingItem
//             ? await updateServiceAction(editingItem.id, data, token)
//             : await createServiceAction(data, token);

//         if (result.success) {
//             toast.success(result.message);
//             setIsOpen(false);
//             onRefresh();
//         } else {
//             toast.error(result.message);
//         }

//         setLoading(false);
//     };

//     const handleDelete = async () => {
//         if (!deleteId) return;
//         setLoading(true);
//         const result = await deleteServiceAction(deleteId, token);
//         if (result.success) {
//             toast.success(result.message);
//             setIsDeleteOpen(false);
//             onRefresh();
//         } else {
//             toast.error(result.message);
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <Wrench className="h-5 w-5 text-primary" />
//                     My Services
//                 </h2>
//                 <Button
//                     variant="default"
//                     size="md"
//                     // icon="Plus"
//                     onClick={() => handleOpen()}
//                     className="cursor-pointer"
//                 >
//                     Add Service
//                 </Button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {services.map((item) => (
//                     <Card key={item.id} className="group overflow-hidden rounded-2xl border shadow-lg bg-muted/20 hover:shadow-xl hover:shadow-primary-400/25 transition-all">
//                         <CardHeader className="">
//                             <div className="flex justify-between items-start">
//                                 <div
//                                     className="rounded-xl"
//                                     style={{
//                                         color: item.icon?.color || "var(--primary)"
//                                     }}
//                                 >
//                                     {item.icon ? (
//                                         <DynamicIcon icon={item.icon} size={48} />
//                                     ) : (
//                                         <Zap className="h-6 w-6" />
//                                     )}
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <Button
//                                         size="sm"
//                                         variant="default"
//                                         onClick={() => handleOpen(item)}
//                                         className="h-8 w-8 rounded-sm cursor-pointer"
//                                     >
//                                         <Pencil className="h-4 w-4" />
//                                     </Button>
//                                     <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={() => { setDeleteId(item.id); setIsDeleteOpen(true); }}
//                                         className="h-8 w-8 rounded-sm cursor-pointer"
//                                     >
//                                         <Trash2 className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="p-5 pt-2 space-y-3">
//                             <div className="space-y-1">
//                                 <h3 className="font-bold text-lg">{item.name}</h3>
//                                 {!item.isPublish && (
//                                     <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-500 text-white font-bold uppercase">Draft</span>
//                                 )}
//                             </div>
//                             <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>

//             {/* Create/Update Modal */}
//             <Dialog open={isOpen} onOpenChange={setIsOpen}>
//                 <DialogContent className="rounded-3xl sm:max-w-md overflow-y-auto max-h-[90vh]">
//                     <form onSubmit={handleSave}>
//                         <DialogHeader>
//                             <DialogTitle>
//                                 {editingItem ? "Update Service" : "Add New Service"}
//                             </DialogTitle>
//                         </DialogHeader>

//                         <div className="space-y-4 py-4">
//                             <div className="space-y-2">
//                                 <Label>Service Name</Label>
//                                 <Input
//                                     name="name"
//                                     defaultValue={editingItem?.name || ""}
//                                     placeholder="e.g. Logo Design"
//                                     required
//                                     className="rounded-xl"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label>Icon Library</Label>
//                                     <Input
//                                         name="iconLibrary"
//                                         defaultValue={editingItem?.icon?.library || "io"}
//                                         placeholder="e.g. io, fa, md"
//                                         required
//                                         className="rounded-xl"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label>Icon Name</Label>
//                                     <Input
//                                         name="iconName"
//                                         defaultValue={editingItem?.icon?.name || ""}
//                                         placeholder="e.g. IoLogoOctocat"
//                                         required
//                                         className="rounded-xl"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label>Icon Color (Hex)</Label>
//                                     <Input
//                                         name="iconColor"
//                                         type="text"
//                                         defaultValue={editingItem?.icon?.color || "#"}
//                                         placeholder="#1877F2"
//                                         className="rounded-xl"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label>Description</Label>
//                                 <Textarea
//                                     name="description"
//                                     defaultValue={editingItem?.description || ""}
//                                     placeholder="Complete branding package including logo..."
//                                     className="rounded-xl resize-none"
//                                     rows={4}
//                                 />
//                             </div>

//                             <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
//                                 <Label>Publish Publicly</Label>
//                                 <Switch name="isPublish" defaultChecked={editingItem ? editingItem.isPublish : true} />
//                             </div>
//                         </div>

//                         <DialogFooter>
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="md"
//                                 onClick={() => setIsOpen(false)}
//                                 disabled={loading}
//                                 className="cursor-pointer">
//                                 Cancel
//                             </Button>
//                             <Button
//                                 variant="default"
//                                 size="md"
//                                 type="submit"
//                                 disabled={loading}
//                                 className="cursor-pointer"
//                             >
//                                 {editingItem ? "Update" : "Create"}
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Delete Modal */}
//             <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//                 <DialogContent className="rounded-3xl max-w-[400px]">
//                     <DialogHeader><DialogTitle>Delete Service</DialogTitle></DialogHeader>
//                     <div className="py-4 text-muted-foreground">Are you sure? This service will be removed from your portfolio.</div>
//                     <DialogFooter className="flex gap-2">
//                         <Button
//                             type="button"
//                             variant="outline"
//                             size="md"
//                             onClick={() => setIsDeleteOpen(false)}
//                             disabled={loading}
//                             className="cursor-pointer">
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="destructive"
//                             size="md"
//                             onClick={handleDelete}
//                             disabled={loading}
//                             className="cursor-pointer">
//                             Delete
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Pencil,
  Wrench,
  Loader2,
  Zap,
  Eye,
  EyeOff,
  ArrowUpDown,
  Check,
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

import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/actions/service.action";
import { IService } from "@/types";
import DynamicIcon from "@/components/common/DynamicIcon";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceManagerProps {
  services: IService[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── Field Label ──────────────────────────────────────────────────────────────
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
      className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
    >
      {children}
    </Label>
  );
}

// ─── Service Form ─────────────────────────────────────────────────────────────
function ServiceForm({ item }: { item: IService | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Name */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="name">Service Name *</FieldLabel>
        <Input
          id="name"
          name="name"
          defaultValue={item?.name || ""}
          placeholder="e.g. UI/UX Design, Web Development"
          required
          className="rounded-xl h-10"
        />
      </div>

      {/* Icon Library */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="iconLibrary">Icon Library</FieldLabel>
        <Input
          id="iconLibrary"
          name="iconLibrary"
          defaultValue={item?.icon?.library || "io5"}
          placeholder="e.g. io5, fa, md, si"
          className="rounded-xl h-10"
        />
      </div>

      {/* Icon Name */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="iconName">Icon Name</FieldLabel>
        <Input
          id="iconName"
          name="iconName"
          defaultValue={item?.icon?.name || ""}
          placeholder="e.g. IoColorPaletteOutline"
          className="rounded-xl h-10"
        />
      </div>

      {/* Icon Color */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="iconColor">Icon Color (Hex)</FieldLabel>
        <div className="flex gap-2 items-center">
          <Input
            id="iconColor"
            name="iconColor"
            type="text"
            defaultValue={item?.icon?.color || "#6366f1"}
            placeholder="#6366f1"
            className="rounded-xl h-10"
          />
          <input
            type="color"
            defaultValue={item?.icon?.color || "#6366f1"}
            className="h-10 w-10 rounded-lg border border-input cursor-pointer shrink-0"
            onChange={(e) => {
              const el = document.getElementById(
                "iconColor",
              ) as HTMLInputElement;
              if (el) el.value = e.target.value;
            }}
          />
        </div>
      </div>

      {/* Icon BgColor */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="iconBgColor">
          Icon Background Color (Hex)
        </FieldLabel>
        <div className="flex gap-2 items-center">
          <Input
            id="iconBgColor"
            name="iconBgColor"
            type="text"
            defaultValue={item?.icon?.bgColor || "#6366f120"}
            placeholder="#6366f120"
            className="rounded-xl h-10"
          />
          <input
            type="color"
            defaultValue={item?.icon?.bgColor || "#6366f1"}
            className="h-10 w-10 rounded-lg border border-input cursor-pointer shrink-0"
            onChange={(e) => {
              const el = document.getElementById(
                "iconBgColor",
              ) as HTMLInputElement;
              if (el) el.value = e.target.value;
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          placeholder="Describe what this service includes..."
          className="rounded-xl resize-none"
          rows={4}
        />
      </div>

      {/* Sort Order */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
        <Input
          id="sortOrder"
          type="number"
          name="sortOrder"
          defaultValue={item?.sortOrder ?? 0}
          min={0}
          className="rounded-xl h-10"
        />
      </div>

      {/* Published */}
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
export function ServiceManager({
  services,
  token,
  onRefresh,
  isLoading = false,
}: ServiceManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IService | null>(null);
  const [selectedItem, setSelectedItem] = useState<IService | null>(null);

  // ── Helpers ───────────────────────────────────────────────────────
  const parseFormData = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const iconName = fd.get("iconName") as string;
    const iconLibrary = fd.get("iconLibrary") as string;
    const iconColor = fd.get("iconColor") as string;
    const iconBgColor = fd.get("iconBgColor") as string;
    const sortOrderRaw = fd.get("sortOrder");

    return {
      name: fd.get("name") as string,
      description: (fd.get("description") as string) || undefined,
      isPublished: fd.get("isPublished") === "on",
      sortOrder: sortOrderRaw ? Number(sortOrderRaw) : 0,
      icon:
        iconName && iconLibrary
          ? {
              name: iconName,
              library: iconLibrary,
              color: iconColor || "#6366f1",
              bgColor: iconBgColor || "#6366f120",
            }
          : undefined,
    };
  };

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createServiceAction(
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
    const result = await updateServiceAction(
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
    const result = await deleteServiceAction(deleteConfirm.id, token);
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

  // ── Stats ─────────────────────────────────────────────────────────
  const publishedCount = services.filter((s) => s.isPublished).length;
  const draftCount = services.length - publishedCount;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Services",
            value: services.length,
            icon: <Wrench className="h-4 w-4 text-primary" />,
          },
          {
            label: "Published",
            value: publishedCount,
            icon: <Eye className="h-4 w-4 text-green-500" />,
          },
          {
            label: "Draft",
            value: draftCount,
            icon: <EyeOff className="h-4 w-4 text-muted-foreground" />,
          },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              My Services
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {services.length} total · {publishedCount} published
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateDialog(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Icon */}
                    <TableCell>
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor:
                            item.icon?.bgColor || "hsl(var(--muted))",
                          color: item.icon?.color || "var(--primary)",
                        }}
                      >
                        {item.icon ? (
                          <DynamicIcon icon={item.icon} size={20} />
                        ) : (
                          <Zap className="h-4 w-4" />
                        )}
                      </div>
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium">
                      <p className="truncate max-w-[150px]">{item.name}</p>
                      {item.icon?.name && (
                        <p className="text-[11px] text-muted-foreground font-mono truncate max-w-[150px]">
                          {item.icon.library} / {item.icon.name}
                        </p>
                      )}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="text-sm text-muted-foreground">
                      <p className="truncate max-w-[220px]">
                        {item.description || "—"}
                      </p>
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

          {/* Empty State */}
          {services.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No services added yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first service to showcase what you offer
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service
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
              <DialogTitle>Add Service</DialogTitle>
              <DialogDescription>
                Add a new service to your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <ServiceForm item={null} />
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
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <ServiceForm item={selectedItem} />
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
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
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
