"use client";

import { useEffect, useState, useCallback } from "react";
import { GalleryManager } from "@/components/modules/dashboard/admin/gallery/GalleryManager";
import { galleryService } from "@/services/gallery.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { IGallery } from "@/types";

export default function AdminGalleryPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // ✅ Refresh trigger — no setState called directly in effect body
  const [refreshKey, setRefreshKey] = useState(0);

  const userToken = session?.token || "";

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    // ✅ Async function defined inside effect — safe pattern
    async function load() {
      setIsLoading(true);

      const { data, error } = await galleryService.getGalleries();

      if (cancelled) return;

      if (error) {
        toast.error("Failed to load gallery items", {
          description: error.message,
        });
        setGalleries([]);
      } else {
        setGalleries(data || []);
      }

      setIsLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [authLoading, refreshKey]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gallery Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload and organize your project screenshots and design assets
        </p>
      </div>

      <GalleryManager
        galleries={galleries}
        token={userToken}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
    </div>
  );
}
