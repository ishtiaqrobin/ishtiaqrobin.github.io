import React, { useState, useEffect } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { statsService } from "@/services/stats.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const StatsSection = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const { data } = await statsService.getStats();
      if (data) {
        const mappedStats: StatItem[] = [
          {
            label: "Years Experience",
            value: data.experience || 0,
            suffix: "+",
          },
          {
            label: "Total Projects",
            value: data.projects || 0,
            suffix: "+",
          },
          {
            label: "Happy Clients",
            value: data.happyClients || 0,
            suffix: "+",
          },
          {
            label: "Success Rate",
            value: data.successRate || 0,
            suffix: "%",
          },
        ];
        setStats(mappedStats);
      }
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-transparent">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (stats.length === 0) return null;

  return (
    <section
      id="stats"
      ref={ref}
      className="py-20 relative overflow-hidden bg-white dark:bg-transparent"
    >
      {/* Seamless Top & Bottom Color Fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-[5]" />

      {/* Impact Glassmorphism Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-violet-600/10 to-primary-600/10 dark:from-primary-500/15 dark:via-violet-500/10 dark:to-primary-500/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary-500/10 dark:bg-primary-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-none hover:border-primary-500/30 transition-all duration-500 group"
            // initial={{ opacity: 0, y: 30 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-primary-300 via-violet-500 to-primary-400 dark:from-primary-400 dark:via-violet-400 dark:to-primary-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-700">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">{stat.label}</p>

              {/* Bottom accent Line */}
              <div className="mt-4 h-1 w-8 bg-primary-500/20 rounded-full mx-auto group-hover:w-16 group-hover:bg-primary-500/50 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;