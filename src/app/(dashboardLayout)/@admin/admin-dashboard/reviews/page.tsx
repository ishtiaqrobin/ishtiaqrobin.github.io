"use client";

import { useEffect, useState, useCallback } from "react";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { IReview } from "@/types";
import { AdminReviewManager } from "@/components/modules/dashboard/admin/review/AdminReviewManager";

export default function AdminReviewsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchReviews = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);
    const { data, error } = await reviewService.getAllReviewsAdmin(userToken);
    if (error) {
      toast.error("Failed to load reviews", { description: error.message });
      setReviews([]);
    } else {
      setReviews(data || []);
    }
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (authLoading) return;
    const load = async () => {
      await fetchReviews();
    };
    load();
  }, [authLoading, fetchReviews]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Testimonials</h1>
        <p className="text-muted-foreground mt-2">
          Manage and review feedback from your clients and platform users
        </p>
      </div>

      <AdminReviewManager
        reviews={reviews}
        token={userToken}
        onRefresh={fetchReviews}
        isLoading={isLoading || authLoading}
      />
    </div>
  );
}
