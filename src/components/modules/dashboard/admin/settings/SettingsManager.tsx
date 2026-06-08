/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Settings2,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Save,
  Search,
  LucideIcon,
} from "lucide-react";
import { ISettings } from "@/types";
import { updateSettingsAction } from "@/actions/setting.action";
import { toast } from "sonner";

interface SettingsManagerProps {
  settings: ISettings | null;
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ─── helper ───────────────────────────────────────────────────────────────────
function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </Label>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-4">
      {children}
    </h3>
  );
}

export function SettingsManager({
  settings,
  token,
  onRefresh,
  isLoading = false,
}: SettingsManagerProps) {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const str = (key: string) => (fd.get(key) as string) || undefined;

    const data: Partial<ISettings> = {
      // Site identity
      siteTitle: str("siteTitle"),
      tagline: str("tagline"),

      // Social
      linkedinUrl: str("linkedinUrl"),
      githubUrl: str("githubUrl"),
      facebookUrl: str("facebookUrl"),
      instagramUrl: str("instagramUrl"),
      twitterUrl: str("twitterUrl"),
      youtubeUrl: str("youtubeUrl"),

      // Contact
      resumeLink: str("resumeLink"),
      contactEmail: str("contactEmail"),
      contactPhone: str("contactPhone"),
      whatsappNumber: str("whatsappNumber"),
      address: str("address"),

      // Professional
      availability: str("availability"),
      experience: str("experience"),

      // SEO
      metaDescription: str("metaDescription"),
      metaKeywords: str("metaKeywords"),
    };

    setLoading(true);
    const result = await updateSettingsAction(data, token);
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
        <CardContent className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-12 rounded-xl" />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          Global Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your site identity, social links, contact info, and SEO
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSave} className="space-y-8">
          {/* ── Site Identity ─────────────────────────────────────── */}
          <div>
            <SectionHeading>Site Identity</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="siteTitle" icon={Globe}>
                  Site Title
                </FieldLabel>
                <Input
                  id="siteTitle"
                  name="siteTitle"
                  defaultValue={settings?.siteTitle || ""}
                  placeholder="John Doe — Portfolio"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="tagline" icon={Globe}>
                  Tagline
                </FieldLabel>
                <Input
                  id="tagline"
                  name="tagline"
                  defaultValue={settings?.tagline || ""}
                  placeholder="Full-Stack Developer & Designer"
                  className="rounded-xl h-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Social Links ──────────────────────────────────────── */}
          <div>
            <SectionHeading>Social Links</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "linkedinUrl",
                  icon: Linkedin,
                  label: "LinkedIn URL",
                  placeholder: "https://linkedin.com/in/username",
                },
                {
                  id: "githubUrl",
                  icon: Github,
                  label: "GitHub URL",
                  placeholder: "https://github.com/username",
                },
                {
                  id: "facebookUrl",
                  icon: Facebook,
                  label: "Facebook URL",
                  placeholder: "https://facebook.com/username",
                },
                {
                  id: "instagramUrl",
                  icon: Instagram,
                  label: "Instagram URL",
                  placeholder: "https://instagram.com/username",
                },
                {
                  id: "twitterUrl",
                  icon: Twitter,
                  label: "Twitter / X URL",
                  placeholder: "https://x.com/username",
                },
                {
                  id: "youtubeUrl",
                  icon: Youtube,
                  label: "YouTube URL",
                  placeholder: "https://youtube.com/@username",
                },
              ].map(({ id, icon, label, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <FieldLabel htmlFor={id} icon={icon}>
                    {label}
                  </FieldLabel>
                  <Input
                    id={id}
                    name={id}
                    type="url"
                    defaultValue={(settings as any)?.[id] || ""}
                    placeholder={placeholder}
                    className="rounded-xl h-10"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Contact & Professional ────────────────────────────── */}
          <div>
            <SectionHeading>Contact & Professional</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="contactEmail" icon={Mail}>
                  Contact Email
                </FieldLabel>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  defaultValue={settings?.contactEmail || ""}
                  placeholder="hello@example.com"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="resumeLink" icon={FileText}>
                  Resume Link
                </FieldLabel>
                <Input
                  id="resumeLink"
                  name="resumeLink"
                  type="url"
                  defaultValue={settings?.resumeLink || ""}
                  placeholder="https://drive.google.com/..."
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="contactPhone" icon={Phone}>
                  Contact Phone
                </FieldLabel>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  defaultValue={settings?.contactPhone || ""}
                  placeholder="+880 1XXX XXXXXX"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="whatsappNumber" icon={MessageSquare}>
                  WhatsApp Number
                </FieldLabel>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  defaultValue={settings?.whatsappNumber || ""}
                  placeholder="+880 1XXX XXXXXX"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="address" icon={MapPin}>
                  Address / Location
                </FieldLabel>
                <Input
                  id="address"
                  name="address"
                  defaultValue={settings?.address || ""}
                  placeholder="Dhaka, Bangladesh"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="availability" icon={Calendar}>
                  Availability
                </FieldLabel>
                <Input
                  id="availability"
                  name="availability"
                  defaultValue={settings?.availability || ""}
                  placeholder="Full-time / Freelance"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <FieldLabel htmlFor="experience" icon={Briefcase}>
                  Experience (text)
                </FieldLabel>
                <Input
                  id="experience"
                  name="experience"
                  defaultValue={settings?.experience || ""}
                  placeholder="3+ Years of professional experience"
                  className="rounded-xl h-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ── SEO ──────────────────────────────────────────────── */}
          <div>
            <SectionHeading>SEO</SectionHeading>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="metaDescription" icon={Search}>
                  Meta Description
                </FieldLabel>
                <Input
                  id="metaDescription"
                  name="metaDescription"
                  defaultValue={settings?.metaDescription || ""}
                  placeholder="A short description for search engines (150–160 chars)"
                  className="rounded-xl h-10"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="metaKeywords" icon={Search}>
                  Meta Keywords
                </FieldLabel>
                <Input
                  id="metaKeywords"
                  name="metaKeywords"
                  defaultValue={settings?.metaKeywords || ""}
                  placeholder="portfolio, developer, react, nextjs"
                  className="rounded-xl h-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer min-w-[160px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
