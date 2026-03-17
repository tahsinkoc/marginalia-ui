import * as React from "react";

import { cn } from "../lib/cn";

export const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="Pagination"
    className={cn("flex w-full items-center justify-center", className)}
    {...props}
  />
);

Pagination.displayName = "Pagination";

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
));

PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("list-none", className)} {...props} />
));

PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  disabled?: boolean;
}

export const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, active = false, disabled = false, onClick, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-4 text-sm font-medium tracking-elegant transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        active
          ? "border-transparent bg-accent text-surface shadow-field"
          : "border-border bg-surface text-text hover:bg-accentSoft/80",
        disabled && "pointer-events-none opacity-45",
        className
      )}
      {...props}
    />
  )
);

PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, children = "Previous", ...props }, ref) => (
    <PaginationLink ref={ref} className={cn("gap-2 pl-3.5", className)} {...props}>
      <ArrowLeftIcon className="h-4 w-4" />
      <span>{children}</span>
    </PaginationLink>
  )
);

PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, children = "Next", ...props }, ref) => (
    <PaginationLink ref={ref} className={cn("gap-2 pr-3.5", className)} {...props}>
      <span>{children}</span>
      <ArrowRightIcon className="h-4 w-4" />
    </PaginationLink>
  )
);

PaginationNext.displayName = "PaginationNext";

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-10 min-w-10 items-center justify-center text-textMuted", className)}
      {...props}
    >
      <EllipsisIcon className="h-4 w-4" />
    </span>
  );
}

PaginationEllipsis.displayName = "PaginationEllipsis";

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M9.75 3.75 5.5 8l4.25 4.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M6.25 3.75 10.5 8l-4.25 4.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function EllipsisIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <circle cx="3.5" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}

