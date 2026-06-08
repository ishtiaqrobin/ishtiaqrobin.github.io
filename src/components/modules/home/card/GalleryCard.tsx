"use client";

// import { motion } from "framer-motion";
import { motion } from "motion/react";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { IGallery } from "@/types";

interface GalleryCardProps {
    item: IGallery;
    index: number;
}

export function GalleryCard({ item, index }: GalleryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Card className="group relative aspect-3/4 rounded-3xl overflow-hidden border-none shadow-lg hover:shadow-2xl shadow-primary-400/30 hover:shadow-primary-400/50 transition-all duration-500">
                <Image
                    src={item.image}
                    alt={item.title || "Gallery Image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glassy Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-[1.5px]">
                    <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-8 bg-primary rounded-full" />
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Visual Work</span>
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-2 leading-tight">
                            {item.title || "Untitled Artwork"}
                        </h3>
                        {item.description && (
                            <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed font-medium">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subtle border on hover */}
                <div className="absolute border-none transition-all duration-500 rounded-3xl pointer-events-none" />
            </Card>
        </motion.div>
    );
}
