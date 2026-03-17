"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 10, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs origin-[var(--radix-tooltip-content-transform-origin)] rounded-2xl border bg-surfaceAlt px-3 py-2 text-xs leading-relaxed text-text shadow-panel will-change-[transform,opacity] data-[state=closed]:animate-float-out data-[state=delayed-open]:animate-float-in data-[state=instant-open]:animate-float-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=delayed-open]:animate-none motion-reduce:data-[state=instant-open]:animate-none",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-surfaceAlt" height={8} width={16} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = "TooltipContent";
