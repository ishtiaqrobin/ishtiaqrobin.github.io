"use client";

import { motion } from "motion/react";
import { ExternalLink, Award, CalendarDays, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ICategory } from "@/types/certificate.type";
import Image from "next/image";
import Link from "next/link";

interface CertificateCardProps {
  certificate: ICategory;
  index?: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function isExpired(expiryDate?: string) {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

export function CertificateCard({
  certificate,
  index = 0,
}: CertificateCardProps) {
  const expired = isExpired(certificate.expiryDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden
                 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
                 transition-all duration-500"
    >
      {/* Certificate image / placeholder */}
      <div className="relative h-44 overflow-hidden bg-muted/40">
        {certificate.imageUrl ? (
          <Image
            src={certificate.imageUrl}
            width={300}
            height={300}
            alt={certificate.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Award className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}

        {/* Expiry badge */}
        {certificate.expiryDate && (
          <div className="absolute top-3 right-3">
            <Badge
              variant={expired ? "destructive" : "secondary"}
              className="text-[10px] font-semibold backdrop-blur-sm"
            >
              {expired
                ? "Expired"
                : `Exp. ${formatDate(certificate.expiryDate)}`}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Issuer */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
          {certificate.issuer}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {certificate.title}
        </h3>

        {/* Issued date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>Issued {formatDate(certificate.issuedDate)}</span>
        </div>

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono truncate">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-green-500" />
            <span className="truncate">{certificate.credentialId}</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Verify link */}
        {certificate.credentialUrl && (
          <Link
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border w-full rounded-lg px-2 py-1 bg-accent/20 hover:bg-accent/30 transition-colors duration-300"
          >
            {/* <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> */}
            Verify Credential
            <ExternalLink className="ml-1.5 h-3 w-3 opacity-70 group-hover/btn:translate-x-0.5 transition-transform text-primary" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
