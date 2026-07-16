export interface Category {
  id: string;
  name: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryPayload {
  name: string;
  isPublished?: boolean;
}
