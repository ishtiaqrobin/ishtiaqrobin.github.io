export interface IExperience {
  id: string;
  position: string;
  companyName: string;
  companyUrl?: string;
  companyLogo?: string;
  responsibilities: string[];
  startDate: string;
  endDate?: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
