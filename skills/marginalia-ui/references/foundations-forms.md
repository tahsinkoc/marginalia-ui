# Foundations and Forms

Use this file when building page structure, calls to action, status UI, or form flows.

## General Rules

- Prefer Marginalia components directly; avoid rebuilding buttons, inputs, cards, or labels from scratch.
- Use simple layout wrappers around these components instead of styling the primitives heavily.
- Keep forms calm and editorial: clear labels, modest spacing, and restrained feedback.

## Button

- Import: `import { Button } from "@marginalia/ui";`
- Variants: `primary` default, `secondary`, `outline`, `ghost`, `link`
- Sizes: `sm`, `md`, `lg`
- States: `loading`, `disabled`

```tsx
import { Button } from "@marginalia/ui";

export function Actions() {
  return (
    <>
      <Button>Publish</Button>
      <Button variant="secondary">Save draft</Button>
      <Button variant="ghost" size="sm">Read later</Button>
    </>
  );
}
```

## Badge

- Import: `import { Badge } from "@marginalia/ui";`
- Use for compact metadata and status, not large labels.
- Variants commonly used: default, `accent`, `success`, `warning`

```tsx
import { Badge } from "@marginalia/ui";

<Badge variant="accent">Featured</Badge>
```

## Alert

- Import: `import { Alert, AlertDescription, AlertTitle } from "@marginalia/ui";`
- Use for inline warnings, confirmations, and operational notes.
- Keep copy short and specific.

```tsx
import { Alert, AlertDescription, AlertTitle } from "@marginalia/ui";

<Alert variant="warning">
  <AlertTitle>Review window is closing</AlertTitle>
  <AlertDescription>This draft has been waiting for approval for 48 hours.</AlertDescription>
</Alert>
```

## Avatar

- Import: `import { Avatar, AvatarFallback, AvatarImage } from "@marginalia/ui";`
- Prefer initials fallback when an image is unavailable.
- Use for collaborators, authors, reviewers, and comment threads.

```tsx
import { Avatar, AvatarFallback } from "@marginalia/ui";

<Avatar>
  <AvatarFallback>SC</AvatarFallback>
</Avatar>
```

## Card

- Import: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@marginalia/ui";`
- Use as the main surface primitive for grouped UI.
- Compose forms, settings blocks, stats, and previews with Card first.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@marginalia/ui";

<Card>
  <CardHeader>
    <CardTitle>Editorial notes</CardTitle>
    <CardDescription>Warm, restrained surfaces for grouped UI.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input value="Scholar's annotation ready" readOnly />
  </CardContent>
</Card>
```

## Label

- Import: `import { Label } from "@marginalia/ui";`
- Pair with every text field, select, textarea, date picker, and grouped control.
- Use explicit `htmlFor` when possible.

```tsx
import { Input, Label } from "@marginalia/ui";

<div>
  <Label htmlFor="author-email">Author email</Label>
  <Input id="author-email" placeholder="editorial@marginalia.dev" />
</div>
```

## Input

- Import: `import { Input } from "@marginalia/ui";`
- Supports size variants, invalid state, disabled state, and native input props.
- Use for short text, emails, slugs, IDs, and one-line metadata.

```tsx
import { Input } from "@marginalia/ui";

<>
  <Input placeholder="editorial@marginalia.dev" />
  <Input invalid placeholder="Missing author email" />
</>
```

## Textarea

- Import: `import { Textarea } from "@marginalia/ui";`
- Use for longer notes, descriptions, prompts, and editorial rationale.

```tsx
import { Textarea } from "@marginalia/ui";

<Textarea placeholder="Describe the tone, layout, and supporting notes..." />
```

## Checkbox

- Import: `import { Checkbox } from "@marginalia/ui";`
- Use for independent boolean decisions.
- Prefer the built-in `label` and `description` props instead of wrapping extra custom markup.

```tsx
import { Checkbox } from "@marginalia/ui";

<Checkbox
  defaultChecked
  label="Include soft contrast"
  description="Keeps the palette warm without losing clarity."
/>
```

## RadioGroup

- Import: `import { RadioGroup } from "@marginalia/ui";`
- Use when exactly one option should be selected.
- Prefer the `options` API for straightforward groups.

```tsx
import { RadioGroup } from "@marginalia/ui";

const paletteOptions = [
  { value: "warm", label: "Warm editorial" },
  { value: "neutral", label: "Neutral paper" }
];

<RadioGroup
  defaultValue="warm"
  label="Palette character"
  options={paletteOptions}
/>
```

## Switch

- Import: `import { Switch } from "@marginalia/ui";`
- Use for immediate preferences and settings toggles.
- Prefer Switch over Checkbox when the control reads like an enabled or disabled mode.

```tsx
import { Switch } from "@marginalia/ui";

<Switch
  defaultChecked
  label="Enable compact review mode"
  description="Useful when showing multiple data cards side by side."
/>
```

## Select

- Import: `import { Select } from "@marginalia/ui";`
- Use for bounded options when search is not necessary.
- Supply `options` with `value`, `label`, and optional `description`.

```tsx
import { Select } from "@marginalia/ui";

const documentStyleOptions = [
  { value: "essay", label: "Essay", description: "Long-form editorial writing." },
  { value: "brief", label: "Brief", description: "Shorter, denser communication." }
];

<Select
  label="Document style"
  description="Built with Radix for dependable interaction."
  defaultValue="essay"
  options={documentStyleOptions}
/>
```

## Combobox

- Import: `import { Combobox } from "@marginalia/ui";`
- Use when options are large enough that search matters.
- Keep the current value in state.

```tsx
import * as React from "react";
import { Combobox } from "@marginalia/ui";

const contentModeOptions = [
  {
    value: "editorial",
    label: "Editorial review",
    description: "Warm hierarchy for article-like interfaces.",
    keywords: ["warm", "review", "editorial"]
  },
  {
    value: "archive",
    label: "Research archive",
    description: "Dense but calm data and reading surfaces.",
    keywords: ["archive", "research", "dense"]
  }
];

export function ContentModeField() {
  const [value, setValue] = React.useState("editorial");

  return (
    <Combobox
      label="Content mode"
      description="Search and pick a tone or structural mode."
      options={contentModeOptions}
      value={value}
      onValueChange={setValue}
    />
  );
}
```

## Calendar

- Import: `import { Calendar } from "@marginalia/ui";`
- Use for standalone date surfaces inside filters, settings, or schedule views.
- Supports month and year navigation with calmer styling than stock calendar UIs.

```tsx
import * as React from "react";
import { Calendar } from "@marginalia/ui";

export function EditorialCalendar() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 2, 18));

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={new Date(2026, 2, 1)}
    />
  );
}
```

## DatePicker

- Import: `import { DatePicker } from "@marginalia/ui";`
- Use when the date selection should be anchored to a form field.
- Prefer `DatePicker` over raw `Calendar` in regular forms.

```tsx
import * as React from "react";
import { DatePicker } from "@marginalia/ui";

export function ReviewDeadlineField() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 22));

  return (
    <DatePicker
      label="Review deadline"
      description="Choose a single date with the calmer editorial calendar."
      selected={date}
      onSelect={setDate}
      calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
    />
  );
}
```

## Use These Files for Deeper Examples

- `apps/docs/components/usage-data-foundations.tsx`
- `apps/docs/components/usage-data-forms.tsx`
