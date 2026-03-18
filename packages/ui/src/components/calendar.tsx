"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames, type MonthCaptionProps, useDayPicker } from "react-day-picker";

import { cn } from "../lib/cn";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const defaultClassNames = getDefaultClassNames();

export function Calendar({
  className,
  classNames,
  components,
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
      components={{
        Nav: EmptyCalendarNav,
        MonthCaption: CalendarMonthCaption,
        ...components
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-3",
        month_caption: "relative",
        caption_label: "font-serif text-lg leading-none tracking-[-0.02em] text-text",
        nav: "hidden",
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

function CalendarMonthCaption({
  calendarMonth,
  className,
  ...props
}: MonthCaptionProps) {
  const { goToMonth, dayPickerProps } = useDayPicker();
  const currentMonth = toMonthStart(calendarMonth.date);
  const previousMonth = shiftMonth(currentMonth, -1);
  const nextMonth = shiftMonth(currentMonth, 1);
  const previousYear = shiftMonth(currentMonth, -12);
  const nextYear = shiftMonth(currentMonth, 12);
  const navStart = dayPickerProps.startMonth ?? dayPickerProps.fromMonth;
  const navEnd = dayPickerProps.endMonth ?? dayPickerProps.toMonth;
  const navigationHidden = dayPickerProps.hideNavigation;
  const navigationDisabled = dayPickerProps.disableNavigation;
  const label = formatCalendarCaption(currentMonth, dayPickerProps.locale);

  return (
    <div
      className={cn(
        className,
        "grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-2 px-1 py-1"
      )}
      {...props}
    >
      <div className="flex h-9 items-center gap-0.5">
        {!navigationHidden ? (
          <>
            <CalendarNavButton
              ariaLabel="Go to previous year"
              disabled={navigationDisabled || !canNavigateTo(previousYear, navStart, navEnd)}
              onClick={() => goToMonth(previousYear)}
            >
              <DoubleChevronLeftIcon className="h-4 w-4" />
            </CalendarNavButton>
            <CalendarNavButton
              ariaLabel="Go to previous month"
              disabled={navigationDisabled || !canNavigateTo(previousMonth, navStart, navEnd)}
              onClick={() => goToMonth(previousMonth)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </CalendarNavButton>
          </>
        ) : null}
      </div>

      <div className="min-w-0 text-center font-serif text-lg leading-tight tracking-[-0.02em] text-text">
        {label}
      </div>

      <div className="flex h-9 items-center justify-end gap-0.5">
        {!navigationHidden ? (
          <>
            <CalendarNavButton
              ariaLabel="Go to next month"
              disabled={navigationDisabled || !canNavigateTo(nextMonth, navStart, navEnd)}
              onClick={() => goToMonth(nextMonth)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </CalendarNavButton>
            <CalendarNavButton
              ariaLabel="Go to next year"
              disabled={navigationDisabled || !canNavigateTo(nextYear, navStart, navEnd)}
              onClick={() => goToMonth(nextYear)}
            >
              <DoubleChevronRightIcon className="h-4 w-4" />
            </CalendarNavButton>
          </>
        ) : null}
      </div>
    </div>
  );
}

function EmptyCalendarNav() {
  return <></>;
}

function CalendarNavButton({
  ariaLabel,
  disabled,
  onClick,
  children
}: {
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "h-8 w-8 rounded-full px-0 text-textMuted hover:bg-accentSoft hover:text-text disabled:pointer-events-none disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-textMuted"
      )}
    >
      {children}
    </button>
  );
}

function formatCalendarCaption(month: Date, locale: unknown) {
  const localeCode =
    locale && typeof locale === "object" && "code" in locale && typeof locale.code === "string"
      ? locale.code
      : "en-US";

  const parts = new Intl.DateTimeFormat(localeCode, {
    month: "long",
    year: "numeric"
  }).formatToParts(month);
  const monthPart = parts.find((part) => part.type === "month")?.value;
  const yearPart = parts.find((part) => part.type === "year")?.value;

  if (monthPart && yearPart) {
    return `${monthPart} ${yearPart}`;
  }

  return new Intl.DateTimeFormat(localeCode, {
    month: "long",
    year: "numeric"
  }).format(month);
}

function canNavigateTo(month: Date, startMonth?: Date, endMonth?: Date) {
  const target = toMonthStart(month);

  if (startMonth && target.getTime() < toMonthStart(startMonth).getTime()) {
    return false;
  }

  if (endMonth && target.getTime() > toMonthStart(endMonth).getTime()) {
    return false;
  }

  return true;
}

function shiftMonth(month: Date, amount: number) {
  return new Date(month.getFullYear(), month.getMonth() + amount, 1);
}

function toMonthStart(month: Date) {
  return new Date(month.getFullYear(), month.getMonth(), 1);
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="m9.75 3.5-4 4 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="m6.25 3.5 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DoubleChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="m10.75 3.5-4 4 4 4M6.75 3.5l-4 4 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DoubleChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="m5.25 3.5 4 4-4 4M9.25 3.5l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
