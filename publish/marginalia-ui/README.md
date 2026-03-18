# Marginalia UI

Marginalia UI is a warm, academic, and elegant React/Next UI kit for teams that want calmer, more editorial interfaces than the usual AI-generated website output.

It is especially well suited to:

- blogs
- essays
- docs portals
- knowledge products
- editorial products
- content-heavy websites

## npm

```bash
npm install marginalia-ui
```

Import the stylesheet once near your app root:

```tsx
import "marginalia-ui/styles.css";
```

## GitHub Repository

- https://github.com/tahsinkoc/marginalia-ui

## Quick Start

```tsx
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from "marginalia-ui";
import "marginalia-ui/styles.css";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <Badge>Marginalia</Badge>
        <CardTitle>Join the reading room</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input placeholder="scholar@marginalia.dev" />
        <Button>Request access</Button>
      </CardContent>
    </Card>
  );
}
```

## Included Components

Marginalia currently includes:

- Foundations: `Button`, `Badge`, `Alert`, `Avatar`, `Card`, `Label`
- Forms: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Combobox`, `Calendar`, `DatePicker`
- Overlays: `Dialog`, `Sheet`, `DropdownMenu`, `Popover`, `Tooltip`, `HoverCard`, `ContextMenu`, `Toast`, `Command`, `CommandPalette`
- Navigation: `Tabs`, `Accordion`, `Breadcrumb`, `Menubar`, `Pagination`
- Data and editorial: `DataTable<T>`, `Table`, `EmptyState`, `Skeleton`, `Progress`, `Stepper`, `CodeViewer`, `RichTextSurface`

## Theme Customization

Marginalia is token-driven.

The compiled CSS exposes warm, semantic variables for:

- color
- radius
- shadow
- spacing
- density
- typography

Example override:

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

Marginalia supports:

- warm light defaults
- warm dark mode
- compact or roomier density tuning
- theme directions that feel more authored than generic UI presets

## Use with Codex

Marginalia is designed to work especially well with AI-assisted frontend building.

The GitHub repo includes a dedicated Codex skill:

- `skills/marginalia-ui`

That skill teaches Codex how to use the system correctly:

- which components to prefer
- how to stay inside the Marginalia visual language
- how to use theme tokens instead of random overrides
- how to compose full pages from the kit
- how to keep warm/editorial styling intact

Example prompt:

```txt
Use $marginalia-ui at ./skills/marginalia-ui to build a warm editorial landing page with marginalia-ui.
Prefer existing Marginalia components and theme tokens over custom styling or another UI kit.
```

## Why the Skill Matters

Many AI-built websites end up looking interchangeable.

Marginalia tries to solve that by combining:

- a distinctive warm UI system
- token-based theme building
- standardized component usage
- a Codex skill that teaches the system to use itself

This helps agents generate UI that is:

- more consistent
- more recognizable
- more warm and editorial
- less generic

It also means that even smaller models or lighter-weight agents can still stay above a stronger baseline when building UI, because the skill gives them a clearer system to follow.

## License

MIT
