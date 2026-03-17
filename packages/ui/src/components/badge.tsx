import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--marginalia-radius-pill)] border px-[var(--marginalia-space-badge-x)] py-[var(--marginalia-space-badge-y)] text-[length:var(--marginalia-size-text-xs)] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        neutral: "border-border bg-surface text-text",
        accent: "border-transparent bg-accentSoft text-accent",
        outline: "border-border bg-transparent text-text",
        success: "border-transparent bg-success/15 text-success",
        warning: "border-transparent bg-warning/15 text-warning",
        danger: "border-transparent bg-danger/15 text-danger"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = "Badge";

