export interface IVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;

  isPublished: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
