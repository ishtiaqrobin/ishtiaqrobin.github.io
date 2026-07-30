"use client";

import { Card } from "@/components/ui/card";
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

/** A single restrained accent per hero card — used only on the icon badge. */
type Accent = {
  text: string;
  soft: string;
};

const ACCENTS = {
  blue: { text: "text-blue-600 dark:text-blue-400", soft: "bg-blue-500/10" },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    soft: "bg-orange-500/10",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-400",
    soft: "bg-purple-500/10",
  },
} as const satisfies Record<string, Accent>;

type AccentKey = keyof typeof ACCENTS;

const formatNumber = (n: number) =>
  n >= 1000 ? new Intl.NumberFormat("en-US").format(n) : String(n);

type HeroCard = {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  accent: AccentKey;
};

type SubCard = {
  title: string;
  value: number;
  icon: LucideIcon;
};

type SubSection = {
  heading: string;
  cards: SubCard[];
};

export function AdminStats({ stats }: AdminStatsProps) {
  const cards: HeroCard[] = [
    {
      title: "Total Projects",
      value: stats?.totalProjects ?? 0,
      icon: BookOpen,
      description: "Completed & showcased projects",
      accent: "blue",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews ?? 0,
      icon: CheckCircle2,
      description: "Client feedback & testimonials",
      accent: "orange",
    },
    {
      title: "Page Views",
      value: stats?.totalPageViews ?? 0,
      icon: Eye,
      description: "All-time page views",
      accent: "purple",
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
        },
        { title: "Users", value: stats?.totalUsers ?? 0, icon: Users },
        { title: "Admins", value: stats?.totalAdmins ?? 0, icon: UserCheck },
        {
          title: "Verified",
          value: stats?.totalVerifiedUsers ?? 0,
          icon: CheckCircle2,
        },
        {
          title: "Unverified",
          value: stats?.totalUnverifiedUsers ?? 0,
          icon: UserX,
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
        },
        { title: "Categories", value: stats?.totalCategories ?? 0, icon: Tags },
        {
          title: "Experiences",
          value: stats?.totalExperiences ?? 0,
          icon: Briefcase,
        },
        { title: "Awards", value: stats?.totalAwards ?? 0, icon: Award },
        { title: "FAQs", value: stats?.totalFaqs ?? 0, icon: MessageSquare },
      ],
    },
    {
      heading: "Contacts & Appointments",
      cards: [
        { title: "Contacts", value: stats?.totalContacts ?? 0, icon: Mail },
        {
          title: "Unread Contacts",
          value: stats?.totalUnreadContacts ?? 0,
          icon: Mail,
        },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* ─── Hero stats ──────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const a = ACCENTS[card.accent];
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className={cn(
                "border border-border/60 bg-card",
                "transition-colors duration-200 hover:border-border",
              )}
            >
              <div className="flex items-start justify-between p-5">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-3xl font-semibold tracking-tight tabular-nums">
                    {formatNumber(card.value)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    a.soft,
                  )}
                >
                  <Icon className={cn("h-5 w-5", a.text)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ─── Grouped sub-sections ────────────────────────────────────── */}
      {sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {section.heading}
            </h2>
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {section.cards.length}
            </span>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {section.cards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.title}
                  className={cn(
                    "border border-border/60 bg-card",
                    "transition-colors duration-200 hover:border-border",
                  )}
                >
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {card.title}
                      </p>
                      <p className="text-lg font-semibold tabular-nums leading-tight">
                        {formatNumber(card.value)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
