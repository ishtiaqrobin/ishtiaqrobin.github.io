export interface IProjectImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string; // ✅ Fixed: was behanceUrl
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  images?: IProjectImage[];
  createdAt: string;
  updatedAt: string;
}

// For fake projects cards
export interface Project {
  id: string;
  title: string;
  categories: string[];
  year: string;
  image: string;
  bgColor: string;
}
