// "use client";

// import React from "react";
// // import { motion } from "framer-motion";
// import { motion } from "motion/react";

// import DynamicIcon from "@/components/common/DynamicIcon";
// import { ISkill } from "@/types";

// interface SkillBarProps {
//   skill: ISkill;
//   index?: number;
// }

// const SkillBar: React.FC<SkillBarProps> = ({ skill, index = 0 }) => {
//   const { name, icon, level } = skill;

//   // Determine badge styling based on level
//   let badgeClasses = "";
//   switch (level) {
//     case "EXPERT":
//       badgeClasses =
//         "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20";
//       break;
//     case "RECENTLY_LEARNED":
//       badgeClasses =
//         "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20";
//       break;
//     case "LEARNING":
//       badgeClasses =
//         "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20";
//       break;
//     case "INTERMEDIATE":
//       badgeClasses =
//         "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20";
//       break;
//     default:
//       badgeClasses =
//         "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20";
//   }

//   return (
//     <motion.div
//       className="group p-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10"
//       // initial={{ opacity: 0, y: 10 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.05, duration: 0.4 }}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {icon && (
//             <div
//               className={`text-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center w-8 h-8`}
//               style={{ color: icon.color }}
//             >
//               <DynamicIcon icon={icon} size={24} />
//             </div>
//           )}
//           <span className="font-medium text-sm text-gray-900 dark:text-white">
//             {name}
//           </span>
//         </div>
//         <span
//           className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md border ${badgeClasses}`}
//         >
//           {level}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// export default SkillBar;

"use client";

import React from "react";
import { motion } from "motion/react";

import DynamicIcon from "@/components/common/DynamicIcon";
import { ISkill } from "@/types";

interface SkillBarProps {
  skill: ISkill;
  index?: number;
}

// ─── Level display config ─────────────────────────────────────────────────────
const LEVEL_CONFIG: Record<string, { label: string; className: string }> = {
  EXPERT: {
    label: "Expert",
    className:
      "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20",
  },
  INTERMEDIATE: {
    label: "Intermediate",
    className:
      "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
  },
  LEARNING: {
    label: "Learning",
    className:
      "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20",
  },
  RECENTLY_LEARNED: {
    label: "Recently Learned",
    className:
      "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  },
};

const DEFAULT_LEVEL = {
  label: "Unknown",
  className:
    "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20",
};

// ─────────────────────────────────────────────────────────────────────────────

const SkillBar: React.FC<SkillBarProps> = ({ skill, index = 0 }) => {
  const { name, icon, level } = skill;
  const { label, className } = LEVEL_CONFIG[level] ?? DEFAULT_LEVEL;

  return (
    <motion.div
      className="group p-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className="text-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center w-8 h-8"
              style={{ color: icon.color }}
            >
              <DynamicIcon icon={icon} size={24} />
            </div>
          )}
          <span className="font-medium text-sm text-gray-900 dark:text-white">
            {name}
          </span>
        </div>

        <span
          className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md border ${className}`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
};

export default SkillBar;
