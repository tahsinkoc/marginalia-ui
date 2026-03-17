"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-[100] flex max-h-screen w-[min(96vw,24rem)] flex-col gap-3 outline-none sm:bottom-6 sm:right-6",
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  "group pointer-events-auto relative grid gap-1 overflow-hidden rounded-[28px] border p-4 pr-11 shadow-panel backdrop-blur-sm will-change-[transform,opacity] data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=end]:animate-toast-out motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
  {
    variants: {
      variant: {
        default: "bg-surface text-text",
        success: "border-success/25 bg-success/10 text-text",
        warning: "border-warning/25 bg-warning/10 text-text",
        danger: "border-danger/25 bg-danger/10 text-text"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));

Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold tracking-elegant text-text", className)}
    {...props}
  />
));

ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-textMuted", className)}
    {...props}
  />
));

ToastDescription.displayName = "ToastDescription";

export const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "mt-2 inline-flex h-9 items-center justify-center rounded-full border bg-surfaceAlt px-4 text-sm font-medium tracking-elegant text-text transition hover:bg-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
      className
    )}
    {...props}
  />
));

ToastAction.displayName = "ToastAction";

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label="Close toast"
    className={cn(
      "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-textMuted transition hover:bg-surfaceAlt hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
      className
    )}
    toast-close=""
    {...props}
  >
    <CloseIcon className="h-4 w-4" />
  </ToastPrimitive.Close>
));

ToastClose.displayName = "ToastClose";

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
