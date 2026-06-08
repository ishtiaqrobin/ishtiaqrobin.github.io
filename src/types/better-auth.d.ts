declare module "better-auth" {
  interface User {
    role: "STUDENT" | "TUTOR" | "ADMIN";
    phone?: string | null;
    isActive: boolean;
    isBanned: boolean;
  }
}
