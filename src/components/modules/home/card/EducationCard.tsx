"use client";

// import { motion } from "framer-motion";
import { motion } from "motion/react";

import {
  IconSchool,
  IconCalendar,
  IconBuildingBank,
  IconBook,
  IconCertificate,
} from "@tabler/icons-react";
import { IEducation } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface EducationCardProps {
  item: IEducation;
  index: number;
}

export function EducationCard({ item, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full relative overflow-hidden group bg-accent rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500 p-0">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <IconSchool
            className="text-primary group-hover:text-primary group-hover:scale-110 transition-all duration-500"
            size={100}
          />
        </div>

        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <IconCalendar className="h-4 w-4" />
                {new Date(item.startDate).getFullYear()} -{" "}
                {item.endDate
                  ? new Date(item.endDate).getFullYear()
                  : "Present"}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-500">
                  {item.degree}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <IconBuildingBank className="h-4 w-4" />
                  {item.institution}
                </div>
              </div>
            </div>

            {(item.group || item.board) && (
              <div className="space-y-4">
                <div className="h-px w-full bg-border/50" />
                <div className="flex flex-col gap-2">
                  {item.group && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <IconBook className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">
                        Group: {item.group}
                      </span>
                    </div>
                  )}
                  {item.board && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <IconCertificate className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">
                        Board: {item.board}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.result && (
              <div className="flex gap-4 pt-2">
                <div className="text-sm">
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-1">
                    Result
                  </span>
                  <span className="font-semibold text-primary">
                    {item.result}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
