"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "../lib/cn";
import { fieldVariants } from "../lib/field";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "children"> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  options: SelectOption[];
  invalid?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Select({
  id,
  label,
  description,
  placeholder = "Select an option",
  options,
  invalid = false,
  className,
  contentClassName,
  ...props
}: SelectProps) {
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const descriptionId = `${triggerId}-description`;

  return (
    <div className="grid gap-2">
      {label ? (
        <div id={labelId} className="text-[length:var(--marginalia-size-text-sm)] font-medium tracking-elegant text-text">
          {label}
        </div>
      ) : null}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={triggerId}
          aria-invalid={invalid || undefined}
          aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            fieldVariants(),
            "items-center justify-between gap-4 text-left",
            invalid && "border-danger/70",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="text-textMuted">
            <ChevronDownIcon className="h-4 w-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={10}
            className={cn(
              "z-50 overflow-hidden rounded-[var(--marginalia-radius-overlay)] border bg-surface p-2 text-text shadow-panel",
              contentClassName
            )}
          >
            <SelectPrimitive.Viewport className="max-h-72 min-w-[var(--radix-select-trigger-width)] p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="relative flex cursor-default select-none rounded-[var(--marginalia-radius-field)] px-10 py-3 text-[length:var(--marginalia-size-text-sm)] outline-none transition duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-accentSoft"
                >
                  <span className="absolute left-3 top-3.5 flex h-4 w-4 items-center justify-center text-accent">
                    <SelectPrimitive.ItemIndicator>
                      <CheckIcon className="h-4 w-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <span className="grid gap-1">
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    {option.description ? (
                      <span className="text-[length:var(--marginalia-size-text-xs)] leading-relaxed text-textMuted">{option.description}</span>
                    ) : null}
                  </span>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {description ? (
        <p id={descriptionId} className="text-[length:var(--marginalia-size-text-sm)] leading-relaxed text-textMuted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M4 6.25 8 10.25 12 6.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

