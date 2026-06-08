export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  phone?: string | null;
  isActive?: boolean;
  isBanned?: boolean;
  isReviewed?: boolean;
  reviewId?: string | null;
  createdAt?: Date | string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token?: string;
  [key: string]: unknown; // Allow additional properties from Better Auth
}
