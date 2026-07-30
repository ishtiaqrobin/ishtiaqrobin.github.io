"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const numberFmt = new Intl.NumberFormat("en-US");

type Kpi = {
  title: string;
  value: number;
  description: string;
  icon: typeof Eye;
  iconColor: string;
  iconBg: string;
};

export function HeroCards({
  totalViews,
  uniquePages,
  uniqueVisitors,
}: {
  totalViews: number;
  uniquePages: number;
  uniqueVisitors: number;
}) {
  const kpis: Kpi[] = [
    {
      title: "Total Page Views",
      value: totalViews,
      description: "All-time across every page",
      icon: Eye,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Unique Pages",
      value: uniquePages,
      description: "Distinct pages visited",
      icon: FileText,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "Unique Visitors",
      value: uniqueVisitors,
      description: "By distinct IP address",
      icon: Globe,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ title, value, description, icon: Icon, iconColor, iconBg }) => (
        <Card
          key={title}
          className="overflow-hidden transition-all shadow hover:shadow-md border-primary/10 p-4"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div
              className={cn("flex p-2 items-center justify-center rounded-lg", iconBg)}
            >
              <Icon className={cn("h-4 w-4", iconColor)} />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{numberFmt.format(value)}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
