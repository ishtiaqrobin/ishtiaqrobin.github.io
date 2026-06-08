"use client";

import { useEffect, useState, useCallback } from "react";
import { ServiceManager } from "@/components/modules/dashboard/admin/service/ServiceManager";
import { portfolioService } from "@/services/service.service";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { IService } from "@/types";

export default function AdminServicesPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await portfolioService.getServices();

    if (error) {
      toast.error("Failed to load services", { description: error.message });
      setServices([]);
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchServices());
    }
  }, [authLoading, fetchServices]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
        <p className="text-muted-foreground mt-2">
          Define and manage the professional services you offer to clients
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
        <ServiceManager
          services={services}
          token={userToken}
          onRefresh={fetchServices}
        />
      )}
    </div>
  );
}
