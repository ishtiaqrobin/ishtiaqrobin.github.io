/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import {
  MoreHorizontal,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import {
  updateAppointmentStatusAction,
  deleteAppointmentAction,
  createAppointmentSlotAction,
  deleteAppointmentSlotAction,
  updateAppointmentSlotAction,
} from "@/actions/appointment.action";

import type {
  IAppointment,
  IAppointmentSlot,
  IUpdateAppointmentStatusInput,
  ICreateAppointmentSlotInput,
} from "@/types/appointment.type";

interface AppointmentsManagerProps {
  appointments: IAppointment[];
  slots: IAppointmentSlot[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
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

const STATUS_COLORS: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

const DEFAULT_SLOT_FORM: ICreateAppointmentSlotInput = {
  dayOfWeek: 1,
  startTime: "09:00",
  endTime: "10:00",
  isAvailable: true,
};

export function AppointmentsManager({
  appointments,
  slots,
  token,
  onRefresh,
  isLoading = false,
}: AppointmentsManagerProps) {
  const [loading, setLoading] = useState(false);

  // ─── Appointment status dialog ──────────────────────────────────
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [statusFormData, setStatusFormData] = useState({
    status: "PENDING",
    meetLink: "",
    adminNote: "",
  });

  // ─── Create slot dialog ─────────────────────────────────────────
  const [slotDialog, setSlotDialog] = useState(false);
  const [slotFormData, setSlotFormData] =
    useState<ICreateAppointmentSlotInput>(DEFAULT_SLOT_FORM);

  // ─── Handlers ───────────────────────────────────────────────────

  const handleStatusUpdate = useCallback(
    async (appointmentId: string) => {
      if (!selectedAppointment) return;

      setLoading(true);
      const payload: IUpdateAppointmentStatusInput = {
        status: statusFormData.status as any,
        meetLink: statusFormData.meetLink || undefined,
        adminNote: statusFormData.adminNote || undefined,
      };

      const result = await updateAppointmentStatusAction(
        appointmentId,
        payload,
        token,
      );

      if (result.success) {
        toast.success(result.message);
        setStatusDialog(false);
        setSelectedAppointment(null);
        onRefresh();
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    },
    [selectedAppointment, statusFormData, token, onRefresh],
  );

  const handleDeleteAppointment = useCallback(
    async (appointmentId: string) => {
      setLoading(true);
      const result = await deleteAppointmentAction(appointmentId, token);

      if (result.success) {
        toast.success(result.message);
        onRefresh();
      } else {
        toast.error(result.message);
      }
      setDeleteConfirm(null);
      setLoading(false);
    },
    [token, onRefresh],
  );

  const handleDeleteSlot = useCallback(
    async (slotId: string) => {
      setLoading(true);
      const result = await deleteAppointmentSlotAction(slotId, token);

      if (result.success) {
        toast.success(result.message);
        onRefresh();
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    },
    [token, onRefresh],
  );

  const handleToggleSlotAvailability = useCallback(
    async (slotId: string, currentAvailability: boolean) => {
      setLoading(true);
      const result = await updateAppointmentSlotAction(
        slotId,
        { isAvailable: !currentAvailability },
        token,
      );

      if (result.success) {
        toast.success("Slot availability updated");
        onRefresh();
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    },
    [token, onRefresh],
  );

  const handleCreateSlot = useCallback(async () => {
    if (!slotFormData.startTime || !slotFormData.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (slotFormData.startTime >= slotFormData.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    const result = await createAppointmentSlotAction(slotFormData, token);

    if (result.success) {
      toast.success(result.message);
      setSlotDialog(false);
      setSlotFormData(DEFAULT_SLOT_FORM);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [slotFormData, token, onRefresh]);

  // ─── Skeleton loader ─────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appointments">
            Appointments ({appointments.length})
          </TabsTrigger>
          <TabsTrigger value="slots">Slots ({slots.length})</TabsTrigger>
        </TabsList>

        {/* ── Appointments Tab ─────────────────────────────────── */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">
                          {apt.name}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate max-w-[160px]">
                          {apt.email}
                        </TableCell>
                        <TableCell className="text-sm">{apt.topic}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(apt.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[apt.status]}>
                            {apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAppointment(apt);
                                  setStatusFormData({
                                    status: apt.status,
                                    meetLink: apt.meetLink || "",
                                    adminNote: apt.adminNote || "",
                                  });
                                  setStatusDialog(true);
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(apt.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {appointments.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No appointments yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Slots Tab ────────────────────────────────────────── */}
        <TabsContent value="slots" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Appointment Slots</CardTitle>
              <Button
                size="sm"
                onClick={() => {
                  setSlotFormData(DEFAULT_SLOT_FORM);
                  setSlotDialog(true);
                }}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Slot
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Time Range</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slots.map((slot) => (
                      <TableRow key={slot.id}>
                        <TableCell className="font-medium">
                          {DAY_LABELS[slot.dayOfWeek]}
                        </TableCell>
                        <TableCell>
                          {slot.startTime} – {slot.endTime}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={slot.isAvailable ? "default" : "secondary"}
                          >
                            {slot.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleSlotAvailability(
                                    slot.id,
                                    slot.isAvailable,
                                  )
                                }
                              >
                                {slot.isAvailable
                                  ? "Mark Unavailable"
                                  : "Mark Available"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSlot(slot.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {slots.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No slots configured</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Status Update Dialog ─────────────────────────────────── */}
      <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Appointment Status</DialogTitle>
            <DialogDescription>
              Update the status and add meeting details
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="status" className="text-xs font-semibold">
                  Status
                </Label>
                <Select
                  value={statusFormData.status}
                  onValueChange={(value) =>
                    setStatusFormData({ ...statusFormData, status: value })
                  }
                >
                  <SelectTrigger id="status" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {statusFormData.status === "CONFIRMED" && (
                <div>
                  <Label htmlFor="meetLink" className="text-xs font-semibold">
                    Meeting Link
                  </Label>
                  <Input
                    id="meetLink"
                    placeholder="https://meet.example.com/..."
                    value={statusFormData.meetLink}
                    onChange={(e) =>
                      setStatusFormData({
                        ...statusFormData,
                        meetLink: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="adminNote" className="text-xs font-semibold">
                  Admin Note
                </Label>
                <Textarea
                  id="adminNote"
                  placeholder="Add internal notes..."
                  value={statusFormData.adminNote}
                  onChange={(e) =>
                    setStatusFormData({
                      ...statusFormData,
                      adminNote: e.target.value,
                    })
                  }
                  className="mt-2 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStatusDialog(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(selectedAppointment.id)}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Create Slot Dialog ───────────────────────────────────── */}
      <Dialog
        open={slotDialog}
        onOpenChange={(open) => {
          if (!open) setSlotFormData(DEFAULT_SLOT_FORM);
          setSlotDialog(open);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Appointment Slot</DialogTitle>
            <DialogDescription>
              Create a new recurring weekly time slot for appointments
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="dayOfWeek" className="text-xs font-semibold">
                Day of Week
              </Label>
              <Select
                value={String(slotFormData.dayOfWeek)}
                onValueChange={(value) =>
                  setSlotFormData({
                    ...slotFormData,
                    dayOfWeek: Number(value),
                  })
                }
              >
                <SelectTrigger id="dayOfWeek" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {DAY_LABELS.map((day, idx) => (
                    <SelectItem key={day} value={String(idx)}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-xs font-semibold">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={slotFormData.startTime}
                  onChange={(e) =>
                    setSlotFormData({
                      ...slotFormData,
                      startTime: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-xs font-semibold">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={slotFormData.endTime}
                  onChange={(e) =>
                    setSlotFormData({
                      ...slotFormData,
                      endTime: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="slotAvailability"
                className="text-xs font-semibold"
              >
                Availability
              </Label>
              <Select
                value={slotFormData.isAvailable ? "true" : "false"}
                onValueChange={(value) =>
                  setSlotFormData({
                    ...slotFormData,
                    isAvailable: value === "true",
                  })
                }
              >
                <SelectTrigger id="slotAvailability" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSlotFormData(DEFAULT_SLOT_FORM);
                  setSlotDialog(false);
                }}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateSlot}
                disabled={loading}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Slot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ───────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              // variant="destructive"
              onClick={() =>
                deleteConfirm && handleDeleteAppointment(deleteConfirm)
              }
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
