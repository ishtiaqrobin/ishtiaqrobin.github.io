"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category.type";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/tutors?categoryId=${category.id}`}>
            <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-colors" />

                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>

                        {/* <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            {category.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {category.description}
                                </p>
                            )}
                        </div> */}

                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                </CardContent>

                {/* Decorative elements */}
                <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            </Card>
        </Link>
    );
}
