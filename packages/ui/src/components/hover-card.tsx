"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "../lib/cn";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 12, children, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-[min(24rem,calc(100vw-2rem))] origin-[var(--radix-hover-card-content-transform-origin)] rounded-[30px] border bg-surface/95 p-4 text-text shadow-panel outline-none will-change-[transform,opacity] data-[state=closed]:animate-float-out data-[state=open]:animate-float-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
        className
      )}
      {...props}
    >
      {children}
      <HoverCardPrimitive.Arrow className="fill-surface" height={10} width={18} />
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Portal>
));

HoverCardContent.displayName = "HoverCardContent";
