"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IContact, ContactStatus } from "@/types/contact.type";

const statusColor: Record<ContactStatus, string> = {
  UNREAD: "bg-red-100 text-red-700 hover:bg-red-200",
  READ: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  REPLIED: "bg-green-100 text-green-700 hover:bg-green-200",
  ARCHIVED: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const truncate = (str: string | null | undefined, max = 60) => {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max)}…` : str;
};

export function RecentContacts({ contacts }: { contacts: IContact[] }) {
  if (contacts.length === 0) return null;

  return (
    <Card className="overflow-hidden transition-all shadow hover:shadow-md border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-primary/5">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">
            Unread Contacts
          </CardTitle>
        </div>
        <Badge variant="outline" className="tabular-nums">
          {contacts.length}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {contacts.slice(0, 5).map((contact) => (
            <div
              key={contact.id}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    {contact.name}
                  </p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {contact.subject}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground/60">
                  {truncate(contact.message)}
                </p>
              </div>
              <Badge
                className={cn(
                  "shrink-0 border-0 text-[10px] font-medium",
                  statusColor[contact.status],
                )}
                variant="outline"
              >
                {contact.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
