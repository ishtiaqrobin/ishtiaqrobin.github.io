// "use client";

// // import { motion } from "framer-motion";
// import { motion } from "motion/react";

// import {
//     IconBriefcase,
//     IconCalendar,
//     IconMapPin,
//     IconBuildingBank
// } from "@tabler/icons-react";
// import { IExperience } from "@/types";
// import { Card, CardContent } from "@/components/ui/card";

// interface ExperienceCardProps {
//     item: IExperience;
//     index: number;
// }

// export function ExperienceCard({ item, index }: ExperienceCardProps) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1, duration: 0.5 }}
//             viewport={{ once: true }}
//             className="relative flex flex-col sm:flex-row gap-8 group"
//         >
//             {/* Timeline Marker */}
//             <div className="absolute left-6 -translate-x-1/2 top-0 hidden sm:flex h-12 w-12 rounded-full bg-background border-2 border-primary items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
//                 <IconBriefcase className="h-5 w-5 text-primary" />
//             </div>

//             {/* Card Content */}
//             <div className="sm:ml-20 flex-1">
//                 <Card className="p-0 overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/20 hover:shadow-primary-400/40 transition-all duration-500 ">
//                     <div className="absolute top-20 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none duration-500">
//                         <IconBuildingBank size={100} className="text-primary" />
//                     </div>

//                     <CardContent className="p-8">
//                         <div className="flex flex-col gap-6">
//                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                                 <div className="space-y-3">
//                                     <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
//                                         {item.title}
//                                     </h3>
//                                     <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
//                                         <IconBuildingBank className="h-4 w-4" />
//                                         {item.company}
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
//                                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
//                                         <IconCalendar className="h-4 w-4" />
//                                         {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
//                                         {item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
//                                     </div>
//                                     {item.location && (
//                                         <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
//                                             <IconMapPin className="h-3.5 w-3.5" />
//                                             {item.location}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
//                                 <div className="prose prose-sm dark:prose-invert max-w-none">
//                                     <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
//                                         {item.description}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </motion.div>
//     );
// }

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  IconBriefcase,
  IconCalendar,
  IconMapPin,
  IconBuildingBank,
  IconExternalLink,
} from "@tabler/icons-react";
import { IExperience } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceCardProps {
  item: IExperience;
  index: number;
}

export function ExperienceCard({ item, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative flex flex-col sm:flex-row gap-8 group"
    >
      {/* Timeline Marker */}
      <div className="absolute left-6 -translate-x-1/2 top-0 hidden sm:flex h-12 w-12 rounded-full bg-background border-2 border-primary items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden">
        {item.companyLogo ? (
          <Image
            src={item.companyLogo}
            alt={item.company}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        ) : (
          <IconBriefcase className="h-5 w-5 text-primary" />
        )}
      </div>

      {/* Card Content */}
      <div className="sm:ml-20 flex-1">
        <Card className="p-0 overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/20 hover:shadow-primary-400/40 transition-all duration-500">
          <div className="absolute top-20 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none duration-500">
            <IconBuildingBank size={100} className="text-primary" />
          </div>

          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                    <IconBuildingBank className="h-4 w-4 shrink-0" />
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary inline-flex items-center gap-1.5 transition-colors duration-300"
                      >
                        {item.company}
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      item.company
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                    <IconCalendar className="h-4 w-4" />
                    {new Date(item.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    –{" "}
                    {item.endDate
                      ? new Date(item.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                      <IconMapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
