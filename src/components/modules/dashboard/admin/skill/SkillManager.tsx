// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Pencil,
//     Trash2,
//     Loader2,
//     Zap,
//     Cpu,
// } from "lucide-react";
// import { ISkill } from "@/types";
// import DynamicIcon from "@/components/common/DynamicIcon";
// import {
//     createSkillAction,
//     updateSkillAction,
//     deleteSkillAction,
// } from "@/actions/skill.action";
// import { toast } from "sonner";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// interface Category {
//     id: string;
//     name: string;
// }

// interface SkillManagerProps {
//     skills: ISkill[];
//     categories: Category[];
//     token: string;
//     onRefresh: () => void;
// }

// export function SkillManager({ skills, categories, token, onRefresh }: SkillManagerProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [editingItem, setEditingItem] = useState<ISkill | null>(null);
//     const [deleteId, setDeleteId] = useState<string | null>(null);

//     const handleOpen = (item?: ISkill) => {
//         setEditingItem(item || null);
//         setIsOpen(true);
//     };

//     const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);

//         const data = {
//             name: formData.get("name"),
//             level: formData.get("level"),
//             categoryId: formData.get("categoryId"),
//             icon: {
//                 name: formData.get("iconName"),
//                 library: formData.get("iconLibrary"),
//                 color: formData.get("iconColor"),
//             },
//         };

//         setLoading(true);

//         const result = editingItem
//             ? await updateSkillAction(editingItem.id, data, token)
//             : await createSkillAction(data, token);

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
//         const result = await deleteSkillAction(deleteId, token);
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
//                     <Cpu className="h-5 w-5 text-primary" />
//                     Technical Skills
//                 </h2>
//                 <Button
//                     variant="default"
//                     size="md"
//                     onClick={() => handleOpen()}
//                     className="cursor-pointer"
//                 >
//                     Add Skill
//                 </Button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {skills.map((item) => (
//                     <Card key={item.id} className="group overflow-hidden rounded-2xl border shadow-lg bg-muted/20 hover:shadow-xl hover:shadow-primary-400/25 transition-all">
//                         <CardHeader className="p-5 pb-2">
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
//                         <CardContent className="p-5 pt-2 space-y-2">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="font-bold text-lg">{item.name}</h3>
//                                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
//                                     item.level === 'Expert' ? 'bg-green-500/20 text-green-600' :
//                                     item.level === 'Recently Learned' ? 'bg-blue-500/20 text-blue-600' :
//                                     'bg-orange-500/20 text-orange-600'
//                                 }`}>
//                                     {item.level}
//                                 </span>
//                             </div>
//                             <p className="text-xs text-muted-foreground">Category: {item.category?.name}</p>
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
//                                 {editingItem ? "Update Skill" : "Add New Skill"}
//                             </DialogTitle>
//                         </DialogHeader>

//                         <div className="space-y-4 py-4">
//                             <div className="space-y-2">
//                                 <Label>Skill Name</Label>
//                                 <Input
//                                     name="name"
//                                     defaultValue={editingItem?.name || ""}
//                                     placeholder="e.g. Adobe Photoshop"
//                                     required
//                                     className="rounded-xl"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label>Category</Label>
//                                     <Select name="categoryId" defaultValue={editingItem?.categoryId || ""}>
//                                         <SelectTrigger className="rounded-xl">
//                                             <SelectValue placeholder="Select Category" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {categories.map((cat) => (
//                                                 <SelectItem key={cat.id} value={cat.id}>
//                                                     {cat.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label>Level</Label>
//                                     <Select name="level" defaultValue={editingItem?.level || "Expert"}>
//                                         <SelectTrigger className="rounded-xl">
//                                             <SelectValue placeholder="Select Level" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="Expert">Expert</SelectItem>
//                                             <SelectItem value="Recently Learned">Recently Learned</SelectItem>
//                                             <SelectItem value="Learning">Learning</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label>Icon Library</Label>
//                                     <Input
//                                         name="iconLibrary"
//                                         defaultValue={editingItem?.icon?.library || "si"}
//                                         placeholder="e.g. si, fa, io"
//                                         required
//                                         className="rounded-xl"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label>Icon Name</Label>
//                                     <Input
//                                         name="iconName"
//                                         defaultValue={editingItem?.icon?.name || ""}
//                                         placeholder="e.g. SiAdobephotoshop"
//                                         required
//                                         className="rounded-xl"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label>Icon Color (Hex)</Label>
//                                 <Input
//                                     name="iconColor"
//                                     type="text"
//                                     defaultValue={editingItem?.icon?.color || "#"}
//                                     placeholder="#31A8FF"
//                                     className="rounded-xl"
//                                 />
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
//                     <DialogHeader><DialogTitle>Delete Skill</DialogTitle></DialogHeader>
//                     <div className="py-4 text-muted-foreground">Are you sure? This skill will be removed from your portfolio.</div>
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
//                             {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
  Cpu,
  Loader2,
  Zap,
  Tag,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createSkillAction,
  updateSkillAction,
  deleteSkillAction,
} from "@/actions/skill.action";
import { ISkill } from "@/types";
import DynamicIcon from "@/components/common/DynamicIcon";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
}

interface SkillManagerProps {
  skills: ISkill[];
  categories: Category[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── Skill Level Config ───────────────────────────────────────────────────────
const SKILL_LEVELS = [
  { value: "EXPERT", label: "Expert" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "LEARNING", label: "Learning" },
  { value: "RECENTLY_LEARNED", label: "Recently Learned" },
] as const;

type SkillLevelValue = (typeof SKILL_LEVELS)[number]["value"];

const levelBadgeVariant = (
  level: string,
): { className: string; label: string } => {
  switch (level) {
    case "EXPERT":
      return {
        className:
          "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20",
        label: "Expert",
      };
    case "INTERMEDIATE":
      return {
        className:
          "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
        label: "Intermediate",
      };
    case "LEARNING":
      return {
        className:
          "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20",
        label: "Learning",
      };
    case "RECENTLY_LEARNED":
      return {
        className:
          "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
        label: "Recently Learned",
      };
    default:
      return {
        className:
          "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20",
        label: level,
      };
  }
};

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

// ─── Skill Form ───────────────────────────────────────────────────────────────
function SkillForm({
  item,
  categories,
}: {
  item: ISkill | null;
  categories: Category[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Skill Name */}
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="name">
          Skill Name <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="name"
          name="name"
          defaultValue={item?.name || ""}
          placeholder="e.g. TypeScript, Figma, Docker"
          required
          className="rounded-xl h-10"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="categoryId">
          Category <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          name="categoryId"
          defaultValue={item?.categoryId || ""}
          required
        >
          <SelectTrigger id="categoryId" className="rounded-xl h-10">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position="popper">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Level */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="level">
          Proficiency Level <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          name="level"
          defaultValue={(item?.level as SkillLevelValue) || "EXPERT"}
          required
        >
          <SelectTrigger id="level" className="rounded-xl h-10">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent position="popper">
            {SKILL_LEVELS.map((lvl) => (
              <SelectItem key={lvl.value} value={lvl.value}>
                {lvl.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Icon Library */}
      <div className="space-y-1.5">
        <FieldLabel htmlFor="iconLibrary">Icon Library</FieldLabel>
        <Input
          id="iconLibrary"
          name="iconLibrary"
          defaultValue={item?.icon?.library || "si"}
          placeholder="e.g. si, fa, io5, md"
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
          placeholder="e.g. SiTypescript"
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
            placeholder="#3178C6"
            className="rounded-xl h-10"
          />
          <input
            type="color"
            defaultValue={item?.icon?.color || "#6366f1"}
            className="h-10 w-10 rounded-lg border border-input cursor-pointer shrink-0"
            onChange={(e) => {
              const colorInput = document.getElementById(
                "iconColor",
              ) as HTMLInputElement;
              if (colorInput) colorInput.value = e.target.value;
            }}
          />
        </div>
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
    </div>
  );
}

// ─── Main Manager ─────────────────────────────────────────────────────────────
export function SkillManager({
  skills,
  categories,
  token,
  onRefresh,
  isLoading = false,
}: SkillManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<ISkill | null>(null);
  const [selectedItem, setSelectedItem] = useState<ISkill | null>(null);

  // ── Helpers ───────────────────────────────────────────────────────
  const parseFormData = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const iconName = fd.get("iconName") as string;
    const iconLibrary = fd.get("iconLibrary") as string;
    const iconColor = fd.get("iconColor") as string;
    const sortOrderRaw = fd.get("sortOrder");

    return {
      name: fd.get("name") as string,
      level: fd.get("level") as string,
      categoryId: fd.get("categoryId") as string,
      sortOrder: sortOrderRaw ? Number(sortOrderRaw) : 0,
      icon:
        iconName && iconLibrary
          ? {
              name: iconName,
              library: iconLibrary,
              color: iconColor || "#6366f1",
            }
          : undefined,
    };
  };

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createSkillAction(
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
    const result = await updateSkillAction(
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
    const result = await deleteSkillAction(deleteConfirm.id, token);
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
  const expertCount = skills.filter((s) => s.level === "EXPERT").length;
  const categoryCount = new Set(skills.map((s) => s.categoryId)).size;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Skills",
            value: skills.length,
            icon: <Cpu className="h-4 w-4 text-primary" />,
          },
          {
            label: "Expert Level",
            value: expertCount,
            icon: <Zap className="h-4 w-4 text-green-500" />,
          },
          {
            label: "Categories",
            value: categoryCount,
            icon: <Tag className="h-4 w-4 text-violet-500" />,
          },
          {
            label: "Learning",
            value: skills.filter(
              (s) => s.level === "LEARNING" || s.level === "RECENTLY_LEARNED",
            ).length,
            icon: <ArrowUpDown className="h-4 w-4 text-orange-400" />,
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
              <Cpu className="h-5 w-5 text-primary" />
              Technical Skills
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {skills.length} total · {categoryCount} categories
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateDialog(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((item, i) => {
                  const badge = levelBadgeVariant(item.level);
                  return (
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
                          className="h-9 w-9 rounded-lg bg-muted/60 flex items-center justify-center shrink-0"
                          style={{
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
                        <p className="truncate max-w-[160px]">{item.name}</p>
                        {item.icon?.name && (
                          <p className="text-[11px] text-muted-foreground font-mono truncate max-w-[160px]">
                            {item.icon.name}
                          </p>
                        )}
                      </TableCell>

                      {/* Category */}
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Tag className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate max-w-[120px]">
                            {item.category?.name || "—"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Level */}
                      <TableCell>
                        <span
                          className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md border inline-block ${badge.className}`}
                        >
                          {badge.label}
                        </span>
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
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {skills.length === 0 && (
            <div className="text-center py-16">
              <Cpu className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No skills added yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add your first skill to showcase your expertise
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
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
              <DialogTitle>Add Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <SkillForm item={null} categories={categories} />
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
              <DialogTitle>Edit Skill</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <SkillForm item={selectedItem} categories={categories} />
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
            <DialogTitle>Delete Skill</DialogTitle>
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
