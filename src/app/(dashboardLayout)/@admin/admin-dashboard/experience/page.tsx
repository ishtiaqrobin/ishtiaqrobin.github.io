"use client";

import { useEffect, useState, useCallback } from "react";
import { ExperienceManager } from "@/components/modules/dashboard/admin/experience/ExperienceManager";
import { experienceService } from "@/services/experience.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { IExperience } from "@/types";

export default function AdminExperiencePage() {
  const { session, isLoading: authLoading } = useAuth();
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await experienceService.getExperiences();

    if (error) {
      toast.error("Failed to load experience history", { description: error.message });
      setExperiences([]);
    } else {
      setExperiences(data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchExperiences());
    }
  }, [authLoading, fetchExperiences]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Experience Management</h1>
        <p className="text-muted-foreground mt-2">
          Organize your professional career history and job roles
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <ExperienceManager
          experiences={experiences}
          token={userToken}
          onRefresh={fetchExperiences}
        />
      )}
    </div>
  );
}
