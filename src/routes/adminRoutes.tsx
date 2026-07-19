import { Route } from "@/types";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderKanban,
  UserCog,
  Landmark,
  Briefcase,
  MessageSquare,
  ChartBarIcon,
  HelpCircle,
} from "lucide-react";

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
        title: "Chatbot",
        url: "/admin-dashboard/chatbot",
        icon: MessageSquare,
      },
      {
        title: "Contact",
        url: "/admin-dashboard/contact",
        icon: Calendar,
      },
      {
        title: "Category",
        url: "/admin-dashboard/categories",
        icon: ChartBarIcon,
      },
      {
        title: "Projects",
        url: "/admin-dashboard/projects",
        icon: FolderKanban,
      },
      {
        title: "Reviews",
        url: "/admin-dashboard/reviews",
        icon: MessageSquare,
      },
      {
        title: "Experience",
        url: "/admin-dashboard/experience",
        icon: Briefcase,
      },
      {
        title: "Awards",
        url: "/admin-dashboard/awards",
        icon: Landmark,
      },
      {
        title: "FAQs",
        url: "/admin-dashboard/faqs",
        icon: HelpCircle,
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
