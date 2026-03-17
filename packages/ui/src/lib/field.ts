import { cva } from "class-variance-authority";

export const fieldVariants = cva(
  "flex w-full rounded-[22px] border bg-surface/95 text-text shadow-field transition duration-200 placeholder:text-textMuted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger/70",
  {
    variants: {
      size: {
        sm: "min-h-10 px-3 py-2 text-sm",
        md: "min-h-11 px-4 py-2.5 text-sm",
        lg: "min-h-12 px-5 py-3 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export type FieldSize = NonNullable<Parameters<typeof fieldVariants>[0]>["size"];
