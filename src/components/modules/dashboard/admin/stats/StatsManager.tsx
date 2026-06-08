// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, TrendingUp, Briefcase, LayoutGrid, Users } from "lucide-react";
// import { IStats } from "@/types";
// import { updateStatsAction } from "@/actions/stats.action";
// import { toast } from "sonner";

// interface StatsManagerProps {
//     stats: IStats | null;
//     token: string;
//     onRefresh: () => void;
// }

// export function StatsManager({ stats, token, onRefresh }: StatsManagerProps) {
//     const [loading, setLoading] = useState(false);

//     const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);

//         const data = {
//             experience: Number(formData.get("experience")),
//             projects: Number(formData.get("projects")),
//             happyClients: Number(formData.get("happyClients")),
//             successRate: Number(formData.get("successRate")),
//         };

//         setLoading(true);
//         const result = await updateStatsAction(data, token);
//         if (result.success) {
//             toast.success(result.message);
//             onRefresh();
//         } else {
//             toast.error(result.message);
//         }
//         setLoading(false);
//     };

//     return (
//         <Card className="rounded-3xl border-none shadow-sm bg-muted/20">
//             <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-primary" />
//                     Public Statistics
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSave} className="space-y-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                             <Label className="flex items-center gap-2">
//                                 <Briefcase className="h-4 w-4" /> Years of Experience
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="experience"
//                                 defaultValue={stats?.experience || 0}
//                                 required
//                                 className="rounded-xl"
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label className="flex items-center gap-2">
//                                 <LayoutGrid className="h-4 w-4" /> Total Projects
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="projects"
//                                 defaultValue={stats?.projects || 0}
//                                 required
//                                 className="rounded-xl"
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label className="flex items-center gap-2">
//                                 <Users className="h-4 w-4" /> Happy Clients
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="happyClients"
//                                 defaultValue={stats?.happyClients || 0}
//                                 required
//                                 className="rounded-xl"
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label className="flex items-center gap-2">
//                                 <TrendingUp className="h-4 w-4" /> Success Rate (%)
//                             </Label>
//                             <Input
//                                 type="number"
//                                 name="successRate"
//                                 defaultValue={stats?.successRate || 0}
//                                 required
//                                 className="rounded-xl"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex justify-end pt-4">
//                         <Button
//                             type="submit"
//                             disabled={loading}
//                             size={"md"}
//                             className="cursor-pointer">
//                             {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
//                             Update Statistics
//                         </Button>
//                     </div>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Loader2,
  TrendingUp,
  Briefcase,
  LayoutGrid,
  Users,
  Save,
} from "lucide-react";
import { IStats } from "@/types";
import { updateStatsAction } from "@/actions/stats.action";
import { toast } from "sonner";

interface StatsManagerProps {
  stats: IStats | null;
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

const STAT_FIELDS = [
  {
    name: "experience",
    label: "Years of Experience",
    icon: Briefcase,
    placeholder: "5",
    suffix: "yrs",
  },
  {
    name: "projects",
    label: "Total Projects",
    icon: LayoutGrid,
    placeholder: "50",
    suffix: "+",
  },
  {
    name: "happyClients",
    label: "Happy Clients",
    icon: Users,
    placeholder: "30",
    suffix: "+",
  },
  {
    name: "successRate",
    label: "Success Rate",
    icon: TrendingUp,
    placeholder: "98",
    suffix: "%",
  },
] as const;

export function StatsManager({
  stats,
  token,
  onRefresh,
  isLoading = false,
}: StatsManagerProps) {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      experience: Number(formData.get("experience")),
      projects: Number(formData.get("projects")),
      happyClients: Number(formData.get("happyClients")),
      successRate: Number(formData.get("successRate")),
    };

    setLoading(true);
    const result = await updateStatsAction(data, token);
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Public Statistics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          These numbers appear on your portfolio homepage
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STAT_FIELDS.map(
              ({ name, label, icon: Icon, placeholder, suffix }) => (
                <div key={name} className="space-y-2">
                  <Label
                    htmlFor={name}
                    className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={name}
                      type="number"
                      name={name}
                      min={0}
                      defaultValue={stats?.[name] ?? 0}
                      placeholder={placeholder}
                      required
                      className="rounded-xl h-11 pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                      {suffix}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Preview strip */}
          {stats && (
            <div className="grid grid-cols-4 gap-3 p-4 rounded-xl bg-muted/40 border border-border/50">
              {STAT_FIELDS.map(({ name, label, suffix, icon: Icon }) => (
                <div key={name} className="text-center space-y-1">
                  <p className="text-lg font-bold">
                    {stats[name]}
                    <span className="text-primary text-sm">{suffix}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Statistics
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
