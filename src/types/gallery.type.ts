export interface IGallery {
  id: string;
  image: string;
  title?: string;
  description?: string;
  // Prisma model field — used when reading API response
  isPublished: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
