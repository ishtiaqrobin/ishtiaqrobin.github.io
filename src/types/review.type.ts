export interface IReview {
  id: string;
  userId: string;
  position: string;
  companyName: string;
  comment: string;
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
  position: string;
  companyName: string;
  comment: string;
}
