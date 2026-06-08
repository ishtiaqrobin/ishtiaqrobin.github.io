"use client";

import { useEffect, useState, useCallback } from "react";
import { CategoryManager } from "@/components/modules/dashboard/admin/category/CategoryManager";
import { categoryService } from "@/services/category.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Category } from "@/types/category.type";

export default function AdminCategoriesPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = session?.token || "";

    console.log("Session from category manager admin page", session)
    console.log("Token from category manger", userToken);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await categoryService.getAllCategories();

        if (error) {
            toast.error("Failed to load categories", { description: error.message });
            setCategories([]);
        } else {
            setCategories(data || []);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!authLoading) {
            Promise.resolve().then(() => fetchCategories());
        }
    }, [authLoading, fetchCategories]);

    return (
        <div className="space-y-6 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold">Category Management</h1>
                <p className="text-muted-foreground mt-2">Create and manage tutoring subjects and descriptors</p>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-[250px]" />
                        <Skeleton className="h-10 w-[160px] rounded-xl" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="border-none shadow-sm bg-muted/20 rounded-2xl">
                                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                                    <div className="space-y-2 w-full">
                                        <Skeleton className="h-6 w-1/2" />
                                    </div>
                                    <div className="flex gap-1">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {/* <Skeleton className="h-4 w-full" /> */}
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <CategoryManager
                    categories={categories}
                    token={userToken}
                    onRefresh={fetchCategories}
                />
            )}
        </div>
    );
}
