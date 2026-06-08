// "use client";

// // import { motion } from "framer-motion";
// import { motion } from "motion/react";

// import { IService } from "@/types";
// import { Card, CardContent } from "@/components/ui/card";
// import DynamicIcon from "@/components/common/DynamicIcon";
// import { Zap } from "lucide-react";

// interface ServiceCardProps {
//     service: IService;
//     index: number;
// }

// export function ServiceCard({ service, index }: ServiceCardProps) {
//     const { name, description, icon } = service;

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1, duration: 0.5 }}
//         >
//             <Card className="p-6 md:p-8 h-full group shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500 cursor-default gap-2">
//                 <div className="mb-3 inline-flex rounded-2xl transition-all duration-500 w-fit">
//                     <div
//                         className="text-3xl group-hover:text-primary-400 transition-all group-hover:scale-105 transform duration-500"
//                         style={{
//                             color: icon?.color || "var(--primary)"
//                         }}>
//                         {icon ? (
//                             <DynamicIcon icon={icon} size={64} />
//                         ) : (
//                             <Zap size={64} />
//                         )}
//                     </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary-400 transition-colors">
//                     {name}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
//                     {description}
//                 </p>
//             </Card>
//         </motion.div>
//     );
// }

"use client";

import { motion } from "motion/react";
import { IService } from "@/types";
import DynamicIcon from "@/components/common/DynamicIcon";
import { Zap } from "lucide-react";

interface ServiceCardProps {
  service: IService;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { name, description, icon } = service;

  const iconColor = icon?.color || "var(--primary)";
  const iconBgColor = icon?.bgColor || "rgba(99,102,241,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div
        className="
          group relative h-full flex flex-col gap-5 p-6 md:p-8
          rounded-3xl border border-gray-200/80 dark:border-white/10
          bg-white dark:bg-white/[0.03]
          hover:border-gray-300 dark:hover:border-white/20
          shadow-sm hover:shadow-xl
          transition-all duration-500 cursor-default overflow-hidden
        "
      >
        {/* Subtle glow on hover — follows icon color */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${iconColor}18 0%, transparent 70%)`,
          }}
        />

        {/* Icon container */}
        <div
          className="
            relative z-10 w-14 h-14 rounded-2xl
            flex items-center justify-center shrink-0
            transition-transform duration-500 group-hover:scale-110
          "
          style={{ backgroundColor: iconBgColor }}
        >
          <div style={{ color: iconColor }}>
            {icon ? <DynamicIcon icon={icon} size={28} /> : <Zap size={28} />}
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-col gap-2 flex-1">
          <h3
            className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300"
            style={{ color: undefined }}
          >
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: iconColor }}
        />
      </div>
    </motion.div>
  );
}
