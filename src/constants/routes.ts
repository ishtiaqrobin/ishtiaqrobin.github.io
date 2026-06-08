export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TUTORS: "/tutors",
  CATEGORIES: "/categories",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOGS: "/blogs",

  USER: {
    DASHBOARD: "/user-dashboard",
    PROFILE: "/user-dashboard/profile",
  },

  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    CATEGORIES: "/admin/categories",
  },
} as const;
