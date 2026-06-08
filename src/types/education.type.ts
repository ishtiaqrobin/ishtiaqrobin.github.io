export interface IEducation {
  id: string;
  degree: string;
  institution: string;
  board?: string;
  startDate: string;
  endDate?: string;
  result: string;
  group?: string;

  isPublished: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
