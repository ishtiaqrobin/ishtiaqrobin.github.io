"use client";

import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { AvatarUpload } from "@/components/modules/profile/AvatarUpload";
import { userService } from "@/services/user.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User as UserType } from "@/types/user.type";
import { ChangePasswordForm } from "@/components/modules/auth/ChangePasswordForm";
import { User as UserIcon } from "lucide-react";

interface UserProfileClientProps {
  userToken: string;
}

export function UserProfileClient({ userToken }: UserProfileClientProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { data, error } = await userService.getMe(userToken);

      if (error) {
        toast.error("Failed to load profile", { description: error.message });
      } else if (data) {
        setUser(data);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [userToken]);

  const handleAvatarUpdate = async (file: File) => {
    if (!userToken) return;

    const formData = new FormData();
    formData.append("image", file);

    const { error } = await userService.updateProfile(userToken, formData);

    if (error) {
      toast.error("Failed to update profile picture");
    } else {
      toast.success("Profile picture updated successfully");
      // Refetch profile to get updated data
      const { data } = await userService.getMe(userToken);
      if (data) setUser(data);
    }
  };

  const handleProfileUpdate = async () => {
    // Refetch profile after successful update
    const { data } = await userService.getMe(userToken);
    if (data) setUser(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <div>
          <Skeleton className="h-9 w-[300px]" />
          <Skeleton className="h-5 w-[450px] mt-2" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <Card className="lg:col-span-4 border-primary/10 shadow-lg rounded-3xl overflow-hidden h-fit">
            <div className="h-24 bg-muted/20" />
            <CardContent className="-mt-16 relative flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
              <div className="mt-8 space-y-4 w-full">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8 border-primary/10 shadow-lg rounded-3xl">
            <CardHeader>
              <Skeleton className="h-7 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <Skeleton className="h-10 w-[150px] rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and profile
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-4 border-primary/10 shadow-lg shadow-primary-400/30 rounded-3xl overflow-hidden h-fit">
          <div className="h-24 bg-linear-to-r from-primary/20 to-primary/5" />
          <CardContent className="-mt-16 relative">
            <AvatarUpload
              currentImage={user.image}
              onUpdate={handleAvatarUpdate}
              name={user.name}
            />

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Account Status
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                  ACTIVE
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Joined Since
                </span>
                <span className="text-sm font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-8 space-y-8">
          <Card className="border-primary/10 shadow-lg shadow-primary-400/30 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your profile information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm
                user={user}
                token={userToken}
                onSuccess={handleProfileUpdate}
              />
            </CardContent>
          </Card>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
