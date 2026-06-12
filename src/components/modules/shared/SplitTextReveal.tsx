// "use client";

// import React from "react";
// import { motion, Variants } from "framer-motion";

// interface SplitTextRevealProps {
//   children: React.ReactNode;
//   className?: string;
//   staggerDelay?: number;
//   duration?: number;
// }

// interface LineBreak {
//   type: "br";
//   className?: string;
// }

// type LineSegment = string | LineBreak;
// type Lines = LineSegment[][];

// function flattenToLines(node: React.ReactNode): Lines {
//   const lines: Lines = [[]];

//   function traverse(n: React.ReactNode) {
//     if (typeof n === "string") {
//       lines[lines.length - 1].push(n);
//     } else if (React.isValidElement(n)) {
//       if (n.type === "br") {
//         const brClassName = (n.props as { className?: string }).className;
//         // br এর className সহ নতুন line শুরু করো
//         // current line এ br info রাখো যাতে এই br এর class apply হয়
//         lines[lines.length - 1].push({ type: "br", className: brClassName });
//         lines.push([]);
//       } else {
//         lines[lines.length - 1].push(n as unknown as string);
//       }
//     } else if (Array.isArray(n)) {
//       n.forEach(traverse);
//     }
//   }

//   traverse(node);
//   return lines;
// }

// function AnimatedWords({
//   text,
//   charVariants,
// }: {
//   text: string;
//   charVariants: Variants;
// }) {
//   const words = text.split(" ").filter(Boolean);
//   return (
//     <>
//       {words.map((word, wordIdx) => (
//         <span
//           key={wordIdx}
//           className="inline-flex mr-[0.27em]"
//           aria-hidden="true"
//         >
//           {word.split("").map((char, charIdx) => (
//             <span
//               key={charIdx}
//               className="inline-block overflow-hidden leading-[1.15]"
//             >
//               <motion.span variants={charVariants} className="inline-block">
//                 {char}
//               </motion.span>
//             </span>
//           ))}
//         </span>
//       ))}
//     </>
//   );
// }

// export default function SplitTextReveal({
//   children,
//   className,
//   staggerDelay = 0.03,
//   duration = 0.55,
// }: SplitTextRevealProps) {
//   const containerVariants: Variants = {
//     hidden: { opacity: 1 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: staggerDelay,
//         delayChildren: 0.05,
//       },
//     },
//   };

//   const charVariants: Variants = {
//     hidden: { y: "105%", opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration,
//         ease: [0.25, 1, 0.5, 1],
//       },
//     },
//   };

//   const lines = flattenToLines(children);

//   return (
//     <motion.h2
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-80px" }}
//       className={`flex flex-col text-4xl lg:text-5xl leading-12 text-secondary font-clash font-medium tracking-tight ${className ?? ""}`}
//     >
//       {lines.map((lineSegments, lineIdx) => {
//         // এই line এর br info বের করো (শেষ segment এ থাকে)
//         const lastSegment = lineSegments[lineSegments.length - 1];
//         const brInfo =
//           lastSegment &&
//           typeof lastSegment === "object" &&
//           "type" in lastSegment &&
//           lastSegment.type === "br"
//             ? lastSegment
//             : null;

//         // br segment বাদ দিয়ে actual text segments
//         const textSegments = brInfo ? lineSegments.slice(0, -1) : lineSegments;

//         // br এর className থেকে display class বের করো
//         // default: block (সবসময় break)
//         // br className="block sm:hidden" → এই line টা sm+ এ hidden হবে
//         const brClass = brInfo?.className ?? "block";

//         return (
//           <span
//             key={lineIdx}
//             className={`flex flex-wrap ${
//               // শেষ line এর জন্য br নেই, সবসময় block
//               brInfo ? brClass : "block"
//             }`}
//           >
//             {textSegments.map((seg, segIdx) =>
//               typeof seg === "string" ? (
//                 <AnimatedWords
//                   key={segIdx}
//                   text={seg}
//                   charVariants={charVariants}
//                 />
//               ) : null,
//             )}
//           </span>
//         );
//       })}

//       <span className="sr-only">{children}</span>
//     </motion.h2>
//   );
// }

// New version for smooth reveal
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

interface LineBreak {
  type: "br";
  className?: string;
}

type LineSegment = string | LineBreak;
type Lines = LineSegment[][];

function flattenToLines(node: React.ReactNode): Lines {
  const lines: Lines = [[]];

  function traverse(n: React.ReactNode) {
    if (typeof n === "string") {
      lines[lines.length - 1].push(n);
    } else if (React.isValidElement(n)) {
      if (n.type === "br") {
        const brClassName = (n.props as { className?: string }).className;
        lines[lines.length - 1].push({ type: "br", className: brClassName });
        lines.push([]);
      } else {
        lines[lines.length - 1].push(n as unknown as string);
      }
    } else if (Array.isArray(n)) {
      n.forEach(traverse);
    }
  }

  traverse(node);
  return lines;
}

function AnimatedWords({
  text,
  charVariants,
}: {
  text: string;
  charVariants: Variants;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-flex mr-[0.22em] sm:mr-[0.27em]"
          aria-hidden="true"
        >
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="inline-block overflow-hidden leading-[1.15]"
            >
              <motion.span variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function SplitTextReveal({
  children,
  className,
  staggerDelay = 0.025,
  duration = 0.55,
}: SplitTextRevealProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const lines = flattenToLines(children);

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ willChange: "opacity" }}
      className={`flex flex-col text-4xl lg:text-5xl leading-[1.15] lg:leading-[1.1] text-secondary font-clash font-medium tracking-tight ${className ?? ""}`}
    >
      {lines.map((lineSegments, lineIdx) => {
        const lastSegment = lineSegments[lineSegments.length - 1];
        const brInfo =
          lastSegment &&
          typeof lastSegment === "object" &&
          "type" in lastSegment &&
          lastSegment.type === "br"
            ? lastSegment
            : null;

        const textSegments = brInfo ? lineSegments.slice(0, -1) : lineSegments;
        const brClass = brInfo?.className ?? "block";

        return (
          <span
            key={lineIdx}
            className={`flex flex-wrap ${brInfo ? brClass : "block"}`}
          >
            {textSegments.map((seg, segIdx) =>
              typeof seg === "string" ? (
                <AnimatedWords
                  key={segIdx}
                  text={seg}
                  charVariants={charVariants}
                />
              ) : null,
            )}
          </span>
        );
      })}

      <span className="sr-only">{children}</span>
    </motion.h2>
  );
}
