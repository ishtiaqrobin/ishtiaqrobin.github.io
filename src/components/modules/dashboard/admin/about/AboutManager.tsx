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
import {
  Loader2,
  ImageIcon,
  User,
  LayoutTemplate,
  FileText,
  LucideIcon,
  Save,
  ImageUp,
  Camera,
} from "lucide-react";
import { IAbout } from "@/types/about.type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createAboutAction, updateAboutAction } from "@/actions/about.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface AboutManagerProps {
  about: IAbout | null;
  token: string;
  onRefresh: () => void;
}

interface ImageUpdateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSave: () => void;
  loading: boolean;
  isCompressing: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  isEditing: boolean;
}

const ImageUpdateModal = ({
  isOpen,
  onOpenChange,
  title,
  preview,
  onFileChange,
  onSave,
  loading,
  isCompressing,
  fileRef,
  isEditing,
}: ImageUpdateModalProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="rounded-3xl sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-primary" /> Select New Image
          </Label>
          {preview && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={onFileChange}
            disabled={isCompressing}
            className="rounded-xl cursor-pointer file:cursor-pointer file:text-primary file:font-medium"
          />
          {isCompressing ? (
            <p className="text-[11px] text-primary flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Compressing image…
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              Max 5MB · Auto-compressed to WebP
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={loading}
          className="rounded-lg px-6 w-full"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          disabled={loading || isCompressing}
          className="rounded-lg px-8 w-full"
        >
          {(loading || isCompressing) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isEditing ? "Update" : "Upload"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

interface ImageActionCardProps {
  title: string;
  icon: LucideIcon;
  imageSrc?: string | null;
  onUpdate: () => void;
  isEditing: boolean;
  updateLabel: string;
}

const ImageActionCard = ({
  title,
  icon: Icon,
  imageSrc,
  onUpdate,
  isEditing,
  updateLabel,
}: ImageActionCardProps) => (
  <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="relative w-full aspect-auto">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={300}
            className="w-64 h-64 rounded-xl object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-40">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm">No image uploaded</p>
          </div>
        )}
      </div>
      <div className="flex justify-center md:justify-end">
        <Button
          size="sm"
          className="w-full md:w-auto cursor-pointer"
          onClick={onUpdate}
        >
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? `Update ${updateLabel}` : `Upload ${updateLabel}`}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export function AboutManager({ about, token, onRefresh }: AboutManagerProps) {
  const [isHeroUpdateOpen, setIsHeroUpdateOpen] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);
  const {
    file: heroFile,
    preview: heroPreview,
    isCompressing: heroCompressing,
    handleFileChange: handleHeroFileChange,
    reset: resetHero,
    inputRef: heroImgRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const [isAboutMeUpdateOpen, setIsAboutMeUpdateOpen] = useState(false);
  const [aboutMeLoading, setAboutMeLoading] = useState(false);
  const {
    file: aboutMeFile,
    preview: aboutMePreview,
    isCompressing: aboutMeCompressing,
    handleFileChange: handleAboutMeFileChange,
    reset: resetAboutMe,
    inputRef: aboutMeImgRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [generalLoading, setGeneralLoading] = useState(false);
  const isEditing = !!about;

  const handleSaveHero = async () => {
    if (!heroFile && !isEditing) {
      toast.error("Please select a hero image");
      return;
    }

    const formData = new FormData();
    if (heroFile) formData.append("heroImg", heroFile);

    setHeroLoading(true);
    try {
      const result = isEditing
        ? await updateAboutAction(formData, token)
        : await createAboutAction(formData, token);

      if (result.success) {
        toast.success(result.message);
        setIsHeroUpdateOpen(false);
        resetHero();
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Hero image save error:", error);
      toast.error("An unexpected error occurred while saving.");
      resetHero();
    } finally {
      setHeroLoading(false);
    }
  };

  const handleSaveAboutMe = async () => {
    if (!aboutMeFile && !isEditing) {
      toast.error("Please select an about me image");
      return;
    }

    const formData = new FormData();
    if (aboutMeFile) formData.append("aboutMeImg", aboutMeFile);

    setAboutMeLoading(true);
    try {
      const result = isEditing
        ? await updateAboutAction(formData, token)
        : await createAboutAction(formData, token);

      if (result.success) {
        toast.success(result.message);
        setIsAboutMeUpdateOpen(false);
        resetAboutMe();
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("About me image save error:", error);
      toast.error("An unexpected error occurred while saving.");
      resetAboutMe();
    } finally {
      setAboutMeLoading(false);
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > 20 * 1024 * 1024) {
      toast.error("Resume file must be smaller than 20MB.");
      e.currentTarget.value = "";
      setResumeFile(null);
      return;
    }
    setResumeFile(selected);
  };

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (resumeFile) formData.append("resume", resumeFile);

    setGeneralLoading(true);
    try {
      const result = isEditing
        ? await updateAboutAction(formData, token)
        : await createAboutAction(formData, token);

      if (result.success) {
        toast.success(result.message);
        setResumeFile(null);
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
                Configure the homepage about section text, hero/profile images,
                and resume content.
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
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    name="subtitle"
                    defaultValue={about?.subtitle ?? ""}
                    placeholder="Short subheading"
                    className="rounded-xl"
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
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Resume upload</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileChange}
                    className="rounded-xl cursor-pointer file:cursor-pointer file:text-primary file:font-medium"
                  />
                  <p className="text-sm text-muted-foreground">
                    Resume files should be PDF, DOC or DOCX and under 20MB.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Current resume</Label>
                  {about?.resumeUrl ? (
                    <div className="space-y-2">
                      <a
                        href={about.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary underline"
                      >
                        View uploaded resume
                      </a>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>
                          {about.resumeDownloadCount ?? 0} resume downloads
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No resume uploaded yet.
                    </p>
                  )}
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
              <div className="rounded-3xl border border-border bg-background/80 p-5">
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
              <div className="rounded-3xl border border-border bg-background/80 p-5">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {about?.description ??
                    "Add a description to make the about section more compelling."}
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assets</p>
                    <p className="mt-1 text-sm">
                      Hero image: {about?.heroImg ? "Uploaded" : "Not uploaded"}
                    </p>
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

      {/* Hero / About / Resume */}
      <div className="">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="hero" className="gap-2">
              <ImageUp className="h-4 w-4" />
              Hero Image
            </TabsTrigger>
            <TabsTrigger value="aboutMe" className="gap-2">
              <Camera className="h-4 w-4" />
              About Image
            </TabsTrigger>
            <TabsTrigger value="resume" className="gap-2">
              <FileText className="h-4 w-4" />
              Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <ImageActionCard
              title="Hero section image"
              icon={LayoutTemplate}
              imageSrc={about?.heroImg}
              onUpdate={() => setIsHeroUpdateOpen(true)}
              isEditing={isEditing}
              updateLabel="Hero Image"
            />
          </TabsContent>

          <TabsContent value="aboutMe" className="space-y-6">
            <ImageActionCard
              title="About-me image"
              icon={User}
              imageSrc={about?.aboutMeImg}
              onUpdate={() => setIsAboutMeUpdateOpen(true)}
              isEditing={isEditing}
              updateLabel="About Image"
            />
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Resume Upload & Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Resume management is handled from the General tab.
                  </p>
                  <div className="rounded-2xl border border-border bg-background/70 p-4">
                    <p className="text-sm font-medium">Current resume</p>
                    <p className="mt-2 text-sm text-foreground">
                      {about?.resumeUrl ? (
                        <a
                          href={about.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          Open resume file
                        </a>
                      ) : (
                        "No resume uploaded yet."
                      )}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="rounded-full bg-muted px-2 py-1">
                        Downloads: {about?.resumeDownloadCount ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ImageUpdateModal
        isOpen={isHeroUpdateOpen}
        onOpenChange={setIsHeroUpdateOpen}
        title={isEditing ? "Update Hero Image" : "Upload Hero Image"}
        preview={heroPreview}
        onFileChange={handleHeroFileChange}
        onSave={handleSaveHero}
        loading={heroLoading}
        isCompressing={heroCompressing}
        fileRef={heroImgRef}
        isEditing={isEditing}
      />

      <ImageUpdateModal
        isOpen={isAboutMeUpdateOpen}
        onOpenChange={setIsAboutMeUpdateOpen}
        title={isEditing ? "Update About Image" : "Upload About Image"}
        preview={aboutMePreview}
        onFileChange={handleAboutMeFileChange}
        onSave={handleSaveAboutMe}
        loading={aboutMeLoading}
        isCompressing={aboutMeCompressing}
        fileRef={aboutMeImgRef}
        isEditing={isEditing}
      />
    </div>
  );
}
