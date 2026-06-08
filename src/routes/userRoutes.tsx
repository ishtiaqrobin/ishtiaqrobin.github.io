import { Route } from "@/types";
import { Calendar, LayoutDashboard, User, ShoppingBag, MessageSquare } from "lucide-react";

export const userRoutes: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/user-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        url: "/user-dashboard/profile",
        icon: User,
      },
      {
        title: "My Review",
        url: "/user-dashboard/review",
        icon: MessageSquare,
      },
    ],
  },
];
