/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { ProjectManager } from "@/components/modules/dashboard/admin/project/ProjectManager";
import { projectService } from "@/services/project.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { IProject } from "@/types";

export default function AdminProjectsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);

      const [projRes, catRes] = await Promise.all([
        projectService.getProjects(),
        projectService.getCategories(),
      ]);

      if (cancelled) return;

      if (projRes.error) {
        toast.error("Failed to load projects", {
          description: projRes.error.message,
        });
        setProjects([]);
      } else {
        setProjects(projRes.data || []);
      }

      setCategories(catRes.data || []);
      setIsLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [authLoading]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      projectService.getProjects(),
      projectService.getCategories(),
    ]).then(([projRes, catRes]) => {
      if (projRes.error) {
        toast.error("Failed to load projects", {
          description: projRes.error.message,
        });
        setProjects([]);
      } else {
        setProjects(projRes.data || []);
      }
      setCategories(catRes.data || []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Project Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Showcase your best work and manage project details
        </p>
      </div>

      <ProjectManager
        projects={projects}
        categories={categories}
        token={userToken}
        onRefresh={refresh}
        isLoading={isLoading}
      />
    </div>
  );
}
