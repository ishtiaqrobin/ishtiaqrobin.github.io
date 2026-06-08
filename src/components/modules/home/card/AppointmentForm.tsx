"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Send, Loader2, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { appointmentService } from "@/services/appointment.service";
import type {
  IAppointmentSlot,
  ICreateAppointmentInput,
} from "@/types/appointment.type";

interface AppointmentFormProps {
  availableSlots: IAppointmentSlot[];
}

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function AppointmentForm({ availableSlots }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const selectedSlot = useMemo(
    () => availableSlots.find((s) => s.id === selectedSlotId),
    [availableSlots, selectedSlotId],
  );

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlotId) {
      toast.error("Please select a date and time slot");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload: ICreateAppointmentInput = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      topic: formData.get("topic") as string,
      message: (formData.get("message") as string) || undefined,
      date: new Date(
        `${selectedDate}T${selectedSlot?.startTime}`,
      ).toISOString(),
      slotId: selectedSlotId,
    };

    setLoading(true);
    const { data, error } = await appointmentService.bookAppointment(payload);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Appointment booked successfully! Check your email for confirmation.",
      );
      (e.target as HTMLFormElement).reset();
      setSelectedDate("");
      setSelectedSlotId("");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:col-span-7"
    >
      <Card className="p-0 rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/30 hover:shadow-primary-400/50 backdrop-blur-2xl group transition-all duration-500">
        <CardContent className="p-8 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="topic"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Topic <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="topic"
                  name="topic"
                  placeholder="e.g., Project Discussion, Consultation"
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  <Calendar className="inline h-3.5 w-3.5 mr-1" />
                  Preferred Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="slot"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  <Clock className="inline h-3.5 w-3.5 mr-1" />
                  Time Slot <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedSlotId}
                  onValueChange={setSelectedSlotId}
                >
                  <SelectTrigger className="rounded-xl min-h-12">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        {DAY_LABELS[slot.dayOfWeek]} {slot.startTime} -{" "}
                        {slot.endTime}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me more about your request..."
                className="rounded-2xl min-h-[120px] transition-all duration-300 resize-none p-4"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading || !selectedSlot}
              className="w-full transition-all duration-500 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Book Appointment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
