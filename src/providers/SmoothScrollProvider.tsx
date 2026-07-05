// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function SmoothScrollProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: "vertical",
//       gestureOrientation: "vertical",
//       smoothWheel: true,
//     });

//     lenis.on("scroll", ScrollTrigger.update);

//     const ticker = (time: number) => {
//       lenis.raf(time * 1000);
//     };

//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);

//     return () => {
//       lenis.destroy();
//       gsap.ticker.remove(ticker); // ✅ সঠিকভাবে ticker remove
//     };
//   }, []);

//   return <>{children}</>;
// }

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // ─── Lenis Init (একবারই রান হবে, mount/unmount এ) ───
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(ticker); // ✅ সঠিকভাবে ticker remove
    };
  }, []);

  // ─── Route Change হলে Lenis-কে সাথে সাথে (animation ছাড়া) top-এ reset করা ───
  // এটা না করলে Next.js নেটিভ scroll কে top এ নিয়ে যায়, কিন্তু Lenis এর
  // internal scroll state আগের (bottom) position এ থেকে যায় এবং পরে
  // সেটা "correct" করতে গিয়ে bottom → top animate হয়ে দেখায়।
  useEffect(() => {
    lenisRef.current?.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }, [pathname]);

  return <>{children}</>;
}
