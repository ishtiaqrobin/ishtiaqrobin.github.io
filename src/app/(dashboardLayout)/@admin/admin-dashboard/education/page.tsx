"use client";

import { useEffect, useState, useCallback } from "react";
import { EducationManager } from "@/components/modules/dashboard/admin/education/EducationManager";
import { educationService } from "@/services/education.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { IEducation } from "@/types";

export default function AdminEducationPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [educations, setEducations] = useState<IEducation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchEducations = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await educationService.getEducations();

    if (error) {
      toast.error("Failed to load education history", {
        description: error.message,
      });
      setEducations([]);
    } else {
      setEducations(data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchEducations());
    }
  }, [authLoading, fetchEducations]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Education Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your academic background and certifications
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <EducationManager
          educations={educations}
          token={userToken}
          onRefresh={fetchEducations}
        />
      )}
    </div>
  );
}
