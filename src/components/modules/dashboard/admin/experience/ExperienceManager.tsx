// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Pencil,
//   Trash2,
//   Loader2,
//   Briefcase,
//   Calendar,
//   MapPin,
//   Building2,
//   ExternalLink,
//   EyeOff,
// } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
// import Image from "next/image";
// import { IExperience } from "@/types";
// import {
//   createExperienceAction,
//   updateExperienceAction,
//   deleteExperienceAction,
// } from "@/actions/experience.action";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// interface ExperienceManagerProps {
//   experiences: IExperience[];
//   token: string;
//   onRefresh: () => void;
// }

// export function ExperienceManager({
//   experiences,
//   token,
//   onRefresh,
// }: ExperienceManagerProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editingItem, setEditingItem] = useState<IExperience | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const handleOpen = (item?: IExperience) => {
//     setEditingItem(item || null);
//     setIsOpen(true);
//   };

//   const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const data = {
//       company: formData.get("company"),
//       title: formData.get("title"),
//       startDate: new Date(formData.get("startDate") as string).toISOString(),
//       endDate: formData.get("endDate")
//         ? new Date(formData.get("endDate") as string).toISOString()
//         : null,
//       location: formData.get("location"),
//       description: formData.get("description"),
//       companyUrl: formData.get("companyUrl") || null,
//       companyLogo: formData.get("companyLogo") || null,
//       isPublished: formData.get("isPublished") === "on",
//       sortOrder: Number(formData.get("sortOrder") || 0),
//     };

//     setLoading(true);

//     const result = editingItem
//       ? await updateExperienceAction(editingItem.id, data, token)
//       : await createExperienceAction(data, token);

//     if (result.success) {
//       toast.success(result.message);
//       setIsOpen(false);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }

//     setLoading(false);
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     setLoading(true);
//     const result = await deleteExperienceAction(deleteId, token);
//     if (result.success) {
//       toast.success(result.message);
//       setIsDeleteOpen(false);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold flex items-center gap-2">
//           <Briefcase className="h-5 w-5 text-primary" />
//           Professional Experience
//         </h2>
//         <Button
//           size={"md"}
//           onClick={() => handleOpen()}
//           className="cursor-pointer"
//         >
//           {/* <Plus className="mr-2 h-4 w-4" /> */}
//           Add Experience
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {experiences.map((item) => (
//           <Card
//             key={item.id}
//             className="group overflow-hidden rounded-2xl border shadow-lg bg-muted/20 hover:shadow-xl hover:shadow-primary-400/25 transition-all"
//           >
//             <CardHeader className="">
//               <div className="flex justify-between items-start">
//                 <div className="rounded-xl text-primary overflow-hidden">
//                   {item.companyLogo ? (
//                     <Image
//                       src={item.companyLogo}
//                       alt={item.company}
//                       width={40}
//                       height={40}
//                       className="h-10 w-10 rounded-lg object-cover"
//                     />
//                   ) : (
//                     <Briefcase className="h-10 w-10" />
//                   )}
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   {!item.isPublished && (
//                     <span
//                       title="Unpublished"
//                       className="flex items-center text-amber-500"
//                     >
//                       <EyeOff className="h-4 w-4" />
//                     </span>
//                   )}
//                   <Button
//                     size="sm"
//                     variant="default"
//                     onClick={() => handleOpen(item)}
//                     className="h-8 w-8 rounded-sm cursor-pointer"
//                   >
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => {
//                       setDeleteId(item.id);
//                       setIsDeleteOpen(true);
//                     }}
//                     className="h-8 w-8 rounded-sm cursor-pointer"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="p-5 pt-2 space-y-3">
//               <div className="space-y-1">
//                 <h3 className="font-bold text-lg">{item.title}</h3>
//                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
//                   <Building2 className="h-3.5 w-3.5" />
//                   {item.companyUrl ? (
//                     <a
//                       href={item.companyUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-primary inline-flex items-center gap-1"
//                     >
//                       {item.company}
//                       <ExternalLink className="h-3 w-3" />
//                     </a>
//                   ) : (
//                     item.company
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 text-[10px]">
//                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
//                   <Calendar className="h-3 w-3" />
//                   {new Date(item.startDate).getFullYear()} -{" "}
//                   {item.endDate
//                     ? new Date(item.endDate).getFullYear()
//                     : "Present"}
//                 </div>
//                 {item.location && (
//                   <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-bold uppercase">
//                     <MapPin className="h-3 w-3" />
//                     {item.location}
//                   </div>
//                 )}
//               </div>
//               <p className="text-sm text-muted-foreground line-clamp-3">
//                 {item.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Create/Update Modal */}
//       {/* Create/Update Modal */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="rounded-3xl sm:max-w-xl overflow-y-auto max-h-[90vh]">
//           <form onSubmit={handleSave}>
//             <DialogHeader>
//               <DialogTitle>
//                 {editingItem ? "Update Experience" : "Add New Experience"}
//               </DialogTitle>
//             </DialogHeader>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Job Title</Label>
//                 <Input
//                   name="title"
//                   defaultValue={editingItem?.title || ""}
//                   placeholder="e.g. Senior Graphic Designer"
//                   required
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Company Name</Label>
//                 <Input
//                   name="company"
//                   defaultValue={editingItem?.company || ""}
//                   placeholder="e.g. Creative Agency Ltd."
//                   required
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Start Date</Label>
//                 <Input
//                   type="date"
//                   name="startDate"
//                   defaultValue={
//                     editingItem?.startDate
//                       ? new Date(editingItem.startDate)
//                           .toISOString()
//                           .split("T")[0]
//                       : ""
//                   }
//                   required
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>End Date (Optional)</Label>
//                 <Input
//                   type="date"
//                   name="endDate"
//                   defaultValue={
//                     editingItem?.endDate
//                       ? new Date(editingItem.endDate)
//                           .toISOString()
//                           .split("T")[0]
//                       : ""
//                   }
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Location</Label>
//                 <Input
//                   name="location"
//                   defaultValue={editingItem?.location || ""}
//                   placeholder="e.g. Dhaka, Bangladesh (Remote)"
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Description</Label>
//                 <Textarea
//                   name="description"
//                   defaultValue={editingItem?.description || ""}
//                   placeholder="Describe your responsibilities, achievements, etc..."
//                   required
//                   className="rounded-xl resize-none"
//                   rows={5}
//                 />
//               </div>

//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Company URL (Optional)</Label>
//                 <Input
//                   type="url"
//                   name="companyUrl"
//                   defaultValue={editingItem?.companyUrl || ""}
//                   placeholder="https://company.com"
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2 sm:col-span-2">
//                 <Label>Company Logo URL (Optional)</Label>
//                 <Input
//                   type="url"
//                   name="companyLogo"
//                   defaultValue={editingItem?.companyLogo || ""}
//                   placeholder="https://.../logo.png"
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Sort Order</Label>
//                 <Input
//                   type="number"
//                   name="sortOrder"
//                   defaultValue={editingItem?.sortOrder ?? 0}
//                   placeholder="0"
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="space-y-2 flex flex-col justify-center">
//                 <Label htmlFor="isPublished">Published</Label>
//                 <div className="flex items-center h-10 gap-3">
//                   <Switch
//                     id="isPublished"
//                     name="isPublished"
//                     defaultChecked={
//                       editingItem ? editingItem.isPublished : true
//                     }
//                   />
//                   <span className="text-xs text-muted-foreground">
//                     Visible on portfolio
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="md"
//                 onClick={() => setIsOpen(false)}
//                 disabled={loading}
//                 className="cursor-pointer"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="default"
//                 size="md"
//                 disabled={loading}
//                 className="cursor-pointer"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {editingItem ? "Update" : "Create"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Modal */}
//       <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <DialogContent className="rounded-3xl max-w-[400px]">
//           <DialogHeader>
//             <DialogTitle>Delete Experience Record</DialogTitle>
//           </DialogHeader>
//           <div className="py-4 text-muted-foreground">
//             Are you sure? This experience record will be removed from your
//             portfolio.
//           </div>
//           <DialogFooter className="flex gap-2">
//             <Button
//               type="button"
//               variant="outline"
//               size="md"
//               onClick={() => setIsDeleteOpen(false)}
//               disabled={loading}
//               className="cursor-pointer flex-1"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               size="md"
//               onClick={handleDelete}
//               disabled={loading}
//               className="cursor-pointer flex-1"
//             >
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

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
