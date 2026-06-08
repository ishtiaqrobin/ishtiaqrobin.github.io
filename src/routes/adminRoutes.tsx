import { Route } from "@/types";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderKanban,
  UserCog,
  TrendingUp,
  Landmark,
  Settings,
  Image,
  GraduationCap,
  Briefcase,
  Wrench,
  Video,
  MessageSquare,
  Cpu,
  ChartColumn,
} from "lucide-react";

import { IoIosStats } from "react-icons/io";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "About",
        url: "/admin-dashboard/about",
        icon: UserCog,
      },
      {
        title: "Education",
        url: "/admin-dashboard/education",
        icon: GraduationCap,
      },
      {
        title: "Chatbot",
        url: "/admin-dashboard/chatbot",
        icon: MessageSquare,
      },
      {
        title: "Blogs",
        url: "/admin-dashboard/blogs",
        icon: FolderKanban,
      },
      {
        title: "Comments",
        url: "/admin-dashboard/comments",
        icon: MessageSquare,
      },
      {
        title: "Experience",
        url: "/admin-dashboard/experience",
        icon: Briefcase,
      },
      {
        title: "Certificates",
        url: "/admin-dashboard/certificates",
        icon: Landmark,
      },
      {
        title: "Skills",
        url: "/admin-dashboard/skills",
        icon: Cpu,
      },
      {
        title: "Services",
        url: "/admin-dashboard/services",
        icon: Wrench,
      },
      {
        title: "Contact",
        url: "/admin-dashboard/contact",
        icon: Calendar,
      },
      {
        title: "Gallery",
        url: "/admin-dashboard/gallery",
        icon: Image,
      },
      {
        title: "Projects",
        url: "/admin-dashboard/projects",
        icon: FolderKanban,
      },
      {
        title: "Videos",
        url: "/admin-dashboard/video",
        icon: Video,
      },
      {
        title: "Reviews",
        url: "/admin-dashboard/reviews",
        icon: MessageSquare,
      },
      {
        title: "Category",
        url: "/admin-dashboard/categories",
        icon: FolderKanban,
      },
      {
        title: "Appointments",
        url: "/admin-dashboard/appointments",
        icon: Calendar,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },

      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: UserCog,
      },
    ],
  },
];
