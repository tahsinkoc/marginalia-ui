"use client";

import * as React from "react";

import { cn } from "../lib/cn";
import { fieldVariants } from "../lib/field";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onSelect"> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  selected?: Date;
  defaultSelected?: Date;
  onSelect?: (date: Date | undefined) => void;
  invalid?: boolean;
  formatDate?: (date: Date) => string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
}

const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

export function DatePicker({
  id,
  label,
  description,
  placeholder = "Choose a date",
  selected,
  defaultSelected,
  onSelect,
  invalid = false,
  formatDate = (date) => defaultFormatter.format(date),
  calendarProps,
  disabled = false,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalSelected, setInternalSelected] = React.useState<Date | undefined>(defaultSelected);
  const selectedDate = selected ?? internalSelected;
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const descriptionId = `${triggerId}-description`;

  const handleSelect = React.useCallback(
    (nextDate: Date | undefined) => {
      if (selected === undefined) {
        setInternalSelected(nextDate);
      }

      onSelect?.(nextDate);

      if (nextDate) {
        setOpen(false);
      }
    },
    [onSelect, selected]
  );

  return (
    <div className="grid gap-2">
      {label ? <div id={labelId} className="text-sm font-medium tracking-elegant text-text">{label}</div> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={triggerId}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-invalid={invalid || undefined}
            aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              fieldVariants(),
              "items-center justify-between gap-4 text-left",
              invalid && "border-danger/70",
              disabled && "cursor-not-allowed opacity-60",
              className
            )}
            {...props}
          >
            <span className={cn("truncate", !selectedDate && "text-textMuted")}>
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </span>
            <CalendarIcon className="h-4 w-4 shrink-0 text-textMuted" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto border-none bg-transparent p-0 shadow-none">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate}
            {...calendarProps}
          />
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 2v3M11 2v3M2.5 6.5h11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

