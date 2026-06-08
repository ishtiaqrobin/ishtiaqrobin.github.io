"use client";

import { useEffect, useState, useCallback } from "react";
import { AboutManager } from "@/components/modules/dashboard/admin/about/AboutManager";
import { aboutService } from "@/services/about.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { IAbout } from "@/types/about.type";

export default function AdminAboutPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [about, setAbout] = useState<IAbout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchAbout = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await aboutService.getAbout();

    if (error) {
      toast.error("Failed to load about data", { description: error.message });
      setAbout(null);
    } else {
      setAbout(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchAbout());
    }
  }, [authLoading, fetchAbout]);

  return (
    <div className="space-y-6 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">About Section</h1>
        <p className="text-muted-foreground mt-2">
          Manage the homepage about section, hero/profile images, and resume
          content.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[220px]" />
            <Skeleton className="h-10 w-[150px] rounded-xl" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
              <Card
                key={i}
                className="border-none shadow-sm bg-muted/20 rounded-2xl overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-[140px]" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="w-full aspect-video rounded-xl" />
                  <Skeleton className="h-4 w-[180px]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <AboutManager about={about} token={userToken} onRefresh={fetchAbout} />
      )}
    </div>
  );
}
