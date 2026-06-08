export interface IExperience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;

  companyUrl?: string;
  companyLogo?: string;

  isPublished: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
