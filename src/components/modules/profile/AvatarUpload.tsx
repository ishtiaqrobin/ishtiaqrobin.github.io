"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "sonner";
import Image from "next/image";

interface AvatarUploadProps {
    currentImage?: string | null;
    onUpdate: (file: File) => Promise<void>;
    name: string;
}

export function AvatarUpload({ currentImage, onUpdate, name }: AvatarUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const {
        file,
        preview: previewUrl,
        isCompressing,
        handleFileChange,
        reset,
    } = useImageUpload({ maxSizeMB: 5 });

    const handleUpdate = async () => {
        if (!file) return;
        setIsUpdating(true);
        try {
            await onUpdate(file);
            setIsOpen(false);
            reset();
        } catch (error) {
            console.error("Avatar update error:", error);
            toast.error("Failed to update profile picture");
            reset();
        } finally {
            setIsUpdating(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) reset();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={previewUrl || currentImage || undefined} />
                    <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                        {name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera className="h-5 w-5" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-3xl">
                        <DialogHeader>
                            <DialogTitle>Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Image File</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={isCompressing}
                                    className="rounded-xl border-primary/20 pt-2"
                                />
                                {isCompressing ? (
                                    <p className="text-[11px] text-primary flex items-center gap-1">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Compressing image…
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-muted-foreground">
                                        Max 5MB · Auto-compressed to WebP
                                    </p>
                                )}
                                {previewUrl && (
                                    <div className="mt-4 flex justify-center">
                                        <Image
                                            width={128}
                                            height={128}
                                            src={previewUrl}
                                            alt="Preview"
                                            className="h-32 w-32 rounded-full object-cover border-2 border-primary/20"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                size={"md"}
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                size={"md"}
                                onClick={handleUpdate}
                                disabled={isUpdating || isCompressing || !file}
                                className="cursor-pointer"
                            >
                                {isUpdating ? (
                                    <>
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload"
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="text-center">
                <h3 className="font-bold text-xl">{name}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Profile Account</p>
            </div>
        </div>
    );
}
