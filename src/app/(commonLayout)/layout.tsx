import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CustomCursor } from "@/components/common/CustomCursor";
import React from "react";
import Footer from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <CustomCursor /> */}
      <Navbar />
      <MobileNav />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <ScrollToTop /> */}
    </div>
  );
};

export default CommonLayout;
