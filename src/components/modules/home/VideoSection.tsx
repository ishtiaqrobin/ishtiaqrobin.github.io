// "use client";

// import { useEffect, useState } from "react";
// import { videoService } from "@/services/video.service";
// import { IVideo } from "@/types";
// import SectionTitle from "@/components/common/SectionTitle";
// import { Skeleton } from "@/components/ui/skeleton";

// import { VideoCard } from "./card/VideoCard";
// import { useInView } from "react-intersection-observer";

// export function VideoSection() {
//     const [videos, setVideos] = useState<IVideo[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const { ref, inView } = useInView({
//         threshold: 0.1,
//         triggerOnce: true,
//     });

//     useEffect(() => {
//         videoService.getVideos().then(({ data }) => {
//             if (data) {
//                 setVideos(data.filter(v => v.isPublished));
//             }
//             setIsLoading(false);
//         });
//     }, []);

//     if (!isLoading && videos.length === 0) return null;

//     return (
//         <section id="videos" ref={ref} className="py-24 relative overflow-hidden bg-transparent">
//             {/* Video Wave Background */}
//             <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]" style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20 50 10 T 100 10' stroke='%234f46e5' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
//                 backgroundSize: "160px 32px"
//             }} />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full -z-10" />

//             <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
//                 <SectionTitle
//                     subtitle="My Favorite Videos"
//                     title="Featured Videos"
//                     description="Watch my tutorials, project demos, and insights into my creative process"
//                 />

//                 {isLoading ? (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
//                         {[...Array(2)].map((_, i) => (
//                             <Skeleton key={i} className="aspect-video w-full rounded-3xl" />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className={`grid grid-cols-1 ${videos.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-12 mt-16`}>
//                         {videos.map((item, index) => (
//                             <VideoCard key={item.id} item={item} index={index} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import { videoService } from "@/services/video.service";
import { IVideo } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoCard } from "./card/VideoCard";

export function VideoSection() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    videoService.getVideos().then(({ data }) => {
      if (data) {
        // Only published, sorted by sortOrder asc
        const published = data
          .filter((v) => v.isPublished)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        setVideos(published);
      }
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && videos.length === 0) return null;

  const isSingle = videos.length === 1;

  return (
    <section
      id="videos"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* ── Decorative background ─────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20 50 10 T 100 10' stroke='%234f46e5' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="My Favorite Videos"
          title="Featured Videos"
          description="Watch my tutorials, project demos, and insights into my creative process"
        />

        {isLoading ? (
          /* ── Skeleton ─────────────────────────────────────────── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-3xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          /* ── Grid ─────────────────────────────────────────────── */
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 mt-16 gap-10 ${
              isSingle ? "max-w-3xl mx-auto" : "lg:grid-cols-2"
            }`}
          >
            {videos.map((item, index) => (
              <VideoCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
