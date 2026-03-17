import * as React from "react";

import { cn } from "../lib/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-[length:var(--ulib-size-text-sm)] font-medium leading-none tracking-elegant text-text", className)}
    {...props}
  />
));

Label.displayName = "Label";
