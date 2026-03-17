"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../lib/cn";

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
}

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, invalid = false, disabled, id, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const control = (
    <SwitchPrimitive.Root
      ref={ref}
      id={switchId}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent bg-surfaceAlt shadow-field transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas data-[state=checked]:bg-accent",
        invalid && "border-danger data-[state=checked]:bg-danger",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 translate-x-1 rounded-full bg-surface shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-6" />
    </SwitchPrimitive.Root>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "flex w-full items-start justify-between gap-4 text-left",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <span className="grid gap-1">
        {label ? <span className="text-sm font-medium tracking-elegant text-text">{label}</span> : null}
        {description ? <span className="text-sm leading-relaxed text-textMuted">{description}</span> : null}
      </span>
      {control}
    </label>
  );
});

Switch.displayName = "Switch";

