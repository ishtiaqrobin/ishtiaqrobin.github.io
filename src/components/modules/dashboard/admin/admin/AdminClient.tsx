"use client";

import { AdminStats } from "@/components/modules/dashboard/admin/admin/AdminStats";
import { RecentContacts } from "@/components/modules/dashboard/admin/admin/RecentContacts";
import { RefreshCcw } from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import type { IContact } from "@/types/contact.type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AdminClientProps {
  stats: AdminStatsType | null;
  token: string;
  recentContacts: IContact[];
}

export function AdminClient({
  stats,
  token,
  recentContacts,
}: AdminClientProps) {
  const router = useRouter();

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overall platform statistics and insights
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.refresh()}
          className="cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AdminStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentContacts contacts={recentContacts} />
      </div>
    </div>
  );
}
