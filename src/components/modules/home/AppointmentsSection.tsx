"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/common/SectionTitle";
import { AppointmentForm } from "./card/AppointmentForm";
import { appointmentService } from "@/services/appointment.service";
import type { IAppointmentSlot } from "@/types/appointment.type";

export function AppointmentsSection() {
  const [slots, setSlots] = useState<IAppointmentSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      const { data } = await appointmentService.getAvailableSlots();
      if (data) {
        setSlots(data);
      }
      setIsLoading(false);
    };

    fetchSlots();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Book Your Slot"
            title="Schedule an Appointment"
            description="Let's discuss your project or get consultation"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
            <div className="lg:col-span-5">
              <Skeleton className="h-96 rounded-3xl" />
            </div>
            <div className="lg:col-span-7">
              <Skeleton className="h-96 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slots.length === 0) {
    return null;
  }

  return (
    <section id="appointments" className="py-24 relative overflow-hidden">
      {/* Academic Blueprint Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.07] opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0M40 80L80 40M40 0L80 40M0 40L40 80' stroke='%234f46e5' stroke-width='1' fill='none'/%3E%3Ccircle cx='40' cy='40' r='1.5' fill='%234f46e5'/%3E%3C/svg%3E")`,
            backgroundSize: "5rem 5rem",
          }}
        />
        {/* <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" /> */}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Book Your Slot"
          title="Schedule an Appointment"
          description="Let's discuss your project or get consultation on your requirements"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Availability Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Available Time Slots</h3>
              <p className="text-muted-foreground">
                Select a date and time that works best for you. It&apos;s am
                available during these hours:
              </p>
            </div>

            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3 rounded-xl bg-muted/50 border border-border/50 hover:border-border transition-colors backdrop-blur-sm"
                >
                  <p className="font-medium text-sm">
                    {
                      [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][slot.dayOfWeek]
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {slot.startTime} – {slot.endTime}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <p className="text-sm font-medium">💡 Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Fill in your details and book a slot. You&apos;ll receive a
                confirmation email with the meeting link.
              </p>
            </div>
          </div>

          {/* Appointment Form */}
          <AppointmentForm availableSlots={slots} />
        </div>
      </div>
    </section>
  );
}
