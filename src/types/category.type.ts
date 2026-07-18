export interface Category {
  id: string;
  name: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryPayload {
  name: string;
  sortOrder?: number;
  isPublished?: boolean;
}
