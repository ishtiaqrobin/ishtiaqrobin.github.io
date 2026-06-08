// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   Pencil,
//   Trash2,
//   Loader2,
//   Plus,
//   Video,
//   Youtube,
//   Play,
// } from "lucide-react";
// import { IVideo } from "@/types";
// import {
//   createVideoAction,
//   updateVideoAction,
//   deleteVideoAction,
// } from "@/actions/video.action";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// interface VideoManagerProps {
//   videos: IVideo[];
//   token: string;
//   onRefresh: () => void;
// }

// export function VideoManager({ videos, token, onRefresh }: VideoManagerProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [playingId, setPlayingId] = useState<string | null>(null);
//   const [editingItem, setEditingItem] = useState<IVideo | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const getEmbedUrl = (url: string) => {
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       const regExp =
//         /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//       const match = url.match(regExp);
//       const id = match && match[2].length === 11 ? match[2] : null;
//       return id ? `https://www.youtube.com/embed/${id}` : url;
//     }
//     if (url.includes("vimeo.com")) {
//       const id = url.split("/").pop();
//       return `https://player.vimeo.com/video/${id}`;
//     }
//     return url;
//   };

//   const getThumbnailUrl = (url: string) => {
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       const regExp =
//         /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//       const match = url.match(regExp);
//       const id = match && match[2].length === 11 ? match[2] : null;
//       return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
//     }
//     return null;
//   };

//   const handleOpen = (item?: IVideo) => {
//     setEditingItem(item || null);
//     setIsOpen(true);
//   };

//   const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const data = {
//       videoUrl: formData.get("videoUrl"),
//       isPublish: formData.get("isPublish") === "on",
//     };

//     setLoading(true);

//     const result = editingItem
//       ? await updateVideoAction(editingItem.id, data, token)
//       : await createVideoAction(data, token);

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
//     const result = await deleteVideoAction(deleteId, token);
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
//           <Video className="h-5 w-5 text-primary" />
//           Video Content
//         </h2>
//         <Button
//           size="md"
//           variant="default"
//           onClick={() => handleOpen()}
//           className="cursor-pointer"
//         >
//           Add Video
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {videos.map((item) => (
//           <Card
//             key={item.id}
//             className="p-0 group overflow-hidden rounded-2xl border shadow-lg bg-muted/20 hover:shadow-xl hover:shadow-primary-400/25 transition-all"
//           >
//             <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden cursor-pointer">
//               {playingId === item.id ? (
//                 <iframe
//                   src={`${getEmbedUrl(item.videoUrl)}?autoplay=1`}
//                   title="Video player"
//                   className="absolute inset-0 w-full h-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               ) : (
//                 <div
//                   className="absolute inset-0 flex items-center justify-center group"
//                   onClick={() => setPlayingId(item.id)}
//                 >
//                   {getThumbnailUrl(item.videoUrl) ? (
//                     <Image
//                       src={getThumbnailUrl(item.videoUrl)!}
//                       alt="Video thumbnail"
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-muted/20" />
//                   )}
//                   <Play className="h-12 w-12 text-white/50 group-hover:text-primary group-hover:scale-125 transition-all duration-300 z-10" />
//                   {!item.isPublished && (
//                     <div className="absolute top-2 left-2 bg-slate-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm z-10">
//                       Draft
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             <CardContent className="p-4 space-y-5">
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Youtube className="h-4 w-4 text-red-500" />
//                 <p className="text-xs font-medium truncate flex-1">
//                   {item.videoUrl}
//                 </p>
//               </div>

//               <div>
//                 <div className="flex items-center justify-end gap-2">
//                   <Button
//                     size="sm"
//                     variant="default"
//                     onClick={() => handleOpen(item)}
//                     className="h-9 w-9 rounded-md cursor-pointer"
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
//                     className="h-9 w-9 rounded-md cursor-pointer"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Create/Update Modal */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="rounded-3xl sm:max-w-md overflow-y-auto max-h-[90vh]">
//           <form onSubmit={handleSave}>
//             <DialogHeader>
//               <DialogTitle>
//                 {editingItem ? "Update Video" : "Add New Video"}
//               </DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label className="flex items-center gap-2 font-bold">
//                   <Youtube className="h-4 w-4 text-red-500" /> Video URL
//                   (YouTube/Vimeo)
//                 </Label>
//                 <Input
//                   name="videoUrl"
//                   defaultValue={editingItem?.videoUrl || ""}
//                   placeholder="https://www.youtube.com/watch?v=..."
//                   required
//                   className="rounded-xl"
//                 />
//               </div>

//               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border">
//                 <div className="space-y-0.5">
//                   <Label className="font-bold">Publish Publicly</Label>
//                   <p className="text-[10px] text-muted-foreground">
//                     Make this video visible on your portfolio
//                   </p>
//                 </div>
//                 <Switch
//                   name="isPublish"
//                   defaultChecked={editingItem ? editingItem.isPublished : true}
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 size="md"
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 disabled={loading}
//                 className="cursor-pointer"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="default"
//                 size="md"
//                 type="submit"
//                 disabled={loading}
//                 className="cursor-pointer"
//               >
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
//             <DialogTitle>Delete Video</DialogTitle>
//           </DialogHeader>
//           <div className="py-4 text-muted-foreground">
//             Are you sure? This video will be permanently removed from your
//             portfolio.
//           </div>
//           <DialogFooter className="flex gap-2">
//             <Button
//               variant="outline"
//               size="md"
//               onClick={() => setIsDeleteOpen(false)}
//               disabled={loading}
//               className="cursor-pointer flex-1"
//             >
//               Cancel
//             </Button>
//             <Button
//               // variant="destructive"
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
  Video,
  Loader2,
  Youtube,
  ExternalLink,
  Check,
  Play,
  ArrowUpDown,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import Image from "next/image";

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
  createVideoAction,
  updateVideoAction,
  deleteVideoAction,
} from "@/actions/video.action";
import { IVideo } from "@/types";

interface VideoManagerProps {
  videos: IVideo[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/,
  );
  return match ? match[2] : null;
}

function getThumbnailUrl(url: string): string | null {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
  }
  return null;
}

function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop();
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

function detectPlatform(url: string): "youtube" | "vimeo" | "other" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  return "other";
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
      className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground"
    >
      {children}
    </Label>
  );
}

// ─── Video Form ───────────────────────────────────────────────────────────────

function VideoForm({ item }: { item: IVideo | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="videoUrl">
          Video URL * (YouTube / Vimeo)
        </FieldLabel>
        <Input
          id="videoUrl"
          name="videoUrl"
          defaultValue={item?.videoUrl || ""}
          placeholder="https://www.youtube.com/watch?v=..."
          required
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="title">Title (Optional)</FieldLabel>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title || ""}
          placeholder="e.g. Portfolio Demo Walkthrough"
          className="rounded-xl h-10"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <FieldLabel htmlFor="description">Description (Optional)</FieldLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={item?.description || ""}
          placeholder="Brief description of this video..."
          className="rounded-xl resize-none"
          rows={3}
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

// ─── Preview Cell ─────────────────────────────────────────────────────────────

function ThumbnailPreview({ item }: { item: IVideo }) {
  const [playing, setPlaying] = useState(false);
  const thumb = getThumbnailUrl(item.videoUrl);

  return (
    <div className="relative h-14 w-24 rounded-lg overflow-hidden bg-black shrink-0">
      {playing ? (
        <iframe
          src={`${getEmbedUrl(item.videoUrl)}?autoplay=1`}
          title="preview"
          className="absolute inset-0 w-full h-full"
          allow="autoplay"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          {thumb ? (
            <Image
              src={thumb}
              alt="thumb"
              fill
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="absolute inset-0 bg-muted/40 flex items-center justify-center">
              <Video className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <Play className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow z-10" />
        </button>
      )}
    </div>
  );
}

// ─── Main Manager ─────────────────────────────────────────────────────────────

export function VideoManager({
  videos,
  token,
  onRefresh,
  isLoading = false,
}: VideoManagerProps) {
  const [loading, setLoading] = useState(false);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IVideo | null>(null);
  const [selectedItem, setSelectedItem] = useState<IVideo | null>(null);

  // ── Parse form ────────────────────────────────────────────────────
  const parseFormData = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      videoUrl: fd.get("videoUrl") as string,
      title: (fd.get("title") as string) || undefined,
      description: (fd.get("description") as string) || undefined,
      isPublished: fd.get("isPublished") === "on",
      sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : 0,
    };
  };

  // ── Create ────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createVideoAction(
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
    const result = await updateVideoAction(
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
    const result = await deleteVideoAction(deleteConfirm.id, token);
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
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Video Content</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {videos.length} total ·{" "}
              {videos.filter((v) => v.isPublished).length} published
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateDialog(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-16 text-center">Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* Thumbnail */}
                    <TableCell>
                      <ThumbnailPreview item={item} />
                    </TableCell>

                    {/* Title */}
                    <TableCell className="font-medium max-w-[160px]">
                      <p className="truncate">
                        {item.title || (
                          <span className="text-muted-foreground text-xs italic">
                            Untitled
                          </span>
                        )}
                      </p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[150px] mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </TableCell>

                    {/* Platform */}
                    <TableCell>
                      {detectPlatform(item.videoUrl) === "youtube" ? (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                          <Youtube className="h-4 w-4" />
                          YouTube
                        </div>
                      ) : detectPlatform(item.videoUrl) === "vimeo" ? (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-blue-500">
                          <Video className="h-4 w-4" />
                          Vimeo
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Video className="h-4 w-4" />
                          Other
                        </div>
                      )}
                    </TableCell>

                    {/* URL */}
                    <TableCell className="max-w-[180px]">
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 truncate max-w-full"
                      >
                        <span className="truncate max-w-[150px]">
                          {item.videoUrl}
                        </span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
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

          {videos.length === 0 && (
            <div className="text-center py-16">
              <Video className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No videos added yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Add a YouTube or Vimeo link to get started
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
                onClick={() => setCreateDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Video
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
              <DialogTitle>Add Video</DialogTitle>
              <DialogDescription>
                Paste a YouTube or Vimeo URL to embed a video in your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <VideoForm item={null} />
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
              <DialogTitle>Edit Video</DialogTitle>
              <DialogDescription>
                Update details for{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.title || "this video"}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <VideoForm item={selectedItem} />
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
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.title || "this video"}
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
              variant="destructive"
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
