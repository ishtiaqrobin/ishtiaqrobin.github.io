"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import { IVideo } from "@/types";

interface VideoCardProps {
  item: IVideo;
  index: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/,
  );
  return match ? match[2] : null;
}

function getThumbnailUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);
    // maxresdefault with hqdefault fallback is handled via onError
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
  }
  return "";
}

function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : url;
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function VideoCard({ item, index }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const thumbnail = getThumbnailUrl(item.videoUrl);
  // Fallback to hqdefault if maxresdefault 404s
  const thumbSrc =
    thumbError && getYoutubeId(item.videoUrl)
      ? `https://img.youtube.com/vi/${getYoutubeId(item.videoUrl)}/hqdefault.jpg`
      : thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group"
    >
      {/* ── Video Container ───────────────────────────────────────── */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl shadow-primary/10 hover:shadow-primary/30 bg-black transition-shadow duration-500">
        {isPlaying ? (
          /* ── Player ─────────────────────────────────────────── */
          <iframe
            src={getEmbedUrl(item.videoUrl)}
            title={item.title || "Video"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* ── Thumbnail + Overlay ─────────────────────────────── */
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label="Play video"
          >
            {/* Thumbnail */}
            {thumbSrc ? (
              <Image
                src={thumbSrc}
                alt={item.title || "Video thumbnail"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                onError={() => setThumbError(true)}
                priority={index === 0}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-500 group-hover:from-black/70" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute h-24 w-24 rounded-full bg-primary/20 blur-md scale-0 group-hover:scale-100 transition-transform duration-500" />
                {/* Outer ring */}
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  {/* Inner circle */}
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:bg-primary/90 transition-colors duration-300">
                    <Play className="h-6 w-6 text-white fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info — slides up on hover */}
            {(item.title || item.description) && (
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-start">
                {item.title && (
                  <h3 className="text-white font-bold text-lg leading-tight drop-shadow">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-white/70 text-sm mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </button>
        )}
      </div>

      {/* ── Below card text (always visible) ─────────────────────── */}
      {/* {(item.title || item.description) && (
        <div className="mt-4 px-1 space-y-1">
          {item.title && (
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-0.5"
                aria-label="Open video in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      )} */}
    </motion.div>
  );
}
