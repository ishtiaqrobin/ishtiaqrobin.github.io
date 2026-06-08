export interface IAbout {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  heroImg?: string | null;
  aboutMeImg?: string | null;
  resumeUrl?: string | null;
  resumeDownloadCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutPayload {
  title?: string;
  subtitle?: string;
  description?: string;
  heroImg?: File;
  aboutMeImg?: File;
  resume?: File;
  resumeUrl?: string;
}

export type UpdateAboutPayload = CreateAboutPayload;
