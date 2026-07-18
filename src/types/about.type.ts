export interface IAbout {
  id: string;

  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  resumeUrl?: string | null;

  aboutMeImg?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutPayload {
  title?: string;
  subtitle?: string;
  description?: string;

  aboutMeImg?: File;
  resumeUrl?: string;
}

export type UpdateAboutPayload = CreateAboutPayload;
