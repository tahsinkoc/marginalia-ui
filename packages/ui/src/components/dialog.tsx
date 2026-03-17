"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "../lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideClose?: boolean;
}

export const DialogOverlay = React.forwardRef<
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

DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hideClose = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 gap-[var(--marginalia-space-panel-compact)] rounded-[var(--marginalia-radius-overlay)] border bg-surface p-[var(--marginalia-space-panel)] shadow-panel will-change-[transform,opacity] data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
        className
      )}
      {...props}
    >
      {children}
      {hideClose ? null : (
        <DialogPrimitive.Close
          aria-label="Close dialog"
          className="absolute right-4 top-4 inline-flex h-[var(--marginalia-size-control-sm)] w-[var(--marginalia-size-control-sm)] items-center justify-center rounded-[var(--marginalia-radius-pill)] border bg-surfaceAlt text-textMuted transition hover:border-accent/30 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <CloseIcon className="h-4 w-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = "DialogContent";

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-2 pr-12", className)} {...props} />
);

DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-wrap items-center justify-end gap-[var(--marginalia-space-inline)]", className)} {...props} />
);

DialogFooter.displayName = "DialogFooter";

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-serif text-[length:var(--marginalia-size-text-dialog-title)] leading-tight tracking-[-0.03em] text-text", className)}
    {...props}
  />
));

DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[length:var(--marginalia-size-text-sm)] leading-relaxed text-textMuted", className)}
    {...props}
  />
));

DialogDescription.displayName = "DialogDescription";

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

