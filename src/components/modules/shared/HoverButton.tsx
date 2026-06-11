import React from "react";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string; // Pass the text as a prop string
}

export default function HoverButton({
  children,
  className,
  ...props
}: HoverButtonProps) {
  return (
    <button
      {...props}
      className={`group relative px-8 py-3 font-medium cursor-pointer rounded-full overflow-hidden border border-secondary bg-white/60 dark:bg-zinc-900/60 transition-colors duration-500 z-10 ${className}`}
    >
      {/* 
        ─── LIQUID WAVE FILL EFFECT ───
        A black background wave that curves from the bottom up.
      */}
      <span className="absolute inset-0 w-full h-full bg-secondary rounded-[50%] translate-y-[110%] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none z-0" />

      {/* 
        ─── TEXT REVEAL & COLOR BLEND CONTAINER ───
        Here, the marking has been done with overflow-hidden according to the height of the text.
      */}
      <span className="relative z-10 block h-5 overflow-hidden pointer-events-none">
        {/* 1st text (default black): It will rise and disappear when hovered */}
        <span className="block text-sm text-secondary transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>

        {/* 
          2nd text (white/black in dark mode): It will initially be hidden at the bottom. It will also rise at the same speed (duration-500) as the black background wave rises.
        */}
        <span className="absolute top-0 left-0 block w-full text-sm text-secondary-foreground transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </button>
  );
}
