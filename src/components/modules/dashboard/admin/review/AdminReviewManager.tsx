// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion } from "motion/react";
// import { toast } from "sonner";
// import {
//   MoreHorizontal,
//   Trash2,
//   Pencil,
//   Loader2,
//   MessageSquare,
//   Star,
//   CheckCircle2,
//   XCircle,
//   Pin,
//   PinOff,
//   ShieldCheck,
//   ShieldX,
//   Eye,
//   Check,
// } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Skeleton } from "@/components/ui/skeleton";

// import {
//   createOrUpdateReviewAction,
//   deleteReviewAction,
//   approveReviewAction,
//   pinReviewAction,
// } from "@/actions/review.action";
// import { IReview } from "@/types";

// interface AdminReviewManagerProps {
//   reviews: IReview[];
//   token: string;
//   onRefresh: () => void;
//   isLoading?: boolean;
// }

// // ── Star display ──────────────────────────────────────────────────────────────
// function StarRating({ value }: { value: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {[...Array(5)].map((_, i) => (
//         <Star
//           key={i}
//           className={`h-3.5 w-3.5 ${
//             i < value
//               ? "fill-yellow-500 text-yellow-500"
//               : "text-muted-foreground/20"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

// // ── Interactive star picker ───────────────────────────────────────────────────
// function StarPicker({
//   value,
//   onChange,
// }: {
//   value: number;
//   onChange: (v: number) => void;
// }) {
//   return (
//     <div className="flex justify-center gap-2">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           type="button"
//           onClick={() => onChange(star)}
//           className="focus:outline-none transition-transform active:scale-90"
//         >
//           <Star
//             className={`h-9 w-9 ${
//               star <= value
//                 ? "fill-yellow-500 text-yellow-500"
//                 : "text-muted-foreground/20"
//             }`}
//           />
//         </button>
//       ))}
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export function AdminReviewManager({
//   reviews,
//   token,
//   onRefresh,
//   isLoading = false,
// }: AdminReviewManagerProps) {
//   const [loading, setLoading] = useState(false);
//   const [togglingId, setTogglingId] = useState<string | null>(null);

//   const [editDialog, setEditDialog] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState<IReview | null>(null);
//   const [selectedItem, setSelectedItem] = useState<IReview | null>(null);
//   const [rating, setRating] = useState(5);

//   // ── Approve toggle ────────────────────────────────────────────────
//   const handleApprove = async (item: IReview) => {
//     setTogglingId(item.id + "-approve");
//     const result = await approveReviewAction(item.id, token);
//     if (result.success) {
//       toast.success(result.message);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }
//     setTogglingId(null);
//   };

//   // ── Pin toggle ────────────────────────────────────────────────────
//   const handlePin = async (item: IReview) => {
//     setTogglingId(item.id + "-pin");
//     const result = await pinReviewAction(item.id, token);
//     if (result.success) {
//       toast.success(result.message);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }
//     setTogglingId(null);
//   };

//   // ── Edit ──────────────────────────────────────────────────────────
//   const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!selectedItem) return;
//     const fd = new FormData(e.currentTarget);
//     setLoading(true);
//     const result = await createOrUpdateReviewAction(
//       { rating, comment: fd.get("comment") as string },
//       token,
//       selectedItem.id,
//     );
//     if (result.success) {
//       toast.success(result.message);
//       setEditDialog(false);
//       setSelectedItem(null);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }
//     setLoading(false);
//   };

//   // ── Delete ────────────────────────────────────────────────────────
//   const handleDelete = async () => {
//     if (!deleteConfirm) return;
//     setLoading(true);
//     const result = await deleteReviewAction(deleteConfirm.id, token);
//     if (result.success) {
//       toast.success(result.message);
//       setDeleteConfirm(null);
//       onRefresh();
//     } else {
//       toast.error(result.message);
//     }
//     setLoading(false);
//   };

//   // ── Skeleton ──────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-10 w-full rounded-lg" />
//         <Skeleton className="h-96 w-full rounded-xl" />
//       </div>
//     );
//   }

//   const total = reviews.length;
//   const approved = reviews.filter((r) => r.isApproved).length;
//   const pinned = reviews.filter((r) => r.isPinned).length;
//   const avgRating =
//     total > 0
//       ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
//       : "—";

//   // ── Render ────────────────────────────────────────────────────────
//   return (
//     <div className="space-y-6">
//       {/* ── Summary cards ─────────────────────────────────────────── */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {[
//           {
//             label: "Total",
//             value: total,
//             color: "text-foreground",
//             icon: <Eye className="h-4 w-4 text-foreground" />,
//           },
//           {
//             label: "Approved",
//             value: approved,
//             color: "text-green-500",
//             icon: <Check className="h-4 w-4 text-green-500" />,
//           },
//           {
//             label: "Pinned",
//             value: pinned,
//             color: "text-blue-500",
//             icon: <Pin className="h-4 w-4 text-blue-500" />,
//           },
//           {
//             label: "Avg Rating",
//             value: avgRating,
//             color: "text-yellow-500",
//             icon: <Star className="h-4 w-4 text-yellow-500" />,
//           },
//         ].map((stat) => (
//           <Card key={stat.label} className="rounded-2xl">
//             <CardContent className="p-4 flex items-center gap-3">
//               <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
//                 {stat.icon}
//               </div>
//               <div>
//                 <p className={`text-xl font-bold leading-none ${stat.color}`}>
//                   {stat.value}
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-0.5">
//                   {stat.label}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* ── Table card ────────────────────────────────────────────── */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Reviews & Testimonials</CardTitle>
//           <p className="text-sm text-muted-foreground">
//             {total} total · {approved} approved · {pinned} pinned
//           </p>
//         </CardHeader>

//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Rating</TableHead>
//                   <TableHead>Comment</TableHead>
//                   <TableHead className="text-center">Approved</TableHead>
//                   <TableHead className="text-center">Pinned</TableHead>
//                   <TableHead>Submitted</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {reviews.map((item, i) => (
//                   <motion.tr
//                     key={item.id}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.03 }}
//                     className="border-b transition-colors hover:bg-muted/40"
//                   >
//                     {/* User */}
//                     <TableCell>
//                       <div className="flex items-center gap-2.5 min-w-[140px]">
//                         <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border shrink-0">
//                           {item.user.image ? (
//                             <Image
//                               src={item.user.image}
//                               alt={item.user.name}
//                               fill
//                               className="object-cover"
//                             />
//                           ) : (
//                             <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
//                               {item.user.name.charAt(0)}
//                             </div>
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p className="font-medium text-sm truncate max-w-[110px]">
//                             {item.user.name}
//                           </p>
//                           {item.isPinned && (
//                             <Badge
//                               variant="secondary"
//                               className="text-[9px] h-4 px-1 mt-0.5"
//                             >
//                               Pinned
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </TableCell>

//                     {/* Rating */}
//                     <TableCell>
//                       <div className="flex flex-col gap-0.5">
//                         <StarRating value={item.rating} />
//                         <span className="text-[10px] text-muted-foreground">
//                           {item.rating}/5
//                         </span>
//                       </div>
//                     </TableCell>

//                     {/* Comment */}
//                     <TableCell className="max-w-[220px]">
//                       <p className="text-sm text-muted-foreground line-clamp-2 italic">
//                         {item.comment ? (
//                           `"${item.comment}"`
//                         ) : (
//                           <span className="not-italic text-muted-foreground/50 text-xs">
//                             No comment
//                           </span>
//                         )}
//                       </p>
//                     </TableCell>

//                     {/* Approve toggle */}
//                     <TableCell className="text-center">
//                       <button
//                         onClick={() => handleApprove(item)}
//                         disabled={togglingId === item.id + "-approve"}
//                         className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
//                         title={
//                           item.isApproved
//                             ? "Click to unapprove"
//                             : "Click to approve"
//                         }
//                       >
//                         {togglingId === item.id + "-approve" ? (
//                           <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                         ) : item.isApproved ? (
//                           <CheckCircle2 className="h-5 w-5 text-green-500" />
//                         ) : (
//                           <XCircle className="h-5 w-5 text-muted-foreground/40 hover:text-green-500 transition-colors" />
//                         )}
//                       </button>
//                     </TableCell>

//                     {/* Pin toggle */}
//                     <TableCell className="text-center">
//                       <button
//                         onClick={() => handlePin(item)}
//                         disabled={togglingId === item.id + "-pin"}
//                         className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
//                         title={
//                           item.isPinned ? "Click to unpin" : "Click to pin"
//                         }
//                       >
//                         {togglingId === item.id + "-pin" ? (
//                           <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                         ) : item.isPinned ? (
//                           <Pin className="h-5 w-5 text-blue-500 fill-blue-500" />
//                         ) : (
//                           <PinOff className="h-5 w-5 text-muted-foreground/40 hover:text-blue-500 transition-colors" />
//                         )}
//                       </button>
//                     </TableCell>

//                     {/* Date */}
//                     <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
//                       {new Date(item.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </TableCell>

//                     {/* Actions */}
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="cursor-pointer"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => handleApprove(item)}>
//                             {item.isApproved ? (
//                               <>
//                                 <ShieldX className="mr-2 h-4 w-4 text-amber-500" />
//                                 Unapprove
//                               </>
//                             ) : (
//                               <>
//                                 <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
//                                 Approve
//                               </>
//                             )}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handlePin(item)}>
//                             {item.isPinned ? (
//                               <>
//                                 <PinOff className="mr-2 h-4 w-4" />
//                                 Unpin
//                               </>
//                             ) : (
//                               <>
//                                 <Pin className="mr-2 h-4 w-4" />
//                                 Pin to top
//                               </>
//                             )}
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => {
//                               setSelectedItem(item);
//                               setRating(item.rating);
//                               setEditDialog(true);
//                             }}
//                           >
//                             <Pencil className="mr-2 h-4 w-4" />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem
//                             onClick={() => setDeleteConfirm(item)}
//                             className="text-red-600 focus:text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {reviews.length === 0 && (
//             <div className="text-center py-16">
//               <MessageSquare className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
//               <p className="font-medium text-muted-foreground">
//                 No reviews yet
//               </p>
//               <p className="text-sm text-muted-foreground/60 mt-1">
//                 Reviews submitted by users will appear here
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* ── Edit Dialog ───────────────────────────────────────────── */}
//       <Dialog
//         open={editDialog}
//         onOpenChange={(open) => {
//           if (!open) setSelectedItem(null);
//           setEditDialog(open);
//         }}
//       >
//         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
//           <form onSubmit={handleEdit}>
//             <DialogHeader>
//               <DialogTitle>Edit Review</DialogTitle>
//               <DialogDescription>
//                 Editing review by{" "}
//                 <span className="font-medium text-foreground">
//                   {selectedItem?.user.name}
//                 </span>
//               </DialogDescription>
//             </DialogHeader>

//             <div className="space-y-5 py-4">
//               <div className="space-y-2 text-center p-4 rounded-2xl bg-muted/30">
//                 <Label className="block mb-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
//                   Rating
//                 </Label>
//                 <StarPicker value={rating} onChange={setRating} />
//               </div>

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="comment"
//                   className="text-[11px] font-bold tracking-wider text-muted-foreground"
//                 >
//                   Comment
//                 </Label>
//                 <Textarea
//                   id="comment"
//                   name="comment"
//                   defaultValue={selectedItem?.comment || ""}
//                   placeholder="Update feedback..."
//                   required
//                   className="rounded-xl resize-none"
//                   rows={4}
//                 />
//               </div>
//             </div>

//             <DialogFooter className="gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setEditDialog(false)}
//                 disabled={loading}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading} className="flex-1">
//                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Save Changes
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* ── Delete Confirm ────────────────────────────────────────── */}
//       <Dialog
//         open={!!deleteConfirm}
//         onOpenChange={() => setDeleteConfirm(null)}
//       >
//         <DialogContent className="max-w-sm">
//           <DialogHeader>
//             <DialogTitle>Delete Review</DialogTitle>
//             <DialogDescription>
//               Permanently remove the review by{" "}
//               <span className="font-semibold text-foreground">
//                 {deleteConfirm?.user.name}
//               </span>
//               ? This cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex gap-2 pt-2">
//             <Button
//               variant="outline"
//               onClick={() => setDeleteConfirm(null)}
//               disabled={loading}
//               className="flex-1 cursor-pointer"
//             >
//               Cancel
//             </Button>
//             <Button
//               // variant="destructive"
//               onClick={handleDelete}
//               disabled={loading}
//               className="flex-1 cursor-pointer"
//             >
//               {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Trash2,
  Pencil,
  Loader2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Pin,
  PinOff,
  ShieldCheck,
  ShieldX,
  Eye,
  Check,
  Building2,
  Briefcase,
} from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createOrUpdateReviewAction,
  deleteReviewAction,
  approveReviewAction,
  pinReviewAction,
} from "@/actions/review.action";
import { IReview } from "@/types";

interface AdminReviewManagerProps {
  reviews: IReview[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function AdminReviewManager({
  reviews,
  token,
  onRefresh,
  isLoading = false,
}: AdminReviewManagerProps) {
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IReview | null>(null);
  const [selectedItem, setSelectedItem] = useState<IReview | null>(null);

  // ── Approve toggle ────────────────────────────────────────────────
  const handleApprove = async (item: IReview) => {
    setTogglingId(item.id + "-approve");
    const result = await approveReviewAction(item.id, token);
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setTogglingId(null);
  };

  // ── Pin toggle ────────────────────────────────────────────────────
  const handlePin = async (item: IReview) => {
    setTogglingId(item.id + "-pin");
    const result = await pinReviewAction(item.id, token);
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setTogglingId(null);
  };

  // ── Edit ──────────────────────────────────────────────────────────
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const result = await createOrUpdateReviewAction(
      {
        position: fd.get("position") as string,
        companyName: fd.get("companyName") as string,
        comment: fd.get("comment") as string,
      },
      token,
      selectedItem.id,
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
    const result = await deleteReviewAction(deleteConfirm.id, token);
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
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  const total = reviews.length;
  const approved = reviews.filter((r) => r.isApproved).length;
  const pinned = reviews.filter((r) => r.isPinned).length;
  const companies = new Set(reviews.map((r) => r.companyName)).size;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Summary cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: total,
            color: "text-foreground",
            icon: <Eye className="h-4 w-4 text-foreground" />,
          },
          {
            label: "Approved",
            value: approved,
            color: "text-green-500",
            icon: <Check className="h-4 w-4 text-green-500" />,
          },
          {
            label: "Pinned",
            value: pinned,
            color: "text-blue-500",
            icon: <Pin className="h-4 w-4 text-blue-500" />,
          },
          {
            label: "Companies",
            value: companies,
            color: "text-violet-500",
            icon: <Building2 className="h-4 w-4 text-violet-500" />,
          },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className={`text-xl font-bold leading-none ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Table card ────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews & Testimonials</CardTitle>
          <p className="text-sm text-muted-foreground">
            {total} total · {approved} approved · {pinned} pinned
          </p>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead className="text-center">Approved</TableHead>
                  <TableHead className="text-center">Pinned</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-2.5 min-w-[140px]">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border shrink-0">
                          {item.user.image ? (
                            <Image
                              src={item.user.image}
                              alt={item.user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {item.user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-[110px]">
                            {item.user.name}
                          </p>
                          {item.isPinned && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] h-4 px-1 mt-0.5"
                            >
                              Pinned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Role (position @ company) */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5 min-w-[120px] max-w-[160px]">
                        <span className="text-sm font-medium truncate flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-muted-foreground shrink-0" />
                          {item.position}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate">
                          {item.companyName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Comment */}
                    <TableCell className="max-w-[220px]">
                      <p className="text-sm text-muted-foreground line-clamp-2 italic">
                        {item.comment ? (
                          `"${item.comment}"`
                        ) : (
                          <span className="not-italic text-muted-foreground/50 text-xs">
                            No comment
                          </span>
                        )}
                      </p>
                    </TableCell>

                    {/* Approve toggle */}
                    <TableCell className="text-center">
                      <button
                        onClick={() => handleApprove(item)}
                        disabled={togglingId === item.id + "-approve"}
                        className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
                        title={
                          item.isApproved
                            ? "Click to unapprove"
                            : "Click to approve"
                        }
                      >
                        {togglingId === item.id + "-approve" ? (
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : item.isApproved ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground/40 hover:text-green-500 transition-colors" />
                        )}
                      </button>
                    </TableCell>

                    {/* Pin toggle */}
                    <TableCell className="text-center">
                      <button
                        onClick={() => handlePin(item)}
                        disabled={togglingId === item.id + "-pin"}
                        className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
                        title={
                          item.isPinned ? "Click to unpin" : "Click to pin"
                        }
                      >
                        {togglingId === item.id + "-pin" ? (
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : item.isPinned ? (
                          <Pin className="h-5 w-5 text-blue-500 fill-blue-500" />
                        ) : (
                          <PinOff className="h-5 w-5 text-muted-foreground/40 hover:text-blue-500 transition-colors" />
                        )}
                      </button>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
                          <DropdownMenuItem onClick={() => handleApprove(item)}>
                            {item.isApproved ? (
                              <>
                                <ShieldX className="mr-2 h-4 w-4 text-amber-500" />
                                Unapprove
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePin(item)}>
                            {item.isPinned ? (
                              <>
                                <PinOff className="mr-2 h-4 w-4" />
                                Unpin
                              </>
                            ) : (
                              <>
                                <Pin className="mr-2 h-4 w-4" />
                                Pin to top
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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

          {reviews.length === 0 && (
            <div className="text-center py-16">
              <MessageSquare className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No reviews yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Reviews submitted by users will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogDescription>
                Editing review by{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.user.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="position"
                    className="text-[11px] font-bold tracking-wider text-muted-foreground"
                  >
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue={selectedItem?.position || ""}
                    placeholder="e.g. Software Engineer"
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="companyName"
                    className="text-[11px] font-bold tracking-wider text-muted-foreground"
                  >
                    Company
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={selectedItem?.companyName || ""}
                    placeholder="e.g. Acme Inc."
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="comment"
                  className="text-[11px] font-bold tracking-wider text-muted-foreground"
                >
                  Comment
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  defaultValue={selectedItem?.comment || ""}
                  placeholder="Update feedback..."
                  required
                  minLength={2}
                  maxLength={200}
                  className="rounded-xl resize-none"
                  rows={4}
                />
              </div>
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

      {/* ── Delete Confirm ────────────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Permanently remove the review by{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.user.name}
              </span>
              ? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 cursor-pointer"
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
