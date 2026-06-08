"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    color?: string;
    bg?: string;
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    color = "text-primary",
    bg = "bg-primary/10"
}: StatsCardProps) {
    return (
        <Card className="overflow-hidden border shadow-md hover:shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className={`${bg} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}
