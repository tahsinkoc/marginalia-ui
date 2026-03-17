import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--ulib-radius-pill)] border border-transparent font-medium tracking-elegant transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-accent text-surface shadow-panel hover:bg-accent/92",
        secondary: "bg-surfaceAlt text-text shadow-field hover:bg-accentSoft/90",
        outline: "border-border bg-surface text-text shadow-field hover:bg-surfaceAlt/90",
        ghost: "bg-transparent text-text hover:bg-accentSoft/75",
        link: "bg-transparent text-accent shadow-none hover:text-accent/80"
      },
      size: {
        sm: "h-[var(--ulib-size-control-sm)] px-[var(--ulib-space-control-x-sm)] text-[length:var(--ulib-size-text-sm)]",
        md: "h-[var(--ulib-size-control-md)] px-[var(--ulib-space-control-x-md)] text-[length:var(--ulib-size-text-sm)]",
        lg: "h-[var(--ulib-size-control-lg)] px-[var(--ulib-space-control-x-lg)] text-[length:var(--ulib-size-text-body)]"
      }
    },
    compoundVariants: [
      {
        variant: "link",
        size: "sm",
        className: "h-auto px-0 py-0"
      },
      {
        variant: "link",
        size: "md",
        className: "h-auto px-0 py-0"
      },
      {
        variant: "link",
        size: "lg",
        className: "h-auto px-0 py-0"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      <span>{children}</span>
    </button>
  )
);

Button.displayName = "Button";
