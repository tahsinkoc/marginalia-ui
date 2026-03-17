import * as React from "react";

import { cn } from "../lib/cn";

export interface RichTextSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function RichTextSurface({
  as: Component = "article",
  className,
  ...props
}: RichTextSurfaceProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--ulib-radius-panel)] border bg-surface/95 px-[var(--ulib-space-panel)] py-[var(--ulib-space-panel)] text-[length:var(--ulib-size-text-body)] leading-[var(--ulib-line-height-body)] text-textMuted shadow-panel",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition hover:[&_a]:text-accent/80",
        "[&_strong]:font-semibold [&_strong]:text-text",
        "[&_em]:italic",
        "[&_hr]:my-8 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border/70",
        "[&_h1]:mt-0 [&_h1]:font-serif [&_h1]:text-[length:var(--ulib-size-text-display)] [&_h1]:leading-none [&_h1]:tracking-[-0.045em] [&_h1]:text-text",
        "[&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-[length:var(--ulib-size-text-heading)] [&_h2]:leading-tight [&_h2]:tracking-[-0.035em] [&_h2]:text-text",
        "[&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-[length:var(--ulib-size-text-subheading)] [&_h3]:leading-tight [&_h3]:tracking-[-0.02em] [&_h3]:text-text",
        "[&_p+*]:mt-4",
        "[&_*+h2]:mt-10 [&_*+h3]:mt-8",
        "[&_ul]:my-4 [&_ul]:pl-5 [&_ul]:marker:text-accent",
        "[&_ol]:my-4 [&_ol]:pl-5 [&_ol]:marker:text-accent",
        "[&_li+li]:mt-2",
        "[&_figure]:my-8 [&_figure]:grid [&_figure]:gap-3",
        "[&_figcaption]:text-[length:var(--ulib-size-text-sm)] [&_figcaption]:leading-relaxed [&_figcaption]:text-textMuted",
        "[&_blockquote]:my-8 [&_blockquote]:rounded-[var(--ulib-radius-field)] [&_blockquote]:border-l-4 [&_blockquote]:border-accent/55 [&_blockquote]:bg-accentSoft/40 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:font-serif [&_blockquote]:text-[length:var(--ulib-size-text-quote)] [&_blockquote]:leading-relaxed [&_blockquote]:tracking-[-0.015em] [&_blockquote]:text-text",
        "[&_code]:rounded-md [&_code]:bg-accentSoft/65 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-text",
        className
      )}
      {...props}
    />
  );
}

export const RichTextKicker = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mb-4 text-[length:var(--ulib-size-text-xs)] font-semibold uppercase tracking-[0.22em] text-accent", className)}
      {...props}
    />
  )
);

RichTextKicker.displayName = "RichTextKicker";

export const RichTextLead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("max-w-[var(--ulib-content-max-width)] text-[length:var(--ulib-size-text-lead)] leading-[1.8] text-text", className)}
      {...props}
    />
  )
);

RichTextLead.displayName = "RichTextLead";

export const RichTextMeta = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 pt-4 text-[length:var(--ulib-size-text-xs)] uppercase tracking-[0.16em] text-textMuted",
        className
      )}
      {...props}
    />
  )
);

RichTextMeta.displayName = "RichTextMeta";

export const RichTextQuote = React.forwardRef<
  HTMLQuoteElement,
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "my-8 rounded-[var(--ulib-radius-field)] border-l-4 border-accent/55 bg-accentSoft/40 px-5 py-4 font-serif text-[length:var(--ulib-size-text-quote)] leading-relaxed tracking-[-0.015em] text-text",
      className
    )}
    {...props}
  />
));

RichTextQuote.displayName = "RichTextQuote";
