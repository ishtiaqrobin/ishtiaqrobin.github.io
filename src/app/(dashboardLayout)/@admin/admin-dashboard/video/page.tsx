// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { VideoManager } from "@/components/modules/dashboard/admin/video/VideoManager";
// import { videoService } from "@/services/video.service";
// import { useAuth } from "@/hooks/useAuth";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";
// import { IVideo } from "@/types";

// export default function AdminVideoPage() {
//   const { session, isLoading: authLoading } = useAuth();
//   const [videos, setVideos] = useState<IVideo[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const userToken = session?.token || "";

//   const fetchVideos = useCallback(async () => {
//     setIsLoading(true);
//     const { data, error } = await videoService.getVideos();

//     if (error) {
//       toast.error("Failed to load video content", { description: error.message });
//       setVideos([]);
//     } else {
//       setVideos(data || []);
//     }
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     if (!authLoading) {
//       Promise.resolve().then(() => fetchVideos());
//     }
//   }, [authLoading, fetchVideos]);

//   return (
//     <div className="space-y-6 min-h-screen pb-20">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Video Management</h1>
//         <p className="text-muted-foreground mt-2">
//           Manage featured videos, tutorials, or case study embeddings
//         </p>
//       </div>

//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="space-y-4">
//               <Skeleton className="aspect-video w-full rounded-2xl" />
//               <Skeleton className="h-4 w-3/4" />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <VideoManager
//           videos={videos}
//           token={userToken}
//           onRefresh={fetchVideos}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import { VideoManager } from "@/components/modules/dashboard/admin/video/VideoManager";
import { videoService } from "@/services/video.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { IVideo } from "@/types";

export default function AdminVideoPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await videoService.getVideos();

    if (error) {
      toast.error("Failed to load videos", { description: error.message });
      setVideos([]);
    } else {
      // Admin sees all videos sorted by sortOrder
      const sorted = (data || []).sort((a, b) => a.sortOrder - b.sortOrder);
      setVideos(sorted);
    }
    setIsLoading(false);
  }, []);

  // ✅ এখন — clean
  useEffect(() => {
    if (authLoading) return;
    const load = async () => {
      await fetchVideos();
    };
    load();
  }, [authLoading, fetchVideos]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage featured videos, tutorials, or case study embeddings
        </p>
      </div>

      <VideoManager
        videos={videos}
        token={userToken}
        onRefresh={fetchVideos}
        isLoading={isLoading || authLoading}
      />
    </div>
  );
}
