import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group active:scale-95",
  {
    variants: {
      variant: {
        // shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]
        default:
          "bg-primary text-primary-foreground border border-white/10 backdrop-blur-sm",

        primary:
          "text-white bg-primary-500 hover:bg-primary-600 border border-white/10 backdrop-blur-sm",

        destructive:
          "bg-red-600/70 text-white hover:bg-red-500 shadow-lg backdrop-blur-sm",

        outline:
          "border-2 border-primary text-text-primary bg-white/5 hover:border-primary/75 dark:hover:border-primary/70 backdrop-blur-sm",

        secondary:
          "bg-primary-400 hover:bg-primary-500 text-gray-900 dark:text-white border border-white/5 backdrop-blur-sm",

        ghost:
          "text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-500/10 dark:hover:bg-white/10",

        link: "text-primary underline-offset-4 hover:underline",

        ai: "text-white bg-black hover:bg-primary-600 border border-white/10 backdrop-blur-sm",
      },

      size: {
        default: "h-10 px-6 py-3 text-sm rounded-lg",
        xs: "h-8 px-3 py-2 text-sm font-medium rounded-md",
        sm: "h-10 px-4 py-2 text-sm rounded-lg",
        md: "h-11 px-6 py-3 text-base rounded-lg",
        lg: "h-12 px-8 py-4 text-lg rounded-xl",
        icon: "h-10 w-10",
        ai: "h-8 w-8",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  download?: boolean | string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      icon: Icon,
      children,
      href,
      download,
      ...props
    },
    ref,
  ) => {
    const isExternal = href?.startsWith("http");

    const classes = cn(buttonVariants({ variant, size, className }));

    const content = (
      <>
        {/* Shine Effect */}
        {(variant === "default" || !variant) && (
          <div className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        )}

        {/* Loading Spinner */}
        {loading && (
          <svg className="h-5 w-5 animate-spin shrink-0" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />

            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}

        {/* Custom Icon Prop */}
        {!loading && Icon && (
          <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5" />
        )}

        {/* Children */}
        {children && (
          <span className="relative z-10 inline-flex items-center">
            {children}
          </span>
        )}
      </>
    );

    if (href) {
      const anchorProps =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      return (
        <a
          href={href}
          download={download}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={loading || props.disabled}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
