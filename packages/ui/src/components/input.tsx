import * as React from "react";

import { cn } from "../lib/cn";
import { fieldVariants, type FieldSize } from "../lib/field";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: FieldSize;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, invalid = false, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(fieldVariants({ size }), className)}
      {...props}
    />
  )
);

Input.displayName = "Input";
