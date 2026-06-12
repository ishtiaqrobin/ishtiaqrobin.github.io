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

// For fake data
export interface ExperienceItem {
  id: number;
  position: string;
  companyName: string;
  companyUrl: string;
  logo: React.ReactNode;
  duration: string;
  responsibilities: string[];
}
