"use client";

import * as React from "react";

import { cn } from "../lib/cn";
import { fieldVariants } from "../lib/field";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  keywords?: string[];
}

export interface ComboboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: React.ReactNode;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
}

export function Combobox({
  id,
  label,
  description,
  placeholder = "Choose an option",
  searchPlaceholder = "Search options...",
  emptyMessage = "No results found.",
  options,
  value,
  defaultValue,
  onValueChange,
  invalid = false,
  disabled = false,
  className,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const descriptionId = `${triggerId}-description`;

  const handleSelect = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
      setOpen(false);
    },
    [onValueChange, value]
  );

  return (
    <div className="grid gap-2">
      {label ? <div id={labelId} className="text-sm font-medium tracking-elegant text-text">{label}</div> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-invalid={invalid || undefined}
            aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
            aria-describedby={description ? descriptionId : undefined}
            disabled={disabled}
            className={cn(
              fieldVariants(),
              "items-center justify-between gap-4 text-left",
              invalid && "border-danger/70",
              disabled && "cursor-not-allowed opacity-60",
              className
            )}
            {...props}
          >
            <span className={cn("truncate", !selectedOption && "text-textMuted")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronIcon className="h-4 w-4 shrink-0 text-textMuted" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList className="max-h-72 p-2">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[
                    ...(option.keywords ?? []),
                    typeof option.label === "string" ? option.label : ""
                  ]}
                  disabled={option.disabled}
                  onSelect={() => handleSelect(option.value)}
                >
                  <span className="grid gap-1">
                    <span>{option.label}</span>
                    {option.description ? (
                      <span className="text-xs leading-relaxed text-textMuted">{option.description}</span>
                    ) : null}
                  </span>
                  <CheckIcon
                    className={cn(
                      "h-4 w-4 shrink-0 text-accent transition",
                      selectedValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {description ? (
        <p id={descriptionId} className="text-sm leading-relaxed text-textMuted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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

