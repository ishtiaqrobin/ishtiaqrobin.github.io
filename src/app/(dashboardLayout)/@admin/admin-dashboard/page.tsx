"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminStats } from "@/components/modules/dashboard/admin/admin/AdminStats";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/hooks/useAuth";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<AdminStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchStats = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);
    const { data, error } = await adminService.getStats(userToken);

    if (error) {
      toast.error("Failed to load statistics", { description: error.message });
    } else {
      setStats(data);
    }
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (!authLoading && userToken) {
      Promise.resolve().then(() => fetchStats());
    }
  }, [authLoading, userToken, fetchStats]);

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Overall platform statistics and insights
          </p>
        </div>
        <Button
          variant="outline"
          size="xs"
          onClick={fetchStats}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AdminStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity or Chart could go here */}
      </div>
    </div>
  );
}
