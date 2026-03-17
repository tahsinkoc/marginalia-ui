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
      className={cn(fieldVariants({ size }), "min-h-[144px] resize-y leading-relaxed", className)}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

