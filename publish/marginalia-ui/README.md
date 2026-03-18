# Marginalia UI

Marginalia is a warm, academic, and elegant UI kit for the React and Next ecosystem. It ships as a prebuilt package with compiled CSS, so consuming apps do not need Tailwind configured to use the components.

## Install

```bash
npm install @marginalia/ui
```

Import the stylesheet once near your app root:

```tsx
import "@marginalia/ui/styles.css";
```

## Quick Start

```tsx
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from "@marginalia/ui";
import "@marginalia/ui/styles.css";

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

Marginalia currently includes foundations, forms, overlays, data display, navigation, editorial, and utility components such as:

- `Button`, `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
- `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `HoverCard`, `Menubar`, `Toast`
- `Table`, `DataTable<T>`, `DatePicker`, `Calendar`, `Pagination`, `Tabs`, `Accordion`
- `Card`, `Badge`, `Alert`, `Progress`, `Avatar`, `EmptyState`, `Breadcrumb`, `Skeleton`, `Stepper`
- `CodeViewer`, `Combobox`, `Command`, `CommandPalette`, `RichTextSurface`

## Theme Customization

Marginalia is token-driven. The compiled CSS exposes all theme tokens as CSS variables, so you can customize the library from your own global stylesheet without rebuilding the package.

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

Useful token groups:

- Color tokens: `--marginalia-color-*`
- Radius tokens: `--marginalia-radius-*`
- Spacing tokens: `--marginalia-space-*`
- Size tokens: `--marginalia-size-*`
- Shadow tokens: `--marginalia-shadow-*`

## Dark Mode

Marginalia supports dark mode through either a `.dark` class or a `[data-marginalia-theme="dark"]` attribute on an ancestor element.

## Publishing This Folder

This directory is already prepared as a standalone npm package. To publish it:

```bash
cd publish/marginalia-ui
npm publish
```

## License

MIT
