/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { SkillManager } from "@/components/modules/dashboard/admin/skill/SkillManager";
import { skillService } from "@/services/skill.service";
import { categoryService } from "@/services/category.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ISkill } from "@/types";

export default function AdminSkillsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [skillsRes, categoriesRes] = await Promise.all([
        skillService.getSkills(),
        categoryService.getAllCategories()
      ]);

      if (skillsRes.error) throw new Error(skillsRes.error.message);
      if (categoriesRes.error) throw new Error(categoriesRes.error.message);

      setSkills(skillsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error: any) {
      toast.error("Failed to load skills data", { description: error.message });
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [authLoading, fetchData]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your technical skills, proficiency levels, and categories
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <SkillManager
          skills={skills}
          categories={categories}
          token={userToken}
          onRefresh={fetchData}
        />
      )}
    </div>
  );
}
