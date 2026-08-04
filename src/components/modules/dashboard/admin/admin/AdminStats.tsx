"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  CheckCircle2,
  BookOpen,
  Briefcase,
  MessageSquare,
  Mail,
  Eye,
  UserX,
  Tags,
  Award,
  LucideIcon,
} from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import { cn } from "@/lib/utils";

interface AdminStatsProps {
  stats: AdminStatsType | null;
}

type Palette = {
  iconColor: string;
  iconBg: string;
};

const PALETTES = {
  blue: {
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  purple: {
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  green: {
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  orange: {
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  indigo: {
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  rose: {
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
  },
  amber: {
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  cyan: {
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
  },
  emerald: {
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  teal: {
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
  },
  red: {
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
  pink: {
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
  },
  violet: {
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  slate: {
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
  },
  yellow: {
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  sky: {
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
  },
} as const satisfies Record<string, Palette>;

type Tone = keyof typeof PALETTES;

const formatNumber = (n: number) =>
  n >= 1000 ? new Intl.NumberFormat("en-US").format(n) : String(n);

type HeroCard = {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  tone: Tone;
};

type SubCard = {
  title: string;
  value: number;
  icon: LucideIcon;
  tone: Tone;
};

type SubSection = {
  heading: string;
  cards: SubCard[];
};

function StatCard({ title, value, icon: Icon, description, tone }: HeroCard) {
  const p = PALETTES[tone];
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all shadow hover:shadow-md border-primary/10",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={cn(
            "flex p-2 items-center justify-center rounded-lg",
            p.iconBg,
          )}
        >
          <Icon className={cn("h-4 w-4", p.iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold">{formatNumber(value)}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function MiniStatCard({ title, value, icon: Icon, tone }: SubCard) {
  const p = PALETTES[tone];
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all shadow hover:shadow-md border-primary/10 p-3",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex p-2 items-center justify-center rounded-lg shrink-0",
            p.iconBg,
          )}
        >
          <Icon className={cn("h-4 w-4", p.iconColor)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {title}
          </p>
          <p className="text-lg font-bold tabular-nums leading-tight">
            {formatNumber(value)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function AdminStats({ stats }: AdminStatsProps) {
  const heroCards: HeroCard[] = [
    {
      title: "Total Projects",
      value: stats?.totalProjects ?? 0,
      icon: BookOpen,
      description: "Completed & showcased projects",
      tone: "blue",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews ?? 0,
      icon: CheckCircle2,
      description: "Client feedback & testimonials",
      tone: "orange",
    },
    {
      title: "Page Views",
      value: stats?.totalPageViews ?? 0,
      icon: Eye,
      description: "All-time page views",
      tone: "purple",
    },
  ];

  const sections: SubSection[] = [
    {
      heading: "Users",
      cards: [
        {
          title: "All Accounts",
          value: stats?.grandTotalUsers ?? 0,
          icon: Users,
          tone: "slate",
        },
        {
          title: "Users",
          value: stats?.totalUsers ?? 0,
          icon: Users,
          tone: "slate",
        },
        {
          title: "Admins",
          value: stats?.totalAdmins ?? 0,
          icon: UserCheck,
          tone: "indigo",
        },
        {
          title: "Verified",
          value: stats?.totalVerifiedUsers ?? 0,
          icon: CheckCircle2,
          tone: "green",
        },
        {
          title: "Unverified",
          value: stats?.totalUnverifiedUsers ?? 0,
          icon: UserX,
          tone: "red",
        },
      ],
    },
    {
      heading: "Portfolio",
      cards: [
        {
          title: "Certificates",
          value: stats?.totalCertificates ?? 0,
          icon: Award,
          tone: "yellow",
        },
        {
          title: "Categories",
          value: stats?.totalCategories ?? 0,
          icon: Tags,
          tone: "orange",
        },
        {
          title: "Experiences",
          value: stats?.totalExperiences ?? 0,
          icon: Briefcase,
          tone: "cyan",
        },
        {
          title: "Awards",
          value: stats?.totalAwards ?? 0,
          icon: Award,
          tone: "amber",
        },
        {
          title: "FAQs",
          value: stats?.totalFaqs ?? 0,
          icon: MessageSquare,
          tone: "teal",
        },
      ],
    },
    {
      heading: "Contacts & Appointments",
      cards: [
        {
          title: "Contacts",
          value: stats?.totalContacts ?? 0,
          icon: Mail,
          tone: "blue",
        },
        {
          title: "Unread Contacts",
          value: stats?.totalUnreadContacts ?? 0,
          icon: Mail,
          tone: "red",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {heroCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {section.heading}
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
            <span className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {section.cards.length}
            </span>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {section.cards.map((card) => (
              <MiniStatCard key={card.title} {...card} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
