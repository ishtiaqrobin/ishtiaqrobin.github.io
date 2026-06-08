"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SettingsManager } from "@/components/modules/dashboard/admin/settings/SettingsManager";
import { settingService } from "@/services/setting.service";
import { useAuth } from "@/hooks/useAuth";
import type { ISettings } from "@/types";

export default function AdminSettingsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [settings, setSettings] = useState<ISettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await settingService.getSettings();

    if (error) {
      toast.error("Failed to load settings", { description: error.message });
    }

    setSettings(data);
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
          <h1 className="text-3xl font-bold tracking-tight">
            Platform Settings
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your social links, contact info, and site configuration
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

      <SettingsManager
        settings={settings}
        token={userToken}
        onRefresh={fetchAll}
        isLoading={isLoading}
      />
    </div>
  );
}
