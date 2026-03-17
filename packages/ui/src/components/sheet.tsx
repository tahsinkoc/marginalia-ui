"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetPortal = DialogPrimitive.Portal;
export const SheetClose = DialogPrimitive.Close;

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-text/20 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
      className
    )}
    {...props}
  />
));

SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-[var(--marginalia-space-panel-compact)] border bg-surface/90 p-[var(--marginalia-space-panel)] shadow-panel backdrop-blur-xl supports-[backdrop-filter]:bg-surface/82 will-change-[transform,opacity] motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
  {
    variants: {
      side: {
        top: "inset-x-3 top-3 rounded-[var(--marginalia-radius-overlay)] data-[state=closed]:animate-sheet-out-top data-[state=open]:animate-sheet-in-top sm:inset-x-6 sm:top-6",
        bottom:
          "inset-x-3 bottom-3 rounded-[var(--marginalia-radius-overlay)] data-[state=closed]:animate-sheet-out-bottom data-[state=open]:animate-sheet-in-bottom sm:inset-x-6 sm:bottom-6",
        left: "inset-y-3 left-3 h-[calc(100dvh-1.5rem)] w-[min(88vw,26rem)] rounded-[var(--marginalia-radius-overlay)] data-[state=closed]:animate-sheet-out-left data-[state=open]:animate-sheet-in-left sm:left-4 sm:w-[min(72vw,27rem)]",
        right:
          "inset-y-3 right-3 h-[calc(100dvh-1.5rem)] w-[min(88vw,26rem)] rounded-[var(--marginalia-radius-overlay)] data-[state=closed]:animate-sheet-out-right data-[state=open]:animate-sheet-in-right sm:right-4 sm:w-[min(72vw,27rem)]"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  hideClose?: boolean;
}

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, side, hideClose = false, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {hideClose ? null : (
        <DialogPrimitive.Close
          aria-label="Close sheet"
          className="absolute right-4 top-4 inline-flex h-[var(--marginalia-size-control-sm)] w-[var(--marginalia-size-control-sm)] items-center justify-center rounded-[var(--marginalia-radius-pill)] border bg-surfaceAlt text-textMuted transition hover:border-accent/30 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <CloseIcon className="h-4 w-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
));

SheetContent.displayName = "SheetContent";

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid min-w-0 gap-1.5 pr-[calc(var(--marginalia-size-control-sm)+var(--marginalia-space-inline))]",
      className
    )}
    {...props}
  />
);

SheetHeader.displayName = "SheetHeader";

export const SheetBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid min-h-0 flex-1 auto-rows-max content-start gap-[var(--marginalia-space-stack)] overflow-y-auto pr-1",
        className
      )}
      {...props}
    />
  )
);

SheetBody.displayName = "SheetBody";

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-auto flex flex-wrap items-center justify-end gap-[var(--marginalia-space-inline)] border-t border-border/70 pt-[var(--marginalia-space-panel-compact)]",
      className
    )}
    {...props}
  />
);

SheetFooter.displayName = "SheetFooter";

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-serif text-[length:var(--marginalia-size-text-subheading)] leading-tight tracking-[-0.03em] text-text",
      className
    )}
    {...props}
  />
));

SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[length:var(--marginalia-size-text-sm)] leading-relaxed text-textMuted", className)}
    {...props}
  />
));

SheetDescription.displayName = "SheetDescription";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M4 4 12 12M12 4 4 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
