"use client";

import { useEffect, useState } from "react";
import {
  User as UserIcon,
  Star,
  Calendar,
  ShieldCheck,
  ArrowRight,
  LayoutDashboard,
  MessageSquare,
  Settings
} from "lucide-react";
import { StatsCard } from "@/components/modules/user/StatsCard";
import { useAuth } from "@/hooks/useAuth";
// import { motion } from "framer-motion";
import { motion } from "motion/react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8 min-h-screen pb-10">
      {/* Header Section */}
      <motion.div
        // initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden shadow-md hover:shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 transition-shadow duration-300"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting()}, <span className="text-primary">{user?.name}</span>!
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Welcome back to your dashboard. Here&apos;s an overview of your account and recent activities.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link href="/user-dashboard/profile">
              <Button
                variant={"default"}
                // size={"sm"}
                className="cursor-pointer">
                Edit Profile
                {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
              </Button>
            </Link>
            <Button
              variant="outline"
              // size={"sm"}
              className="cursor-pointer">
              <Link href="/">View Portfolio</Link>
            </Button>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center relative z-10">
          <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-xl">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl -z-0" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Account Status"
          value={user?.isActive ? "Active" : "Pending"}
          description="Your current account state"
          icon={ShieldCheck}
          color="text-emerald-600"
          bg="bg-emerald-100"
        />
        <StatsCard
          title="Reviews Given"
          value={user?.isReviewed ? "1" : "0"}
          description={user?.isReviewed ? "Thank you for your feedback!" : "You haven't reviewed yet"}
          icon={Star}
          color="text-amber-600"
          bg="bg-amber-100"
        />
        <StatsCard
          title="Member Since"
          value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : "N/A"}
          description="When you joined our platform"
          icon={Calendar}
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatsCard
          title="Role"
          value={user?.role || "User"}
          description="Your current access level"
          icon={UserIcon}
          color="text-purple-600"
          bg="bg-purple-100"
        />
      </div>

      {/* Quick Links & Info */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-3xl border shadow-md hover:shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 overflow-hidden group transition-all duration-300">
          <CardHeader className="bg-primary/5 pt-2 pb-0.5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              Review Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">
              {user?.isReviewed
                ? "You have already shared your thoughts. You can update or delete your review at any time."
                : "Share your experience working with me. Your feedback is highly appreciated!"}
            </p>
            <Link href="/user-dashboard/review">
              <Button
                variant={"default"}
                size={"sm"}
                className="w-full cursor-pointer">
                {user?.isReviewed ? "Manage My Review" : "Write a Review"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border shadow-md hover:shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 overflow-hidden group transition-all duration-300">
          <CardHeader className="bg-primary/5 pt-2 pb-0.5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserIcon className="h-5 w-5 text-primary" />
              Personal Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">
              Keep your profile information up to date to ensure the best experience on the platform.
            </p>
            <Link href="/user-dashboard/profile">
              <Button
                variant="default"
                size={"sm"}
                className="w-full cursor-pointer">
                Update Information
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border shadow-md hover:shadow-lg shadow-primary-400/30 hover:shadow-primary-400/50 overflow-hidden group transition-all duration-300">
          <CardHeader className="bg-primary/5 pt-2 pb-0.5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-primary" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">
              Manage your password and other account-related preferences here.
            </p>
            <Link href="/user-dashboard/profile">
              <Button
                variant="default"
                size={"sm"}
                className="w-full cursor-pointer">
                Security Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
