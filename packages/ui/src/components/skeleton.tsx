import * as React from "react";

import { cn } from "../lib/cn";

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "rounded-[20px] bg-[linear-gradient(110deg,rgba(239,231,218,0.85),rgba(255,250,243,0.96),rgba(239,231,218,0.85))] bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

