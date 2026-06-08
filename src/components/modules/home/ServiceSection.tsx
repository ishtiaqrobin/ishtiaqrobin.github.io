// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { portfolioService } from "@/services/service.service";
// import { IService } from "@/types";
// import SectionTitle from "@/components/common/SectionTitle";
// import { Skeleton } from "@/components/ui/skeleton";

// import { ServiceCard } from "./card/ServiceCard";
// import { useInView } from "react-intersection-observer";

// export function ServiceSection() {
//     const [services, setServices] = useState<IService[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const { ref, inView } = useInView({
//         threshold: 0.1,
//         triggerOnce: true,
//     });

//     useEffect(() => {
//         portfolioService.getServices().then(({ data }) => {
//             if (data) {
//                 setServices(data.filter(s => s.isPublish));
//             }
//             setIsLoading(false);
//         });
//     }, []);

//     if (!isLoading && services.length === 0) return null;

//     return (
//         <section
//             id="services"
//             ref={ref}
//             className="py-24 relative bg-gray-50/50 dark:bg-transparent overflow-hidden"
//         >
//             {/* Seamless Top & Bottom Color Fade */}
//             <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" />
//             <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" />

//             {/* Micro-dot abstract background */}
//             <div className="absolute inset-0 z-0 pointer-events-none" style={{
//                 maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
//                 WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
//             }}>
//                 <div className="absolute inset-0 opacity-40 dark:opacity-30 flex justify-center items-center">
//                     <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
//                 </div>
//                 <div className="absolute inset-0 dark:opacity-30 opacity-40" style={{
//                     backgroundImage: "radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.6) 1px, transparent 0)",
//                     backgroundSize: "32px 32px",
//                     maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
//                     WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
//                 }} />
//             </div>

//             <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                 <SectionTitle
//                     subtitle="What I Do"
//                     title="My Services"
//                     description="Creative and technical solutions tailored to your unique project needs"
//                 />

//                 {isLoading ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//                         {[...Array(4)].map((_, i) => (
//                             <Skeleton key={i} className="h-64 w-full rounded-3xl" />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//                         {services.map((item, index) => (
//                             <ServiceCard key={item.id} service={item} index={index} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { portfolioService } from "@/services/service.service";
import { IService } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCard } from "./card/ServiceCard";
import { useInView } from "react-intersection-observer";

export function ServiceSection() {
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    portfolioService.getServices().then(({ data }) => {
      if (data) {
        // ✅ Fixed: isPublished (not isPublish)
        setServices(data.filter((s) => s.isPublished));
      }
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && services.length === 0) return null;

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 relative bg-gray-50/50 dark:bg-transparent overflow-hidden"
    >
      {/* Seamless Top & Bottom Color Fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-5" />

      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="absolute inset-0 opacity-40 dark:opacity-30 flex justify-center items-center">
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
        </div>
        <div
          className="absolute inset-0 dark:opacity-30 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="What I Do"
          title="My Services"
          description="Creative and technical solutions tailored to your unique project needs"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((item, index) => (
              <ServiceCard key={item.id} service={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
