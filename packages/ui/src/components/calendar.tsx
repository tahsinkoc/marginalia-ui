"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "../lib/cn";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const defaultClassNames = getDefaultClassNames();

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  // DayPicker keeps both months in the DOM during animated transitions.
  // We don't ship its full animation stylesheet, so disabling animation by
  // default avoids the duplicated-month glitch in DatePicker/Calendar.
  animate = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      animate={animate}
      showOutsideDays={showOutsideDays}
      className={cn("rounded-[28px] border bg-surface p-3 shadow-field", className)}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-4",
        month_caption: "relative flex items-center justify-center px-10 pt-1",
        caption_label: "font-serif text-lg leading-none tracking-[-0.02em] text-text",
        nav: "absolute inset-x-0 top-1 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-8 w-8 rounded-full px-0 text-textMuted hover:bg-accentSoft hover:text-text"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-8 w-8 rounded-full px-0 text-textMuted hover:bg-accentSoft hover:text-text"
        ),
        chevron: "h-4 w-4",
        month_grid: "w-full border-collapse",
        weekdays: "grid grid-cols-7 gap-1",
        weekday:
          "flex h-9 items-center justify-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-textMuted",
        weeks: "mt-1 grid gap-1",
        week: "grid grid-cols-7 gap-1",
        day: "h-10 w-10 p-0 text-center text-sm",
        day_button:
          "flex h-10 w-10 items-center justify-center rounded-full text-sm text-text transition duration-150 hover:bg-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface aria-selected:bg-accent aria-selected:text-surface",
        selected: "[&>button]:bg-accent [&>button]:text-surface [&>button]:shadow-field",
        today: "[&>button]:border [&>button]:border-accent/35 [&>button]:font-semibold [&>button]:text-accent",
        outside: "[&>button]:text-textMuted/45",
        disabled: "[&>button]:cursor-not-allowed [&>button]:opacity-35 [&>button]:hover:bg-transparent",
        hidden: "invisible",
        focused: "relative z-10",
        ...classNames
      }}
      {...props}
    />
  );
}
