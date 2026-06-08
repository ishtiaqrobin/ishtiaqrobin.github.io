export interface IServiceIcon {
  name: string;
  library: string;
  color: string;
  bgColor: string;
}

export interface IService {
  id: string;
  name: string;
  icon?: IServiceIcon;
  description?: string;
  isPublished: boolean; // ✅ Fixed: was `isPublish`
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
