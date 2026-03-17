"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "../lib/cn";

type RadioGroupContextValue = {
  invalid: boolean;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue>({ invalid: false });

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  options?: RadioOption[];
}

export interface RadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
}

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className, label, description, invalid = false, options, children, orientation = "vertical", id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const groupId = id ?? generatedId;
    const labelId = `${groupId}-label`;
    const descriptionId = `${groupId}-description`;

    return (
      <div className="grid gap-3">
        {label ? <div id={labelId} className="text-sm font-medium tracking-elegant text-text">{label}</div> : null}
        {description ? (
          <p id={descriptionId} className="-mt-1 text-sm leading-relaxed text-textMuted">
            {description}
          </p>
        ) : null}
        <RadioGroupContext.Provider value={{ invalid }}>
          <RadioGroupPrimitive.Root
            ref={ref}
            id={groupId}
            orientation={orientation}
            aria-invalid={invalid || undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              "grid gap-3",
              orientation === "horizontal" && "flex flex-wrap gap-4",
              className
            )}
            {...props}
          >
            {options
              ? options.map((option) => (
                  <RadioItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    label={option.label}
                    description={option.description}
                  />
                ))
              : children}
          </RadioGroupPrimitive.Root>
        </RadioGroupContext.Provider>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export const RadioItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, description, invalid, disabled, id, ...props }, ref) => {
  const generatedId = React.useId();
  const itemId = id ?? generatedId;
  const inheritedInvalid = React.useContext(RadioGroupContext).invalid;
  const isInvalid = invalid ?? inheritedInvalid;

  const control = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={itemId}
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-surface shadow-field transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas data-[state=checked]:border-accent",
        isInvalid && "border-danger",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className={cn("h-2.5 w-2.5 rounded-full bg-accent", isInvalid && "bg-danger")} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <label
      htmlFor={itemId}
      className={cn(
        "flex items-start gap-3 text-left",
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

RadioItem.displayName = "RadioItem";

