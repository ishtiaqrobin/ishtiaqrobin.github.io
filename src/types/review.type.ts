export interface IReview {
  id: string;
  userId: string;
  rating: number;
  comment?: string;
  isApproved: boolean;
  isPinned: boolean;

  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface IReviewForm {
  rating: number;
  comment?: string;
}
