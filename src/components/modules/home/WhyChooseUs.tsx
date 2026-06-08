"use client";

import { ShieldCheck, Clock, CreditCard, Laptop } from "lucide-react";
import Image from "next/image";
import { adminService } from "@/services/admin.service";
import { PublicStats } from "@/types/admin.type";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Verified Tutors",
    description: "Every tutor on our platform undergoes a multi-step verification process to ensure quality education.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Learn on your own terms. Book sessions that fit your busy schedule, anytime, anywhere.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: "Affordable Pricing",
    description: "Get access to top-tier educators without breaking the bank. Competitive rates for all subjects.",
    icon: <CreditCard className="h-6 w-6 text-primary" />,
  },
  {
    title: "Modern Learning Tools",
    description: "Our interactive platform makes online learning feel natural, engaging, and highly effective.",
    icon: <Laptop className="h-6 w-6 text-primary" />,
  },
];

export function WhyChooseUs() {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminService.getPublicStats();
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats for WhyChooseUs:", err);
      }
    };

    fetchStats();
  }, []);

  // Fallback images if database has no student images
  const displayImages = stats?.studentImages && stats.studentImages.length > 0
    ? stats.studentImages.slice(0, 4)
    : [1, 2, 3, 4].map(i => `https://i.pravatar.cc/100?img=${i + 10}`);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Why Choose Our Platform for Your <span className="text-primary">Learning Journey?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are committed to providing the best tutoring experience. Our platform connects you with experts who are passionate about teaching.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-300">
                  <div className="mt-1">{feature.icon}</div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Students learning"
                className="w-full h-auto object-cover"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="flex items-center gap-4">

                  <div className="flex -space-x-3">
                    {displayImages.map((img, i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-muted flex items-center justify-center overflow-hidden">
                        <Image
                          src={img}
                          alt={`Student ${i + 1}`}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-bold">
                      {stats ? `${stats.totalStudents.toLocaleString()}+` : "1,000+"} New Students
                    </p>
                    <p className="text-xs opacity-80">Joined our community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
