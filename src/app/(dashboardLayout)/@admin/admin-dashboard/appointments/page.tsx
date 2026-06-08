"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AppointmentsManager } from "@/components/modules/dashboard/admin/appointment/AppointmentsManager";
import { appointmentService } from "@/services/appointment.service";
import { useAuth } from "@/hooks/useAuth";
import type { IAppointment, IAppointmentSlot } from "@/types/appointment.type";

export default function AdminAppointmentsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [slots, setSlots] = useState<IAppointmentSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);

    const [appointmentsRes, slotsRes] = await Promise.all([
      appointmentService.getAppointments(userToken),
      appointmentService.getAppointmentSlots(),
    ]);

    const errors = [appointmentsRes.error, slotsRes.error].filter(Boolean);

    if (errors.length > 0) {
      toast.error("Failed to load some appointment data", {
        description: errors.map((e) => e?.message).join(" • "),
      });
    }

    setAppointments(appointmentsRes.data ?? []);
    setSlots(slotsRes.data ?? []);
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (!authLoading && userToken) {
      Promise.resolve().then(() => fetchAll());
    }
  }, [authLoading, userToken, fetchAll]);

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="mt-2 text-muted-foreground">
            Manage appointment requests and available time slots
          </p>
        </div>
        <Button
          variant="outline"
          size="xs"
          onClick={fetchAll}
          disabled={isLoading || !userToken}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AppointmentsManager
        appointments={appointments}
        slots={slots}
        token={userToken}
        onRefresh={fetchAll}
        isLoading={isLoading}
      />
    </div>
  );
}
