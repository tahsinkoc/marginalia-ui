import * as React from "react";

import { cn } from "../lib/cn";

export const EmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid justify-items-center gap-4 rounded-[32px] border bg-surface/95 px-6 py-10 text-center shadow-panel",
      className
    )}
    {...props}
  />
));

EmptyState.displayName = "EmptyState";

export const EmptyStateIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-16 w-16 items-center justify-center rounded-[22px] border bg-accentSoft/70 text-accent shadow-field",
      className
    )}
    {...props}
  />
));

EmptyStateIcon.displayName = "EmptyStateIcon";

export const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-serif text-[1.9rem] leading-tight tracking-[-0.03em] text-text", className)}
    {...props}
  />
));

EmptyStateTitle.displayName = "EmptyStateTitle";

export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("max-w-lg text-sm leading-relaxed text-textMuted", className)}
    {...props}
  />
));

EmptyStateDescription.displayName = "EmptyStateDescription";

export const EmptyStateFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-3", className)} {...props} />
));

EmptyStateFooter.displayName = "EmptyStateFooter";

