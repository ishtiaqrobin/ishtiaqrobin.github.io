export interface IProjectSection {
  id: string;
  label: string;
  content: string;
}

export interface IProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  bannerImage?: string;
  year?: string;
  bgColor?: string;
  liveUrl?: string;
  githubUrl?: string;
  roles?: string;
  client?: string;
  techStack: string[];
  tags: string[];
  sections?: IProjectSection[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

// For fake projects cards (legacy)
export interface Project {
  id: string;
  title: string;
  categories: string[];
  year: string;
  image: string;
  bgColor: string;
}
