import * as React from "react";

import { cn } from "../lib/cn";

export type StepStatus = "complete" | "current" | "upcoming";
export type StepperOrientation = "horizontal" | "vertical";

export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  orientation?: StepperOrientation;
}

export interface StepperItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  step?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: StepStatus;
  orientation?: StepperOrientation;
  isLast?: boolean;
}

export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <ol
        ref={ref}
        data-orientation={orientation}
        className={cn(
          "flex gap-4",
          orientation === "horizontal" ? "flex-wrap items-start" : "flex-col",
          className
        )}
        {...props}
      >
        {items.map((child, index) => {
          if (!React.isValidElement<StepperItemProps>(child)) {
            return child;
          }

          return React.cloneElement(child, {
            orientation: child.props.orientation ?? orientation,
            isLast: child.props.isLast ?? index === items.length - 1
          });
        })}
      </ol>
    );
  }
);

Stepper.displayName = "Stepper";

export const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  (
    {
      className,
      step,
      title,
      description,
      status = "upcoming",
      orientation = "horizontal",
      isLast = false,
      ...props
    },
    ref
  ) => {
    const indicator = (
      <span
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tracking-elegant transition duration-150",
          status === "complete" && "border-transparent bg-accent text-surface shadow-field",
          status === "current" && "border-accent/35 bg-accentSoft/80 text-accent shadow-field",
          status === "upcoming" && "border-border bg-surfaceAlt/70 text-textMuted"
        )}
      >
        {status === "complete" ? <CheckIcon className="h-4 w-4" /> : step}
      </span>
    );

    if (orientation === "vertical") {
      return (
        <li
          ref={ref}
          data-status={status}
          className={cn("flex items-start gap-3", className)}
          {...props}
        >
          <div className="flex flex-col items-center">
            {indicator}
            {isLast ? null : (
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 h-12 w-px rounded-full",
                  status === "complete" ? "bg-accent/45" : "bg-border/80"
                )}
              />
            )}
          </div>
          <div className="grid gap-1 pt-1">
            <div
              className={cn(
                "text-sm font-medium tracking-elegant",
                status === "current" ? "text-text" : "text-text/90"
              )}
            >
              {title}
            </div>
            {description ? <p className="text-sm leading-relaxed text-textMuted">{description}</p> : null}
          </div>
        </li>
      );
    }

    return (
      <li
        ref={ref}
        data-status={status}
        className={cn("flex min-w-[13rem] flex-1 flex-col gap-3", className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {indicator}
          {isLast ? null : (
            <span
              aria-hidden="true"
              className={cn(
                "h-px flex-1 rounded-full",
                status === "complete" ? "bg-accent/45" : "bg-border/80"
              )}
            />
          )}
        </div>
        <div className="grid gap-1 pr-3">
          <div
            className={cn(
              "text-sm font-medium tracking-elegant",
              status === "current" ? "text-text" : "text-text/90"
            )}
          >
            {title}
          </div>
          {description ? <p className="text-sm leading-relaxed text-textMuted">{description}</p> : null}
        </div>
      </li>
    );
  }
);

StepperItem.displayName = "StepperItem";

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
