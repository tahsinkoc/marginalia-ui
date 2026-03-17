"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { cn } from "../lib/cn";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

export const ContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[14rem] origin-[var(--radix-context-menu-content-transform-origin)] overflow-hidden rounded-[26px] border bg-surface p-2 text-text shadow-panel will-change-[transform,opacity] data-[state=closed]:animate-float-out data-[state=open]:animate-float-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));

ContextMenuContent.displayName = "ContextMenuContent";

export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  destructive?: boolean;
  inset?: boolean;
}

export const ContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ className, destructive = false, inset = false, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-[18px] px-3 py-2.5 text-sm outline-none transition duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-accentSoft",
      inset && "pl-8",
      destructive && "text-danger data-[highlighted]:bg-danger/10",
      className
    )}
    {...props}
  />
));

ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuLabel = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-textMuted", className)}
    {...props}
  />
));

ContextMenuLabel.displayName = "ContextMenuLabel";

export const ContextMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border/80", className)}
    {...props}
  />
));

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ml-auto pl-4 text-[0.72rem] uppercase tracking-[0.14em] text-textMuted", className)}
      {...props}
    />
  );
}
