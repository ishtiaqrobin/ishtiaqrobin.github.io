"use client";

import { useEffect, useState } from "react";
import { educationService } from "@/services/education.service";
import { IEducation } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { EducationCard } from "./card/EducationCard";
import { useInView } from "react-intersection-observer";

export function EducationSection() {
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    useEffect(() => {
        educationService.getEducations().then(({ data }) => {
            if (data) {
                // Sort by start date descending
                setEducations([...data].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
            }
            setIsLoading(false);
        });
    }, []);

    if (!isLoading && educations.length === 0) return null;

    return (
        <section
            id="education"
            ref={ref}
            className="py-24 relative overflow-hidden bg-transparent"
        >
            {/* Academic Blueprint Background */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
            }}>
                <div className="absolute inset-0 dark:opacity-[0.07] opacity-[0.05]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0M40 80L80 40M40 0L80 40M0 40L40 80' stroke='%234f46e5' stroke-width='1' fill='none'/%3E%3Ccircle cx='40' cy='40' r='1.5' fill='%234f46e5'/%3E%3C/svg%3E")`,
                    backgroundSize: "5rem 5rem"
                }} />
                <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" />
            </div>

            <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    subtitle="Academic Background"
                    title="Educational Journey"
                    description="Academic background and certifications that shaped my expertise"
                />

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        {educations.map((item, index) => (
                            <EducationCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
