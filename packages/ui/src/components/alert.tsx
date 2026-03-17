import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const alertVariants = cva("relative grid gap-2 rounded-[28px] border p-5 shadow-field", {
  variants: {
    variant: {
      default: "border-border bg-surface text-text",
      success: "border-success/30 bg-success/10 text-text",
      warning: "border-warning/30 bg-warning/10 text-text",
      danger: "border-danger/30 bg-danger/10 text-text"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);

Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("font-medium tracking-elegant text-text", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm leading-relaxed text-textMuted", className)} {...props} />
));

AlertDescription.displayName = "AlertDescription";

