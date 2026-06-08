export interface ICategory {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface ICategoryPayload {
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  isPublished?: boolean;
  sortOrder?: number;
}
