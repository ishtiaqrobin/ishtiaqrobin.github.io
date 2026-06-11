import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function CircularButton() {
  // "LETS TALK • " repeated 3 times to perfectly align text within SVG
  const text = "LETS TALK • LETS TALK • LETS TALK • ";

  return (
    <div className="relative bg-white dark:bg-[#111116] rounded-full w-36 h-36 flex items-center justify-center group select-none shadow-sm">
      {/* 
        ─── Rotating text layer ───
        'animate-spin-slow' will cause it to spin continuously
        'group-hover:animation-duration-[6s]' will make the rotation speed twice as fast when the mouse hovers.
      */}
      <div className="absolute p-1.5 inset-0 animate-spin-slow group-hover:animation-duration-[6s] transition-all ease-in-out">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            {/* Center of the circle is 50,50 (radius) 37 */}
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          {/* Text will be aligned with the path */}
          <text className="text-[8.5px] text-secondary font-normal tracking-[2.5px] fill-zinc-800 dark:fill-zinc-200 uppercase">
            <textPath href="#circlePath" startOffset="0%" className="">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* 
        ─── Middle layer ───
        User will see this layer when they hover over the button
      */}
      <Link
        href="/contact"
        className="relative flex items-center justify-center p-7 bg-white dark:bg-[#111116] border border-zinc-300 dark:border-zinc-800 rounded-full shadow- transition-all duration-300  group-hover:border-zinc-400/80 dark:group-hover:border-zinc-600"
        // title="Let's Talk"
      >
        {/* Curved arrow icon like the image (slight rotation when hovered) */}
        <FiArrowUpRight className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-300 transition-transform duration-300 group-hover:rotate-45 " />
      </Link>
    </div>
  );
}
