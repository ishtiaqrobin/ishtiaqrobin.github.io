"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { CertificateManager } from "@/components/modules/dashboard/admin/certificate/CertificateManager";
import { certificateService } from "@/services/certificate.service";
import { useAuth } from "@/hooks/useAuth";
import type { ICategory } from "@/types/certificate.type";

export default function AdminCertificatesPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [certificates, setCertificates] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);

    const { data, error } = await certificateService.getCertificates();

    if (error) {
      toast.error("Failed to load certificates", {
        description: error.message,
      });
    }

    setCertificates(data ?? []);
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (!authLoading && userToken) {
      Promise.resolve().then(() => fetchAll());
    }
  }, [authLoading, userToken, fetchAll]);

  return (
    <div className="min-h-screen space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Certificates Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your professional certifications and credentials
          </p>
        </div>
      </div>

      <CertificateManager
        certificates={certificates}
        token={userToken}
        onRefresh={fetchAll}
        isLoading={isLoading}
      />
    </div>
  );
}
