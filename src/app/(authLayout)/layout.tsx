import Footer from "@/components/layout/Footer";
import { AuthNavbar } from "@/components/layout/AuthNavbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <div className="mb-4 sm:mb-8">
        <AuthNavbar />
      </div>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
};

export default AuthLayout;
