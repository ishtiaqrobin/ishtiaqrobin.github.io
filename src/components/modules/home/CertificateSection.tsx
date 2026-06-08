"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/common/SectionTitle";
import { CertificateCard } from "./card/CertificateCard";
import { certificateService } from "@/services/certificate.service";
import type { ICategory } from "@/types/certificate.type";

export function CertificateSection() {
  const [certificates, setCertificates] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data } = await certificateService.getCertificates(true);
      if (data) setCertificates(data);
      setIsLoading(false);
    };

    fetchCertificates();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/8 rounded-full blur-[140px] -z-10" />
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Certifications"
            title="Professional Credentials"
            description="Industry-recognized certifications validating expertise"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-14">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/8 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Certifications"
          title="Professional Credentials"
          description="Industry-recognized certifications and credentials that validate expertise and continuous learning"
        />

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            <span>
              <span className="font-semibold text-foreground">
                {certificates.length}
              </span>{" "}
              {certificates.length === 1 ? "Certificate" : "Certificates"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>
              <span className="font-semibold text-foreground">
                {
                  certificates.filter(
                    (c) => !c.expiryDate || new Date(c.expiryDate) > new Date(),
                  ).length
                }
              </span>{" "}
              Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>
              {[...new Set(certificates.map((c) => c.issuer))].length} Issuers
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} certificate={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
