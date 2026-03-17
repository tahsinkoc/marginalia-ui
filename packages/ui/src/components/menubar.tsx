"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

import { cn } from "../lib/cn";

export const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex min-h-12 items-center gap-1 rounded-full border bg-surface/95 p-1.5 shadow-field",
      className
    )}
    {...props}
  />
));

Menubar.displayName = "Menubar";

export const MenubarMenu = MenubarPrimitive.Menu;

export const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex min-h-9 items-center rounded-full px-4 py-2 text-sm font-medium tracking-elegant text-text outline-none transition duration-150 hover:bg-accentSoft/65 focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface data-[highlighted]:bg-accentSoft/55 data-[state=open]:bg-accentSoft",
      className
    )}
    {...props}
  />
));

MenubarTrigger.displayName = "MenubarTrigger";

export const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", sideOffset = 10, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[14rem] origin-[var(--radix-menubar-content-transform-origin)] overflow-hidden rounded-[26px] border bg-surface p-2 text-text shadow-panel will-change-[transform,opacity] data-[state=closed]:animate-float-out data-[state=open]:animate-float-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));

MenubarContent.displayName = "MenubarContent";

export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  destructive?: boolean;
  inset?: boolean;
}

export const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, destructive = false, inset = false, ...props }, ref) => (
  <MenubarPrimitive.Item
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

MenubarItem.displayName = "MenubarItem";

export const MenubarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-textMuted", className)}
    {...props}
  />
));

MenubarLabel.displayName = "MenubarLabel";

export const MenubarSeparator = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border/80", className)}
    {...props}
  />
));

MenubarSeparator.displayName = "MenubarSeparator";

export function MenubarShortcut({
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
