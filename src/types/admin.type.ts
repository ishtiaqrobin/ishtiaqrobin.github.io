export interface AdminStats {
  // Users
  grandTotalUsers: number;
  totalUsers: number;
  totalAdmins: number;
  totalVerifiedUsers: number;
  totalUnverifiedUsers: number;

  // Core Portfolio
  totalProjects: number;
  totalSkills: number;
  totalCategories: number;
  totalServices: number;
  totalExperiences: number;
  totalEducations: number;
  totalCertificates: number;
  totalReviews: number;
  totalGallery: number;
  totalVideos: number;
  totalTimelines: number;

  // Blog
  totalBlogs: number;
  totalPublishedBlogs: number;
  totalDraftBlogs: number;
  totalBlogTags: number;
  totalBlogComments: number;

  // Contacts & Appointments
  totalContacts: number;
  totalUnreadContacts: number;
  totalAppointments: number;
  totalPendingAppointments: number;

  // Store
  totalProducts: number;
  totalOrders: number;
  totalPaidOrders: number;

  // Analytics & Engagement
  totalPageViews: number;
  // totalChatbotLogs: number;

  // Open Source & Packages
  totalNpmPackages: number;
  totalOpenSourceContributions: number;

  // RSS
  totalRssSubscribers: number;

  // Translations
  totalTranslations: number;
}

export interface PublicStats {
  totalStudents: number;
  totalTutors: number;
  totalCategories: number;
  avgRating: number;
  studentImages: string[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  image: string | null;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBooking {
  id: string;
  studentId: string;
  tutorId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
  };
  tutor: {
    id: string;
    hourlyRate: number;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
}
