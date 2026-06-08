"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StatsManager } from "@/components/modules/dashboard/admin/stats/StatsManager";
import { statsService } from "@/services/stats.service";
import { useAuth } from "@/hooks/useAuth";
import type { IStats } from "@/types";

export default function AdminStatsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [stats, setStats] = useState<IStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await statsService.getStats();

    if (error) {
      toast.error("Failed to load statistics", { description: error.message });
    }

    setStats(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchAll());
    }
  }, [authLoading, fetchAll]);

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage the public-facing statistics shown on your portfolio
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAll}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <StatsManager
        stats={stats}
        token={userToken}
        onRefresh={fetchAll}
        isLoading={isLoading}
      />
    </div>
  );
}
