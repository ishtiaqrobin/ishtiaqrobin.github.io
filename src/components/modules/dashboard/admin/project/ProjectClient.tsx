"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RefreshCw } from "lucide-react";
import type { IProject } from "@/types";
import ProjectTable from "./ProjectTable";
import ProjectDialog from "./ProjectDialog";
import { Category } from "@/types/category.type";

const PAGE_SIZE = 10;

interface ProjectsClientProps {
  projects: IProject[];
  categories: Category[];
  token: string;
}

export function ProjectsClient({
  projects,
  categories,
  token,
}: ProjectsClientProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const handleReset = () => {
    setQuery("");
    setStatusFilter("ALL");
    setPage(1);
    router.refresh();
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEdit = (project: IProject) => {
    setDialogMode("edit");
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesSearch =
        !query.trim() ||
        proj.title?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && proj.isPublished) ||
        (statusFilter === "DRAFT" && !proj.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [projects, query, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground mt-2">
            Showcase your best work and manage project details
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="bg-white w-full md:w-72"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {/* <Filter className="h-4 w-4 text-muted-foreground shrink-0" /> */}
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-36 rounded-lg border-primary/10 h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-lg" position="popper">
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleReset}
            >
              <RefreshCw size={16} className="mr-2" /> Reset
            </Button>
            <Button className="hover:cursor-pointer" onClick={handleAdd}>
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </div>
        </div>
      </div>

      <ProjectTable
        projects={paginatedProjects}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredProjects.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
        token={token}
      />

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={selectedProject}
        categories={categories}
        mode={dialogMode}
        onSuccess={handleSuccess}
        token={token}
      />
    </div>
  );
}
