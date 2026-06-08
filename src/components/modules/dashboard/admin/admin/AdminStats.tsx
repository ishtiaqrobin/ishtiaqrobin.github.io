"use client";

import { Card } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Video,
  Briefcase,
  ImageIcon,
  FileText,
  MessageSquare,
  Mail,
  CalendarClock,
  ShoppingBag,
  ShoppingCart,
  BadgeDollarSign,
  Eye,
  Package,
  GitPullRequest,
  Rss,
  Languages,
  UserX,
  Tags,
  Award,
  Activity,
  LucideIcon,
  TrendingUp,
} from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import { cn } from "@/lib/utils";

interface AdminStatsProps {
  stats: AdminStatsType | null;
}

/** Color tokens grouped by tone — keeps Tailwind classes statically analyzable. */
type Palette = {
  text: string;
  soft: string;
  ring: string;
  gradient: string;
  glow: string;
};

const PALETTES = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    soft: "bg-blue-500/10",
    ring: "ring-blue-500/20",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-400",
    soft: "bg-purple-500/10",
    ring: "ring-purple-500/20",
    gradient: "from-purple-500 to-fuchsia-500",
    glow: "shadow-purple-500/20",
  },
  green: {
    text: "text-green-600 dark:text-green-400",
    soft: "bg-green-500/10",
    ring: "ring-green-500/20",
    gradient: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/20",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    soft: "bg-orange-500/10",
    ring: "ring-orange-500/20",
    gradient: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/20",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    soft: "bg-indigo-500/10",
    ring: "ring-indigo-500/20",
    gradient: "from-indigo-500 to-violet-500",
    glow: "shadow-indigo-500/20",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    soft: "bg-rose-500/10",
    ring: "ring-rose-500/20",
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/20",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    soft: "bg-amber-500/10",
    ring: "ring-amber-500/20",
    gradient: "from-amber-500 to-yellow-500",
    glow: "shadow-amber-500/20",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    soft: "bg-cyan-500/10",
    ring: "ring-cyan-500/20",
    gradient: "from-cyan-500 to-sky-500",
    glow: "shadow-cyan-500/20",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    soft: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
  teal: {
    text: "text-teal-600 dark:text-teal-400",
    soft: "bg-teal-500/10",
    ring: "ring-teal-500/20",
    gradient: "from-teal-500 to-cyan-500",
    glow: "shadow-teal-500/20",
  },
  red: {
    text: "text-red-600 dark:text-red-400",
    soft: "bg-red-500/10",
    ring: "ring-red-500/20",
    gradient: "from-red-500 to-rose-500",
    glow: "shadow-red-500/20",
  },
  pink: {
    text: "text-pink-600 dark:text-pink-400",
    soft: "bg-pink-500/10",
    ring: "ring-pink-500/20",
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    soft: "bg-violet-500/10",
    ring: "ring-violet-500/20",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/20",
  },
  slate: {
    text: "text-slate-600 dark:text-slate-300",
    soft: "bg-slate-500/10",
    ring: "ring-slate-500/20",
    gradient: "from-slate-500 to-zinc-500",
    glow: "shadow-slate-500/20",
  },
  zinc: {
    text: "text-zinc-500 dark:text-zinc-400",
    soft: "bg-zinc-500/10",
    ring: "ring-zinc-500/20",
    gradient: "from-zinc-500 to-slate-500",
    glow: "shadow-zinc-500/20",
  },
  yellow: {
    text: "text-yellow-600 dark:text-yellow-400",
    soft: "bg-yellow-500/10",
    ring: "ring-yellow-500/20",
    gradient: "from-yellow-500 to-amber-500",
    glow: "shadow-yellow-500/20",
  },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    soft: "bg-sky-500/10",
    ring: "ring-sky-500/20",
    gradient: "from-sky-500 to-blue-500",
    glow: "shadow-sky-500/20",
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

export function AdminStats({ stats }: AdminStatsProps) {
  const cards: HeroCard[] = [
    {
      title: "Total Projects",
      value: stats?.totalProjects ?? 0,
      icon: BookOpen,
      description: "Completed & showcased projects",
      tone: "blue",
    },
    {
      title: "Total Skills",
      value: stats?.totalSkills ?? 0,
      icon: GraduationCap,
      description: "Tech stack & tools",
      tone: "purple",
    },
    {
      title: "Total Services",
      value: stats?.totalServices ?? 0,
      icon: UserCheck,
      description: "Active service offerings",
      tone: "green",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews ?? 0,
      icon: CheckCircle2,
      description: "Client feedback & testimonials",
      tone: "orange",
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
          title: "Experience",
          value: stats?.totalExperiences ?? 0,
          icon: Briefcase,
          tone: "emerald",
        },
        {
          title: "Education",
          value: stats?.totalEducations ?? 0,
          icon: GraduationCap,
          tone: "cyan",
        },
        {
          title: "Certificates",
          value: stats?.totalCertificates ?? 0,
          icon: Award,
          tone: "yellow",
        },
        {
          title: "Videos",
          value: stats?.totalVideos ?? 0,
          icon: Video,
          tone: "rose",
        },
        {
          title: "Gallery",
          value: stats?.totalGallery ?? 0,
          icon: ImageIcon,
          tone: "amber",
        },
        {
          title: "Categories",
          value: stats?.totalCategories ?? 0,
          icon: Tags,
          tone: "orange",
        },
        {
          title: "Timelines",
          value: stats?.totalTimelines ?? 0,
          icon: Activity,
          tone: "teal",
        },
      ],
    },
    {
      heading: "Blog",
      cards: [
        {
          title: "All Blogs",
          value: stats?.totalBlogs ?? 0,
          icon: FileText,
          tone: "blue",
        },
        {
          title: "Published",
          value: stats?.totalPublishedBlogs ?? 0,
          icon: CheckCircle2,
          tone: "green",
        },
        {
          title: "Drafts",
          value: stats?.totalDraftBlogs ?? 0,
          icon: FileText,
          tone: "zinc",
        },
        {
          title: "Tags",
          value: stats?.totalBlogTags ?? 0,
          icon: Tags,
          tone: "pink",
        },
        {
          title: "Comments",
          value: stats?.totalBlogComments ?? 0,
          icon: MessageSquare,
          tone: "violet",
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
        {
          title: "Appointments",
          value: stats?.totalAppointments ?? 0,
          icon: CalendarClock,
          tone: "emerald",
        },
        {
          title: "Pending Appointments",
          value: stats?.totalPendingAppointments ?? 0,
          icon: CalendarClock,
          tone: "amber",
        },
      ],
    },
    {
      heading: "Store",
      cards: [
        {
          title: "Products",
          value: stats?.totalProducts ?? 0,
          icon: ShoppingBag,
          tone: "indigo",
        },
        {
          title: "Orders",
          value: stats?.totalOrders ?? 0,
          icon: ShoppingCart,
          tone: "blue",
        },
        {
          title: "Paid Orders",
          value: stats?.totalPaidOrders ?? 0,
          icon: BadgeDollarSign,
          tone: "green",
        },
      ],
    },
    {
      heading: "Engagement & Open Source",
      cards: [
        {
          title: "Page Views",
          value: stats?.totalPageViews ?? 0,
          icon: Eye,
          tone: "sky",
        },
        {
          title: "npm Packages",
          value: stats?.totalNpmPackages ?? 0,
          icon: Package,
          tone: "red",
        },
        {
          title: "OSS Contributions",
          value: stats?.totalOpenSourceContributions ?? 0,
          icon: GitPullRequest,
          tone: "purple",
        },
        {
          title: "RSS Subscribers",
          value: stats?.totalRssSubscribers ?? 0,
          icon: Rss,
          tone: "orange",
        },
        {
          title: "Translations",
          value: stats?.totalTranslations ?? 0,
          icon: Languages,
          tone: "cyan",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* ─── Hero stats ──────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const p = PALETTES[card.tone];
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className={cn(
                "group relative overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm",
                "transition-all duration-300 hover:-translate-y-1 hover:border-border",
                "shadow-sm hover:shadow-lg",
                p.glow,
              )}
            >
              {/* top gradient accent bar */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                  p.gradient,
                )}
              />
              {/* decorative blurred orb */}
              <div
                className={cn(
                  "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-linear-to-br",
                  p.gradient,
                )}
              />

              <div className="relative p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold tracking-tight tabular-nums">
                      {formatNumber(card.value)}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset",
                      p.soft,
                      p.ring,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", p.text)} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className={cn("h-3.5 w-3.5", p.text)} />
                  <span className="truncate">{card.description}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ─── Grouped sub-sections ────────────────────────────────────── */}
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
            {section.cards.map((card) => {
              const p = PALETTES[card.tone];
              const Icon = card.icon;
              return (
                <Card
                  key={card.title}
                  className={cn(
                    "group relative overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card/70",
                    "shadow-sm hover:shadow-md",
                  )}
                >
                  {/* left gradient accent stripe */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 w-1 bg-linear-to-b opacity-70 group-hover:opacity-100 transition-opacity",
                      p.gradient,
                    )}
                  />

                  <div className="flex items-center gap-3 p-4 pl-5">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-transform duration-300 group-hover:scale-105",
                        p.soft,
                        p.ring,
                      )}
                    >
                      <Icon className={cn("h-4.5 w-4.5", p.text)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {card.title}
                      </p>
                      <p className="text-xl font-bold tabular-nums leading-tight">
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
