"use client";

import { useEffect, useState } from "react";
import { galleryService } from "@/services/gallery.service";
import { IGallery } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { GalleryCard } from "./card/GalleryCard";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

export function GallerySection() {
  const [images, setImages] = useState<IGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await galleryService.getGalleries();
      if (cancelled) return;
      if (data) {
        // ✅ Fixed: isPublished (not isPublish)
        setImages(data.filter((item) => item.isPublished));
      }
      setIsLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isLoading && images.length === 0) return null;

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.15] opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10v10M10 10h10M90 10v10M90 10h-10M10 90v-10M10 90h10M90 90v-10M90 90h-10' stroke='%234f46e5' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="My Personal Gallery"
          title="Personal Gallery"
          description="A showcase of my recent creative works and personal explorations"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-4/3 w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {images.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
