"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, ImageUp } from "lucide-react";
import { IAbout } from "@/types/about.type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createAboutAction, updateAboutAction } from "@/actions/about.action";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface AboutManagerProps {
  about: IAbout | null;
  token: string;
  onRefresh: () => void;
}

export function AboutManager({ about, token, onRefresh }: AboutManagerProps) {
  const {
    file: aboutMeFile,
    preview: aboutMePreview,
    isCompressing: aboutMeCompressing,
    handleFileChange: handleAboutMeFileChange,
    reset: resetAboutMe,
    inputRef: aboutMeImgRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const [generalLoading, setGeneralLoading] = useState(false);
  const isEditing = !!about;

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (aboutMeFile) formData.append("aboutMeImg", aboutMeFile);

    setGeneralLoading(true);
    try {
      const result = isEditing
        ? await updateAboutAction(formData, token)
        : await createAboutAction(formData, token);

      if (result.success) {
        toast.success(result.message);
        resetAboutMe();
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("General about save error:", error);
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setGeneralLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-xl">About Section Settings</CardTitle>
              <CardDescription>
                Configure the homepage about section text, image, and resume
                URL.
              </CardDescription>
            </div>
            <Badge className="" variant={isEditing ? "default" : "secondary"}>
              {isEditing ? "Singleton record exists" : "Create about record"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    name="title"
                    defaultValue={about?.title ?? ""}
                    placeholder="Homepage about headline"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    name="subtitle"
                    defaultValue={about?.subtitle ?? ""}
                    placeholder="Short subheading"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  defaultValue={about?.description ?? ""}
                  rows={6}
                  placeholder="Write the story you want visitors to read."
                  className="rounded-lg"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Resume URL (Google Drive link)</Label>
                  <Input
                    name="resumeUrl"
                    defaultValue={about?.resumeUrl ?? ""}
                    placeholder="https://drive.google.com/..."
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>About Image</Label>
                  <div className="space-y-2">
                    {aboutMePreview && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                        <Image
                          src={aboutMePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      ref={aboutMeImgRef}
                      onChange={handleAboutMeFileChange}
                      disabled={aboutMeCompressing}
                      className="rounded-lg cursor-pointer file:cursor-pointer file:text-primary file:font-medium"
                    />
                    {aboutMeCompressing ? (
                      <p className="text-[11px] text-primary flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Compressing image…
                      </p>
                    ) : about?.aboutMeImg && !aboutMeFile ? (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <ImageUp className="h-3 w-3" />
                        Current image uploaded — select a new one to replace
                      </p>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">
                        Max 5MB · Auto-compressed to WebP
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  // size="md"
                  disabled={generalLoading}
                  className="w-full cursor-pointer"
                >
                  {generalLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save About Settings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Live Preview</CardTitle>
            <CardDescription>
              A quick summary of the current About section configuration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4">
              <div className="rounded-xl border border-border bg-background/80 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Headline</p>
                    <p className="text-base font-semibold">
                      {about?.title ?? "Not configured"}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {about?.subtitle ? "Configured" : "Missing subtitle"}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/80 p-5">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {about?.description ??
                    "Add a description to make the about section more compelling."}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assets</p>
                    <p className="mt-1 text-sm">
                      About image:{" "}
                      {about?.aboutMeImg ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                  <div className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {about ? "Live" : "Needs setup"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
