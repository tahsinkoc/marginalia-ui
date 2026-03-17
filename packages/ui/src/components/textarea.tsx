import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";
import { fieldVariants } from "../lib/field";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof fieldVariants> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, invalid = false, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        fieldVariants({ size }),
        "min-h-[var(--marginalia-size-textarea-min-height)] resize-y leading-[var(--marginalia-line-height-body)]",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

