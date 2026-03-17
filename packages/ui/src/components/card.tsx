import * as React from "react";

import { cn } from "../lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[var(--ulib-radius-panel)] border bg-surface/95 p-[var(--ulib-space-panel)] shadow-panel backdrop-blur-[2px]",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-[var(--ulib-space-panel-compact)] grid gap-2", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-serif text-[length:var(--ulib-size-text-title)] leading-tight tracking-[-0.02em] text-text", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[length:var(--ulib-size-text-sm)] leading-relaxed text-textMuted", className)} {...props} />
  )
);

CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-[var(--ulib-space-stack)]", className)} {...props} />
));

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-[var(--ulib-space-panel)] flex flex-wrap items-center gap-[var(--ulib-space-inline)]", className)} {...props} />
));

CardFooter.displayName = "CardFooter";
