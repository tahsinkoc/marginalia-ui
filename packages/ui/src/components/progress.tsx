"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const progressVariants = cva("relative h-3 w-full overflow-hidden rounded-full bg-surfaceAlt/80", {
  variants: {
    variant: {
      default: "bg-surfaceAlt/80",
      success: "bg-success/15",
      warning: "bg-warning/15",
      danger: "bg-danger/15"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

const progressIndicatorVariants = cva("h-full w-full flex-1 rounded-full transition-transform duration-300", {
  variants: {
    variant: {
      default: "bg-accent",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

export const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn(progressVariants({ variant }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ variant }))}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

