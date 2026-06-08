export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SESSION: "/auth/get-session",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    ME: "/v1/users/me",
    PROFILE: "/v1/users/profile",
    STATS: "/v1/users/stats",
  },
  TUTORS: {
    LIST: "/v1/tutors",
    DETAILS: (id: string) => `v1/tutors/${id}`,
    PROFILE: "v1/tutors/profile",
    AVAILABILITY: "v1/tutors/availability",
    STATS: "v1/tutors/stats",
  },
  CATEGORIES: {
    LIST: "/v1/categories",
    CREATE: "/v1/categories",
    DELETE: (id: string) => `/v1/categories/${id}`,
  },
  BOOKINGS: {
    CREATE: "/bookings",
    MY_BOOKINGS: "/bookings/my-bookings",
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
    COMPLETE: (id: string) => `/bookings/${id}/complete`,
  },
  REVIEWS: {
    CREATE: "/reviews",
    TUTOR_REVIEWS: (id: string) => `/reviews/tutor/${id}`,
  },
  ADMIN: {
    USERS: "/admin/users",
    BAN_USER: (id: string) => `/admin/users/${id}/ban`,
    UNBAN_USER: (id: string) => `/admin/users/${id}/unban`,
    BOOKINGS: "/admin/bookings",
    STATS: "/admin/stats",
  },
} as const;
