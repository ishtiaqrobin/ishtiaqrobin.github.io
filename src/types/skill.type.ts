export interface ISkillIcon {
  name: string;
  library: string;
  color: string;
  bgColor: string;
}

export interface ISkill {
  id: string;
  name: string;
  // level: "EXPERT" | "INTERMEDIATE" | "LEARNING" | "RECENTLY_LEARNED";
  level: "EXPERT" | "INTERMEDIATE" | "LEARNING" | "RECENTLY_LEARNED";

  icon?: ISkillIcon;
  sortOrder: number;

  categoryId: string;
  category: {
    id: string;
    name: string;
    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
