import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, FlaskConical, Languages, Music, Palette, Pi, Atom, GraduationCap } from "lucide-react";
import Link from "next/link";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category.type";
import { Skeleton } from "@/components/ui/skeleton";

const ICON_MAP: Record<string, React.ReactNode> = {
    "Mathematics": <Pi className="h-8 w-8 text-blue-500" />,
    "Science": <FlaskConical className="h-8 w-8 text-green-500" />,
    "English": <Languages className="h-8 w-8 text-purple-500" />,
    "Programming": <Code className="h-8 w-8 text-orange-500" />,
    "Physics": <Atom className="h-8 w-8 text-cyan-500" />,
    "Literature": <BookOpen className="h-8 w-8 text-red-500" />,
    "Music": <Music className="h-8 w-8 text-pink-500" />,
    "Arts": <Palette className="h-8 w-8 text-yellow-600" />,
};

const COLOR_MAP: Record<string, string> = {
    "Mathematics": "bg-blue-50 dark:bg-blue-900/10",
    "Science": "bg-green-50 dark:bg-green-900/10",
    "English": "bg-purple-50 dark:bg-purple-900/10",
    "Programming": "bg-orange-50 dark:bg-orange-900/10",
    "Physics": "bg-cyan-50 dark:bg-cyan-900/10",
    "Literature": "bg-red-50 dark:bg-red-900/10",
    "Music": "bg-pink-50 dark:bg-pink-900/10",
    "Arts": "bg-yellow-50 dark:bg-yellow-900/10",
};

const HeaderData = {
    title: "Popular Categories",
    description: "Select your favorite subject and find the best tutor."
}

export function CategorySection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await categoryService.getAllCategories();
            if (data) {
                // Get the latest 8 categories
                setCategories(data.slice(-8));
            }
            setIsLoading(false);
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {HeaderData.title}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {HeaderData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="h-full border-muted/50">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                                    <Skeleton className="h-16 w-16 rounded-2xl" />
                                    <div className="space-y-2 flex flex-col items-center">
                                        <Skeleton className="h-5 w-24 rounded-md" />
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {HeaderData.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {HeaderData.description}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category) => {
                        const icon = ICON_MAP[category.name] || <GraduationCap className="h-8 w-8 text-primary" />;
                        const color = COLOR_MAP[category.name] || "bg-primary/5";

                        return (
                            <Link key={category.id} href={`/tutors?categoryId=${category.id}`}>
                                <Card className="h-full transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}>
                                            {icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-foreground">{category.name}</h3>
                                            <p className="text-xs text-muted-foreground">Explore Tutors</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/categories"
                        className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
                    >
                        See All Categories →
                    </Link>
                </div>
            </div>
        </section>
    );
}
