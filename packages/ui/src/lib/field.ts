import { cva } from "class-variance-authority";

export const fieldVariants = cva(
  "flex w-full rounded-[var(--marginalia-radius-field)] border bg-surface/95 text-text shadow-field transition duration-200 placeholder:text-textMuted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger/70",
  {
    variants: {
      size: {
        sm: "min-h-[var(--marginalia-size-control-sm)] px-[var(--marginalia-space-control-x-sm)] py-[var(--marginalia-space-control-y-sm)] text-[length:var(--marginalia-size-text-sm)]",
        md: "min-h-[var(--marginalia-size-control-md)] px-[var(--marginalia-space-control-x-md)] py-[var(--marginalia-space-control-y-md)] text-[length:var(--marginalia-size-text-sm)]",
        lg: "min-h-[var(--marginalia-size-control-lg)] px-[var(--marginalia-space-control-x-lg)] py-[var(--marginalia-space-control-y-lg)] text-[length:var(--marginalia-size-text-body)]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export type FieldSize = NonNullable<Parameters<typeof fieldVariants>[0]>["size"];

