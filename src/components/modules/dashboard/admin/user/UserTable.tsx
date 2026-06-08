"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Ban, Unlock, UserCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUser } from "@/types/admin.type";
import { format } from "date-fns";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";

interface UserTableProps {
    users: AdminUser[];
    token: string;
    onRefresh: () => void;
}

export function UserTable({ users, token, onRefresh }: UserTableProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleToggleBan = async (user: AdminUser) => {
        setLoadingId(user.id);
        const { error } = user.isBanned
            ? await adminService.unbanUser(token, user.id)
            : await adminService.banUser(token, user.id);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(user.isBanned ? "User unbanned successfully" : "User banned successfully");
            onRefresh();
        }
        setLoadingId(null);
    };

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No users found
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback>
                                                <UserCircle className="h-6 w-6 text-muted-foreground" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "ADMIN" ? "default" : user.role === "TUTOR" ? "secondary" : "outline"} className="font-medium">
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {user.isBanned ? (
                                        <Badge variant="destructive" className="flex w-fit items-center gap-1">
                                            <Ban className="h-3 w-3" /> Banned
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="flex w-fit items-center gap-1 border-green-500 text-green-600 bg-green-50">
                                            Active
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {format(new Date(user.createdAt), "dd MMM, yyyy")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={loadingId === user.id}>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleToggleBan(user)}
                                                className={user.isBanned ? "text-green-600" : "text-destructive"}
                                            >
                                                {user.isBanned ? (
                                                    <>
                                                        <Unlock className="mr-2 h-4 w-4" /> Unban User
                                                    </>
                                                ) : (
                                                    <>
                                                        <Ban className="mr-2 h-4 w-4" /> Ban User
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
