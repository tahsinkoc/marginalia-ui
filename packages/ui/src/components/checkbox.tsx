"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../lib/cn";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, invalid = false, disabled, id, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const control = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border bg-surface text-surface shadow-field transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        invalid && "border-danger data-[state=checked]:border-danger data-[state=checked]:bg-danger",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.2]">
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex w-full items-start gap-3 text-left",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {control}
      <span className="grid gap-1">
        {label ? <span className="text-sm font-medium tracking-elegant text-text">{label}</span> : null}
        {description ? <span className="text-sm leading-relaxed text-textMuted">{description}</span> : null}
      </span>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

