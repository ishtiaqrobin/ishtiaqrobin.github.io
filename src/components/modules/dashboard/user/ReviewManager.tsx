// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import { motion } from "motion/react";
// import { toast } from "sonner";
// import {
//   Star,
//   Trash2,
//   Loader2,
//   MessageSquare,
//   Quote,
//   Pencil,
//   Plus,
// } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// import {
//   createOrUpdateReviewAction,
//   deleteReviewAction,
// } from "@/actions/review.action";
// import { reviewService } from "@/services/review.service";
// import { IReview } from "@/types";

// interface ReviewManagerProps {
//   token: string;
// }

// // ── Star picker ───────────────────────────────────────────────────────────────
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
//             className={`h-10 w-10 ${
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

// // ── Main ──────────────────────────────────────────────────────────────────────
// export function ReviewManager({ token }: ReviewManagerProps) {
//   const [review, setReview] = useState<IReview | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [rating, setRating] = useState(5);

//   // ── Fetch my review ───────────────────────────────────────────────
//   const fetchMyReview = useCallback(async () => {
//     const { data } = await reviewService.getMyReview(token);
//     if (Array.isArray(data) && data.length > 0) {
//       setReview(data[0]);
//       setRating(data[0].rating);
//     } else if (data && !Array.isArray(data)) {
//       setReview(data as unknown as IReview);
//       setRating((data as unknown as IReview).rating);
//     } else {
//       setReview(null);
//       setRating(5);
//     }
//     setIsFetching(false);
//   }, [token]);

//   useEffect(() => {
//     const load = async () => {
//       await fetchMyReview();
//     };
//     load();
//   }, [fetchMyReview]);

//   const handleEditOpen = () => {
//     setRating(review?.rating ?? 5);
//     setIsEditOpen(true);
//   };

//   // ── Submit ────────────────────────────────────────────────────────
//   const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     setLoading(true);
//     const result = await createOrUpdateReviewAction(
//       { rating, comment: fd.get("comment") as string },
//       token,
//       review?.id,
//     );
//     if (result.success) {
//       toast.success(result.message);
//       setIsEditOpen(false);
//       const load = async () => {
//         await fetchMyReview();
//       };
//       load();
//     } else {
//       toast.error(result.message);
//     }
//     setLoading(false);
//   };

//   // ── Delete ────────────────────────────────────────────────────────
//   const handleDelete = async () => {
//     if (!review?.id) return;
//     setLoading(true);
//     const result = await deleteReviewAction(review.id, token);
//     if (result.success) {
//       toast.success(result.message);
//       setIsDeleteOpen(false);
//       setReview(null);
//     } else {
//       toast.error(result.message);
//     }
//     setLoading(false);
//   };

//   // ── Loading state ─────────────────────────────────────────────────
//   if (isFetching) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold flex items-center gap-2">
//           <MessageSquare className="h-5 w-5 text-primary" />
//           My Review & Feedback
//         </h2>
//         {!review && (
//           <Button onClick={handleEditOpen} className="cursor-pointer">
//             <Plus className="mr-2 h-4 w-4" />
//             Write a Review
//           </Button>
//         )}
//       </div>

//       {review ? (
//         /* ── Review card ────────────────────────────────────────── */
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-md"
//         >
//           <Card className="group overflow-hidden rounded-3xl border shadow-lg bg-muted/20 hover:shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-3">
//                   <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
//                     {review.user?.image ? (
//                       <Image
//                         src={review.user.image}
//                         alt={review.user.name}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
//                         {review.user?.name?.charAt(0) || "U"}
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <CardTitle className="text-base font-bold">
//                       {review.user?.name || "You"}
//                     </CardTitle>
//                     <div className="flex gap-0.5 mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < review.rating
//                               ? "fill-yellow-500 text-yellow-500"
//                               : "text-muted-foreground/30"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="default"
//                     onClick={handleEditOpen}
//                     className="h-8 w-8 rounded-sm cursor-pointer"
//                   >
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => setIsDeleteOpen(true)}
//                     className="h-8 w-8 rounded-sm cursor-pointer"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent className="pt-2">
//               {/* Approval status */}
//               <div className="mb-3">
//                 {review.isApproved ? (
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">
//                     ✓ Approved & visible on portfolio
//                   </span>
//                 ) : (
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
//                     ⏳ Pending approval
//                   </span>
//                 )}
//               </div>

//               <div className="relative">
//                 <Quote className="absolute top-2 right-2 h-10 w-10 text-primary/10 -z-0" />
//                 <p className="text-base text-muted-foreground italic leading-relaxed relative z-10">
//                   &quot;{review.comment || "No comment provided."}&quot;
//                 </p>
//               </div>

//               <div className="mt-6 pt-4 border-t border-border/50 text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
//                 Submitted on{" "}
//                 {new Date(review.createdAt).toLocaleDateString(undefined, {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       ) : (
//         /* ── Empty state ────────────────────────────────────────── */
//         <div className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed border-primary/20">
//           <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-muted-foreground">
//             You haven&apos;t shared your feedback yet
//           </h3>
//           <p className="text-sm text-muted-foreground/60 mb-6">
//             Your experience matters! Help others by sharing your story.
//           </p>
//           <Button onClick={handleEditOpen} className="cursor-pointer">
//             Share Your Experience
//           </Button>
//         </div>
//       )}

//       {/* ── Edit / Create Dialog ──────────────────────────────────── */}
//       <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//         <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
//           <form onSubmit={handleSave}>
//             <DialogHeader>
//               <DialogTitle>
//                 {review ? "Update Your Review" : "Write a Review"}
//               </DialogTitle>
//               <DialogDescription>
//                 {review
//                   ? "Update your rating and feedback below"
//                   : "Share your experience — it helps others decide"}
//               </DialogDescription>
//             </DialogHeader>

//             <div className="space-y-5 py-4">
//               <div className="space-y-2 text-center p-4 rounded-2xl bg-muted/30">
//                 <Label className="block mb-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
//                   Your Rating
//                 </Label>
//                 <StarPicker value={rating} onChange={setRating} />
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="comment">Your Feedback</Label>
//                 <Textarea
//                   id="comment"
//                   name="comment"
//                   defaultValue={review?.comment || ""}
//                   placeholder="Tell us about your experience..."
//                   required
//                   className="rounded-xl resize-none text-base"
//                   rows={5}
//                 />
//               </div>
//             </div>

//             <DialogFooter className="gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsEditOpen(false)}
//                 disabled={loading}
//                 className="flex-1 cursor-pointer"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 cursor-pointer"
//               >
//                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 {review ? "Update Review" : "Submit Review"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* ── Delete Confirm ────────────────────────────────────────── */}
//       <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <DialogContent className="max-w-sm">
//           <DialogHeader>
//             <DialogTitle>Delete Your Review</DialogTitle>
//             <DialogDescription>
//               This will permanently remove your review from the portfolio. You
//               can always write a new one later.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex gap-2 pt-2">
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteOpen(false)}
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

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Trash2,
  Loader2,
  MessageSquare,
  Quote,
  Pencil,
  Plus,
  Briefcase,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  createOrUpdateReviewAction,
  deleteReviewAction,
} from "@/actions/review.action";
import { reviewService } from "@/services/review.service";
import { IReview } from "@/types";

interface ReviewManagerProps {
  token: string;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ReviewManager({ token }: ReviewManagerProps) {
  const [review, setReview] = useState<IReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ── Fetch my review ───────────────────────────────────────────────
  const fetchMyReview = useCallback(async () => {
    const { data } = await reviewService.getMyReview(token);
    if (Array.isArray(data) && data.length > 0) {
      setReview(data[0]);
    } else if (data && !Array.isArray(data)) {
      setReview(data as unknown as IReview);
    } else {
      setReview(null);
    }
    setIsFetching(false);
  }, [token]);

  useEffect(() => {
    const load = async () => {
      await fetchMyReview();
    };
    load();
  }, [fetchMyReview]);

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  // ── Submit ────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const result = await createOrUpdateReviewAction(
      {
        position: fd.get("position") as string,
        companyName: fd.get("companyName") as string,
        comment: fd.get("comment") as string,
      },
      token,
      review?.id,
    );
    if (result.success) {
      toast.success(result.message);
      setIsEditOpen(false);
      const load = async () => {
        await fetchMyReview();
      };
      load();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!review?.id) return;
    setLoading(true);
    const result = await deleteReviewAction(review.id, token);
    if (result.success) {
      toast.success(result.message);
      setIsDeleteOpen(false);
      setReview(null);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Loading state ─────────────────────────────────────────────────
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          My Review & Feedback
        </h2>
        {!review && (
          <Button onClick={handleEditOpen} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Write a Review
          </Button>
        )}
      </div>

      {review ? (
        /* ── Review card ────────────────────────────────────────── */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <Card className="group overflow-hidden rounded-3xl border shadow-lg bg-muted/20 hover:shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    {review.user?.image ? (
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {review.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">
                      {review.user?.name || "You"}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <Briefcase className="h-3 w-3 shrink-0" />
                      <span className="font-medium text-foreground/80">
                        {review.position}
                      </span>
                      <span className="text-muted-foreground/50">at</span>
                      <span>{review.companyName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleEditOpen}
                    className="h-8 w-8 rounded-sm cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsDeleteOpen(true)}
                    className="h-8 w-8 rounded-sm cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2">
              {/* Approval status */}
              <div className="mb-3">
                {review.isApproved ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">
                    ✓ Approved & visible on portfolio
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    ⏳ Pending approval
                  </span>
                )}
              </div>

              <div className="relative">
                <Quote className="absolute top-2 right-2 h-10 w-10 text-primary/10 -z-0" />
                <p className="text-base text-muted-foreground italic leading-relaxed relative z-10">
                  &quot;{review.comment || "No comment provided."}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                Submitted on{" "}
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* ── Empty state ────────────────────────────────────────── */
        <div className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed border-primary/20">
          <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            You haven&apos;t shared your feedback yet
          </h3>
          <p className="text-sm text-muted-foreground/60 mb-6">
            Your experience matters! Help others by sharing your story.
          </p>
          <Button onClick={handleEditOpen} className="cursor-pointer">
            Share Your Experience
          </Button>
        </div>
      )}

      {/* ── Edit / Create Dialog ──────────────────────────────────── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {review ? "Update Your Review" : "Write a Review"}
              </DialogTitle>
              <DialogDescription>
                {review
                  ? "Update your role and feedback below"
                  : "Share your experience — it helps others decide"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue={review?.position || ""}
                    placeholder="e.g. Software Engineer"
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="companyName">Company</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={review?.companyName || ""}
                    placeholder="e.g. Acme Inc."
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="comment">Your Feedback</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  defaultValue={review?.comment || ""}
                  placeholder="Tell us about your experience..."
                  required
                  minLength={2}
                  maxLength={200}
                  className="rounded-xl resize-none text-base"
                  rows={5}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                disabled={loading}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 cursor-pointer"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {review ? "Update Review" : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ────────────────────────────────────────── */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Your Review</DialogTitle>
            <DialogDescription>
              This will permanently remove your review from the portfolio. You
              can always write a new one later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
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
