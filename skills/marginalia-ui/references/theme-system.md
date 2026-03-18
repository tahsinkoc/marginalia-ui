# Theme System

Use this file before changing colors, density, shadows, radii, or dark mode.

## Installation

Import Marginalia styles once at the app root:

```tsx
import "@marginalia/ui/styles.css";
```

## Theme Source of Truth

- Library token source: `packages/ui/src/styles/theme.css`
- Docs theme builder: `apps/docs/app/theme/page.tsx`
- Docs builder component: `apps/docs/components/theme-builder.tsx`

## Core Visual Direction

- Academic
- Classy
- Elegant
- Warm
- Restrained
- Editorial

Do not drift into flashy product-marketing gradients, glass-heavy dashboards, or generic corporate SaaS styling unless the user explicitly asks.

## Light and Dark Mode

- Light mode is the default.
- Dark mode is warm, paper-and-ink inspired, not cold slate/blue-black.
- Dark mode activates through either:
  - `.dark`
  - `[data-marginalia-theme="dark"]`

Example:

```tsx
<html className="dark">
  <body>{children}</body>
</html>
```

## Token Families

### Color Tokens

- `--marginalia-color-canvas`
- `--marginalia-color-surface`
- `--marginalia-color-surface-alt`
- `--marginalia-color-border`
- `--marginalia-color-text`
- `--marginalia-color-text-muted`
- `--marginalia-color-accent`
- `--marginalia-color-accent-soft`
- `--marginalia-color-focus`
- `--marginalia-color-success`
- `--marginalia-color-warning`
- `--marginalia-color-danger`

### Shadow Tokens

- `--marginalia-shadow-panel`
- `--marginalia-shadow-field`

### Radius Tokens

- `--marginalia-radius-panel`
- `--marginalia-radius-overlay`
- `--marginalia-radius-field`
- `--marginalia-radius-pill`

### Spacing Tokens

- `--marginalia-space-panel`
- `--marginalia-space-panel-compact`
- `--marginalia-space-stack`
- `--marginalia-space-inline`
- `--marginalia-space-control-x-sm`
- `--marginalia-space-control-x-md`
- `--marginalia-space-control-x-lg`
- `--marginalia-space-control-y-sm`
- `--marginalia-space-control-y-md`
- `--marginalia-space-control-y-lg`
- `--marginalia-space-badge-x`
- `--marginalia-space-badge-y`

### Size Tokens

- `--marginalia-size-control-sm`
- `--marginalia-size-control-md`
- `--marginalia-size-control-lg`
- `--marginalia-size-text-xs`
- `--marginalia-size-text-sm`
- `--marginalia-size-text-body`
- `--marginalia-size-text-lead`
- `--marginalia-size-text-title`
- `--marginalia-size-text-heading`
- `--marginalia-size-text-subheading`
- `--marginalia-size-text-display`
- `--marginalia-size-text-dialog-title`
- `--marginalia-size-text-quote`
- `--marginalia-size-textarea-min-height`

### Layout and Typography Tokens

- `--marginalia-line-height-body`
- `--marginalia-content-max-width`
- `--marginalia-font-serif`
- `--marginalia-font-sans`

## Safe Customization Rules

- Change theme through CSS variables first.
- Avoid one-off per-component color overrides if the goal is system-wide tone.
- Prefer changing density tokens over hard-coded `padding` and `font-size`.
- Keep focus rings visible.
- Do not remove warm contrast by flattening everything into gray.

## Example Theme Override

```css
:root {
  --marginalia-color-canvas: 247 242 233;
  --marginalia-color-surface: 255 250 243;
  --marginalia-color-accent: 157 112 78;
  --marginalia-size-control-md: 44px;
  --marginalia-size-text-body: 15px;
}

.dark {
  --marginalia-color-canvas: 23 19 16;
  --marginalia-color-surface: 33 27 23;
  --marginalia-color-accent: 199 154 114;
}
```

## Density Guidance

To make Marginalia feel tighter, reduce these first:

- `--marginalia-size-control-*`
- `--marginalia-space-control-*`
- `--marginalia-space-panel*`
- `--marginalia-size-text-body`
- `--marginalia-size-text-sm`

Do not jump straight to ad hoc component-specific overrides unless the user asks for a one-off exception.

## Recommended Palette Directions

Use these as tone directions when the user asks for a variant:

- Classic Warm: paper, ivory, muted amber accent
- Warm Blue: warm parchment base with dusty blue accent
- Warm Green: warm parchment base with moss/olive accent
- Warm Gray: softer stone palette for neutral editorial use
- Warm White/Black: highest contrast, still warm at the edges

Keep every preset human, soft, and readable. Avoid sterile or neon accents.

## Layout Guidance

- Use `Card` and `Sheet` as the primary large surfaces.
- Use `RichTextSurface` for long-form content instead of inventing bespoke article CSS.
- Use `Badge` for compact labels and metadata rather than oversized pills.
- Let whitespace come from the token rhythm, not arbitrary giant gaps.

## If You Need to Restyle the Library Itself

- Edit `packages/ui/src/styles/theme.css`
- Then rebuild `@marginalia/ui`

## If You Are Styling a Consumer App

- Override tokens in the app's global stylesheet.
- Keep the component API unchanged.
- Import `@marginalia/ui/styles.css` before your overrides.
