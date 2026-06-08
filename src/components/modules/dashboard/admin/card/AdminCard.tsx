"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string | null;
    icon?: React.ReactNode;
    badges?: React.ReactNode[];
    onEdit?: () => void;
    onDelete?: () => void;
    children?: React.ReactNode;
    imageClassName?: string;
    contentClassName?: string;
    overlayContent?: React.ReactNode;
    onClick?: () => void;
}

export function AdminCard({
    title,
    subtitle,
    description,
    image,
    icon,
    badges,
    onEdit,
    onDelete,
    children,
    imageClassName,
    contentClassName,
    overlayContent,
    onClick,
}: AdminCardProps) {
    return (
        <Card className="group overflow-hidden rounded-2xl border shadow-lg bg-muted/20 hover:shadow-xl hover:shadow-primary-400/25 transition-all flex flex-col h-full">
            {/* Header/Media Section */}
            {(image || icon || overlayContent) && (
                <div
                    className={cn(
                        "relative aspect-video overflow-hidden bg-black flex items-center justify-center",
                        onClick && "cursor-pointer",
                        imageClassName
                    )}
                    onClick={onClick}
                >
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                    ) : icon ? (
                        <div className="text-primary/40 group-hover:text-primary transition-colors transform group-hover:scale-110 duration-500">
                            {icon}
                        </div>
                    ) : null}

                    {/* Overlays (Play button, custom content) */}
                    {overlayContent}

                    {/* Status Badges */}
                    {badges && badges.length > 0 && (
                        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 items-end">
                            {badges}
                        </div>
                    )}
                </div>
            )}

            {/* Content Section */}
            <CardContent className={cn("p-5 flex-1 flex flex-col space-y-3", contentClassName)}>
                <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-lg truncate flex-1">{title}</h3>
                        {!image && !icon && (
                            <div className="flex gap-2 shrink-0">
                                {onEdit && (
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={onEdit}
                                        className="h-8 w-8 rounded-sm cursor-pointer"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={onDelete}
                                        className="h-8 w-8 rounded-sm cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    {subtitle && <p className="text-xs text-primary font-bold uppercase tracking-wider">{subtitle}</p>}
                </div>

                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {description}
                    </p>
                )}

                {children}

                {/* Footer Actions (if media exists) */}
                {(image || icon) && (
                    <div className="pt-4 mt-auto border-t border-border/50 flex justify-end gap-2">
                        {onEdit && (
                            <Button
                                size="sm"
                                variant="default"
                                onClick={onEdit}
                                className="h-9 w-9 rounded-md cursor-pointer"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={onDelete}
                                className="h-9 w-9 rounded-md cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
