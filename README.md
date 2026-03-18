# Marginalia

Marginalia is a warm, academic, editorial React and Next.js UI library designed for building websites that feel more thoughtful than the usual AI-generated output.

It focuses on a calmer visual language: paper-like surfaces, restrained contrast, elegant typography, and a warm theme system that works especially well for blogs, essays, knowledge products, editorial platforms, documentation, and content-heavy interfaces.

## Why Marginalia

Most AI-built websites drift toward the same look:

- generic SaaS cards
- cold neutral palettes
- interchangeable hero sections
- overused dashboard patterns

Marginalia aims in the opposite direction.

- Warm light themes by default
- Warm dark mode variants instead of cold blue-black UI
- Academic, classy, and editorial design DNA
- Token-based theme customization for color, density, radius, spacing, and typography
- Strong defaults that still leave room for originality

The goal is not just consistency. The goal is to help AI-assisted website building produce interfaces that feel more authored, more human, and less template-like.

## AI-First by Design

Marginalia is not only a UI library. It also ships with a dedicated Codex skill:

- Path: `skills/marginalia-ui`

That skill teaches Codex how to use the kit properly:

- which components to prefer
- how to stay inside the Marginalia system
- how to use theme tokens
- how to compose full pages from the kit
- how to avoid drifting into another UI language

This matters because AI systems are usually capable of building UI, but not always good at staying visually coherent over time.

Marginalia + its bundled skill helps agents:

- produce more standardized output without becoming generic
- keep a distinct warm/editorial identity across pages
- use the existing component system instead of improvising every screen
- reach a stronger quality floor even when smaller models or lighter agents are attached

In practice, this means even a more limited coding agent can still generate web UI that is more consistent, more original, and more on-brand than the average AI-built interface.

## What Ships Today

Marginalia currently includes:

- Foundations: `Button`, `Badge`, `Alert`, `Avatar`, `Card`, `Label`
- Forms: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Combobox`, `Calendar`, `DatePicker`
- Overlays: `Dialog`, `Sheet`, `DropdownMenu`, `Popover`, `Tooltip`, `HoverCard`, `ContextMenu`, `Toast`, `Command`, `CommandPalette`
- Navigation: `Tabs`, `Accordion`, `Breadcrumb`, `Menubar`, `Pagination`
- Data and editorial: `DataTable<T>`, `Table`, `EmptyState`, `Skeleton`, `Progress`, `Stepper`, `CodeViewer`, `RichTextSurface`

## Theme System

Marginalia is token-driven.

The theme system supports:

- warm preset directions
- light and dark mode variants
- density tuning
- color customization
- spacing and size adjustments

The core token source lives in:

- `packages/ui/src/styles/theme.css`

The docs app also includes a theme builder so users can adjust the palette and export token overrides quickly.

## Docs and Usage

The project includes a full docs app with:

- component catalog
- usage page with live previews and import-ready examples
- theme builder
- Codex skill references

Useful paths:

- UI package: `packages/ui`
- Docs app: `apps/docs`
- Publish-ready package copy: `publish/marginalia-ui`
- Codex skill: `skills/marginalia-ui`

## Local Development

Requirements:

- Node.js `>= 20`
- npm

Install dependencies:

```bash
npm install
```

Run the workspace:

```bash
npm run dev
```

Build everything:

```bash
npm run build
```

Run UI tests:

```bash
npm run test
```

## Using the Skill with Codex

If you want Codex to build with Marginalia instead of inventing unrelated UI, point it to the bundled skill and tell it to stay inside the system.

Example prompt:

```txt
Use $marginalia-ui at ./skills/marginalia-ui to build a warm editorial landing page with @marginalia/ui.
Prefer existing Marginalia components and theme tokens over custom styling or another UI kit.
```

This is especially useful for:

- academic websites
- personal blogs
- content platforms
- docs portals
- reading-first products
- brand-sensitive AI-generated frontends

## Philosophy

Marginalia is built around a simple idea:

AI should not only make websites faster to build. It should also make it easier to build websites with a stronger point of view.

By combining:

- a coherent warm design system
- a theme layer that is easy to customize
- a component library with thoughtful defaults
- a Codex skill that teaches the system to use itself correctly

Marginalia helps AI generate UI that is more recognizable, more editorial, and less disposable.

## License

MIT
